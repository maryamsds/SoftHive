import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-lg p-1.5 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 dark:text-slate-100"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}