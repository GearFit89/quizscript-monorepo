import React, { useRef } from "react";
import { Button, StyleSheet } from "react-native";
import { StyleEditorSheet, StyleEditorSheetRef } from "./StyleEditorSheet";
import { mockStyleContent } from "@/lib/styles/mockData";
import type { StyleContent } from "@/lib/styles/types";
import { View } from "react-native";

export default function ExampleUsage() {
  const sheetRef = useRef<StyleEditorSheetRef>(null);

  function handleStylesChange(next: StyleContent) {
    // Persist to disk, sync to a backend, update a live preview, etc.
    console.log("styles updated:", next);
  }

  return (
    <View style={styles.container}>
      <Button title="Edit Styles" onPress={() => sheetRef.current?.open()} />
      <StyleEditorSheet
        ref={sheetRef}
        initialStyles={mockStyleContent}
        onStylesChange={handleStylesChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
