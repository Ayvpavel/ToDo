import { useState } from "react";
type theme = "Light" | "dark";
function useTheme() {
  const [theme, setTheme] = useState<theme>("Light");
  const switchTheme = () => {
    setTheme((cur) => (cur === "Light" ? "dark" : "Light"));
  };

  return {
    theme,
    switchTheme,
  };
}
export { useTheme };
