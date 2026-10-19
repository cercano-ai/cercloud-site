const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const themeName = document.querySelector(".theme-name");
const themeColor = document.querySelector('meta[name="theme-color"]');

function syncTheme(theme) {
  const night = theme === "night";
  root.dataset.theme = theme;
  themeName.textContent = night ? "Night" : "Day";
  toggle.setAttribute("aria-pressed", String(night));
  toggle.setAttribute("aria-label", `Switch to ${night ? "daylight" : "night"} theme`);
  themeColor.setAttribute("content", night ? "#1a1a1a" : "#fbf3e0");
}

syncTheme(root.dataset.theme === "night" ? "night" : "day");

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "night" ? "day" : "night";
  localStorage.setItem("cercloud-theme", next);
  syncTheme(next);
});
