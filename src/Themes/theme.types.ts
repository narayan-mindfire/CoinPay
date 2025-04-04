import { Theme } from "@react-navigation/native";
import { CustomTheme } from "./Theme";


declare module '@react-navigation/native' {
  export function useTheme(): CustomTheme;
}