import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const SWATCHES = [
  "#FFFFFF",
  "#000000",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#3F51B5",
  "#2196F3",
  "#00BCD4",
  "#4CAF50",
  "#8BC34A",
  "#FFEB3B",
  "#FF9800",
  "#795548",
  "#9E9E9E",
  "transparent",
];

const HEX_RE = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

interface ColorInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export function ColorInput({ value, onChange }: ColorInputProps) {
  const [text, setText] = useState(value ?? "");
  const isValid = text === "transparent" || HEX_RE.test(text) || text === "";

  function commit(next: string) {
    setText(next);
    if (next === "transparent" || HEX_RE.test(next)) {
      onChange(next);
    }
  }

  return (
    <View>
      <View style={styles.previewRow}>
        <View
          style={[
            styles.previewSwatch,
            { backgroundColor: isValid && text ? text : "#CCCCCC" },
          ]}
        />
        <TextInput
          style={[styles.hexInput, !isValid && styles.hexInputInvalid]}
          value={text}
          onChangeText={commit}
          placeholder="#RRGGBB"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {!isValid && <Text style={styles.errorText}>Enter a valid hex color</Text>}
      <View style={styles.swatchGrid}>
        {SWATCHES.map((swatch) => (
          <TouchableOpacity
            key={swatch}
            onPress={() => commit(swatch)}
            style={[
              styles.swatch,
              { backgroundColor: swatch === "transparent" ? "#fff" : swatch },
              swatch === value && styles.swatchSelected,
            ]}
          >
            {swatch === "transparent" && <View style={styles.transparentDiagonal} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  previewSwatch: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  hexInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  hexInputInvalid: {
    borderColor: "#F44336",
  },
  errorText: {
    color: "#F44336",
    fontSize: 12,
    marginBottom: 8,
  },
  swatchGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    overflow: "hidden",
  },
  swatchSelected: {
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  transparentDiagonal: {
    width: "100%",
    height: 1,
    backgroundColor: "#F44336",
    transform: [{ rotate: "45deg" }],
    marginTop: 15,
  },
});
