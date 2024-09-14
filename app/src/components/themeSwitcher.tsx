import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

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
