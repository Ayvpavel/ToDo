import { useState } from "react";
type theme = "light" | "dark";
function useTheme() {
  const [theme, setTheme] = useState<theme>("light");
  const switchTheme = () => {
    setTheme((cur) => (cur === "light" ? "dark" : "light"));
  };

  return {
    theme,
    switchTheme,
  };
}
export { useTheme };
