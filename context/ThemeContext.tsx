import { DarkTheme, LightTheme } from "@/constants/theme";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    if (systemColorScheme === "dark") {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }
  }, [systemColorScheme]);

  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  return (
    <ThemeContext.Provider value={{ theme, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return { theme: context.theme, colorScheme: context.colorScheme };
};
