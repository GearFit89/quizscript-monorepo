import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StyleKeySelector } from "./StyleKeySelector";
import { StyleValueInput } from "@/components/styles/inputs/StyleValueInput";
import { getStyleKeyMeta } from "@/lib/styles/styleKeyMeta";
import type { EditorLevel, StyleContent } from "@/lib/styles/types";
import { useStylesState } from "../../hooks/styles.hook";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export interface StyleEditorSheetRef {
  open: () => void;
  close: () => void;
}

interface StyleEditorSheetProps {
  initialStyles: StyleContent;
  /** Called whenever any style value changes, with the full updated tree. */
  onStylesChange?: (next: StyleContent) => void;
}

const SNAP_POINTS = ["25%", "50%", "90%"];

/**
 * A bottom sheet that lets a user drill down:
 *   targets (screens) -> elements (sub-parts) -> properties (style keys)
 * and edit each style value with a type-appropriate control.
 */
export const StyleEditorSheet = forwardRef<StyleEditorSheetRef, StyleEditorSheetProps>(
  ({ initialStyles, onStylesChange }, ref) => {
    const sheetRef = useRef<BottomSheetMethods>(null);
    const { stylesContent, setStyleProperty, removeStyleProperty } =
      useStylesState(initialStyles);

    const [level, setLevel] = useState<EditorLevel>("targets");
    const [activeTarget, setActiveTarget] = useState<string | null>(null);
    const [activeElement, setActiveElement] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.snapToIndex(1),
      close: () => sheetRef.current?.close(),
    }));

    const emitChange = useCallback(
      (target: string, element: string, key: string, value: unknown) => {
        setStyleProperty(target, element, key, value as never);
      },
      [setStyleProperty]
    );

    // Notify the parent with the post-update tree, not a stale pre-update
    // snapshot (state updates are async/batched).
    useEffect(() => {
      onStylesChange?.(stylesContent);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stylesContent]);

    // ---- Navigation helpers ----
    function goToTargets() {
      setLevel("targets");
      setActiveTarget(null);
      setActiveElement(null);
    }
    function goToElements(target: string) {
      setActiveTarget(target);
      setActiveElement(null);
      setLevel("elements");
    }
    function goToProperties(element: string) {
      setActiveElement(element);
      setLevel("properties");
    }
    function goBack() {
      if (level === "addProperty") setLevel("properties");
      else if (level === "properties") setLevel("elements");
      else if (level === "elements") goToTargets();
    }

    const targetNames = useMemo(() => Object.keys(stylesContent), [stylesContent]);
    const elementNames = useMemo(
      () => (activeTarget ? Object.keys(stylesContent[activeTarget] ?? {}) : []),
      [stylesContent, activeTarget]
    );
    const activeStyleObject =
      activeTarget && activeElement ? stylesContent[activeTarget]?.[activeElement] ?? {} : {};
    const propertyEntries = useMemo(
      () => Object.entries(activeStyleObject),
      [activeStyleObject]
    );

    const headerTitle =
      level === "targets"
        ? "Screens"
        : level === "elements"
        ? activeTarget ?? ""
        : level === "properties"
        ? `${activeTarget} · ${activeElement}`
        : "Add Style Property";

    return (
      <BottomSheet ref={sheetRef} index={-1} snapPoints={SNAP_POINTS} enablePanDownToClose>
        <BottomSheetView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            {level !== "targets" ? (
              <TouchableOpacity onPress={goBack} style={styles.backBtn}>
                <Text style={styles.backText}>‹ Back</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.backBtn} />
            )}
            <Text style={styles.headerTitle} numberOfLines={1}>
              {headerTitle}
            </Text>
            <View style={styles.backBtn} />
          </View>

          {/* Level 1: Targets */}
          {level === "targets" && (
            <BottomSheetFlatList
              data={targetNames}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => goToElements(item)}>
                  <Text style={styles.cardTitle}>{item}</Text>
                  <Text style={styles.cardSubtitle}>
                    {Object.keys(stylesContent[item] ?? {}).length} elements
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Level 2: Elements */}
          {level === "elements" && activeTarget && (
            <BottomSheetFlatList
              data={elementNames}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => goToProperties(item)}>
                  <Text style={styles.cardTitle}>{item}</Text>
                  <Text style={styles.cardSubtitle}>
                    {Object.keys(stylesContent[activeTarget]?.[item] ?? {}).length} properties
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Level 3: Properties */}
          {level === "properties" && activeTarget && activeElement && (
            <View style={styles.propertiesContainer}>
              <TouchableOpacity
                style={styles.addPropertyBtn}
                onPress={() => setLevel("addProperty")}
              >
                <Text style={styles.addPropertyText}>+ Add Style Property</Text>
              </TouchableOpacity>
              <BottomSheetFlatList
                data={propertyEntries}
                keyExtractor={([key]) => key}
                contentContainerStyle={styles.listContent}
                renderItem={({ item: [key, value] }) => {
                  const meta = getStyleKeyMeta(key);
                  return (
                    <View style={styles.propertyRow}>
                      <View style={styles.propertyHeader}>
                        <Text style={styles.propertyKey}>{key}</Text>
                        <TouchableOpacity
                          onPress={() => removeStyleProperty(activeTarget, activeElement, key)}
                        >
                          <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                      <StyleValueInput
                        meta={meta}
                        value={value}
                        onChange={(next) => emitChange(activeTarget, activeElement, key, next)}
                      />
                    </View>
                  );
                }}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No style properties yet — add one above.</Text>
                }
              />
            </View>
          )}

          {/* Add-property search flow */}
          {level === "addProperty" && activeTarget && activeElement && (
            <StyleKeySelector
              existingKeys={Object.keys(activeStyleObject)}
              onSelect={(key) => {
                const meta = getStyleKeyMeta(key);
                const defaultValue =
                  meta.type === "boolean"
                    ? false
                    : meta.type === "number" || meta.type === "dimension"
                    ? meta.min ?? 0
                    : meta.type === "enum"
                    ? meta.options?.[0] ?? ""
                    : meta.type === "color"
                    ? "#000000"
                    : "";
                emitChange(activeTarget, activeElement, key, defaultValue);
                setLevel("properties");
              }}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

StyleEditorSheet.displayName = "StyleEditorSheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EEE",
    marginBottom: 8,
  },
  backBtn: {
    width: 64,
  },
  backText: {
    fontSize: 15,
    color: "#2196F3",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  listContent: {
    paddingBottom: 32,
    gap: 10,
  },
  card: {
    backgroundColor: "#F7F7FA",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  propertiesContainer: {
    flex: 1,
  },
  addPropertyBtn: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  addPropertyText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  propertyRow: {
    backgroundColor: "#F7F7FA",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  propertyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  propertyKey: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  removeText: {
    fontSize: 12,
    color: "#F44336",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 24,
  },
});
