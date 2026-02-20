import { useState, useEffect } from "react";

type Theme = "Light" | "dark";

function useTheme() {
  // Сначала пытаемся загрузить тему из localStorage
  const saved = localStorage.getItem("theme") as Theme | null;
  const [theme, setTheme] = useState<Theme>(saved ?? "Light");

  const switchTheme = () => {
    setTheme((cur) => {
      const newTheme = cur === "Light" ? "dark" : "Light";
      localStorage.setItem("theme", newTheme); // сохраняем новую тему
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return { theme, switchTheme };
}

export { useTheme };
