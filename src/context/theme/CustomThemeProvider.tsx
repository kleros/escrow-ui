import { useMemo, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme as baseTheme } from "theme/theme";
import { useLocalStorage } from "hooks/useLocalStorage";
import { ThemeContext } from "./ThemeContext";

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useLocalStorage<"light" | "dark">(
    "@kleros/escrow-v1/theme",
    "dark"
  );
  const theme = useMemo(() => ({ ...baseTheme, mode: themeMode }), [themeMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark");
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
