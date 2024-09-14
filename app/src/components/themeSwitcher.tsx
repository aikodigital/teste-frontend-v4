import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { setDarkMode } = useThemeStore((state) => ({
    isDarkMode: state.isDarkMode,
    setDarkMode: state.setDarkMode,
  }));

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);

    setDarkMode(newTheme === "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme ? savedTheme : "light";
    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
    setDarkMode(initialTheme === "dark");
  }, [setDarkMode]);

  if (theme === "dark") {
    return (
      <button onClick={() => toggleTheme()}>
        <FiSun size={20} color="#fff" />
      </button>
    );
  }

  if (theme === "light") {
    return (
      <button onClick={() => toggleTheme()}>
        <FiMoon size={20} />
      </button>
    );
  }
}
