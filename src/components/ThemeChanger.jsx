import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "./utils/icons";

function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
  <button className="theme_toggle" onClick={toggleTheme}>
    {
      theme === "dark" ?
      <MoonIcon /> :
      <SunIcon />
    }
  </button>
  );
}

const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

export default ThemeToggle;