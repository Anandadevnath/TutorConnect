import React, { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <DarkModeSwitch
      checked={isDark}
      onChange={setIsDark}
      size={28}
      sunColor="#fbbf24"
      moonColor="#60a5fa"
    />
  );
};

export default ThemeToggle;