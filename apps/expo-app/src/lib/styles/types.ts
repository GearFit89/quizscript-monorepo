
import type { ViewStyle, TextStyle, ImageStyle } from "react-native";


export type AnyStyle = ViewStyle | TextStyle | ImageStyle;

export interface StyleClass {
    [key: string] : AnyStyle

}

export interface StyleContent {
    home: StyleClass;
}