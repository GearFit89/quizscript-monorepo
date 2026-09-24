import React from "react";
import { Pressable,  View } from "react-native";
import { IconKey } from "@/lib/icons";
import Icon from "../icon";
import { Text } from "../ui/text";
import { useQuizSetup, useStyleTarget} from "@/hooks"
import type { AnyStyle } from "@/lib/styles";


export interface ModeOptionProps<Mode_T> {
  value: Mode_T;
  title: string;
  icon: IconKey;
  description?: string;
  color?: string;
  name?: string;
}

export default function ModeOption<Mode_T>({
  value,
  title,
  icon,
  description,
  color = "#007AFF", // Pass a valid color hex/string or token if overriding
}: ModeOptionProps<Mode_T>) {
  const { setMode } = useQuizSetup<Mode_T>();
  const [isPressed, setIsPressed] = React.useState(false);
  const { styles } = useStyleTarget("modeOption");

  const handlePress = () => {
    setIsPressed(!isPressed);
    setMode(value);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container as AnyStyle,
        { backgroundColor: color },
        isPressed ? styles.pressedBorder : styles.defaultBorder,
      ]}
    >
      <View style={styles.textContainer}>
        <Text variant="p" style={styles.titleText as AnyStyle}>
          {title}
        </Text>
        {description ? (
          <Text variant="p" style={styles.descriptionText as AnyStyle}>
            {description}
          </Text>
        ) : null}
      </View>

      <Icon color={color} name={icon} />
    </Pressable>
  );
}
