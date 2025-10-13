import Moon from "assets/moon.svg?react";
import Sun from "assets/sun.svg?react";
import { IconButton } from "components/Common/Buttons/IconButton";
import { useThemeContext } from "context/theme/useThemeContext";

export default function ToggleTheme() {
  const { themeMode, setThemeMode } = useThemeContext();

  return (
    <IconButton
      onPress={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
      small
      icon={themeMode === "light" ? <Moon /> : <Sun />}
      text=""
    />
  );
}
