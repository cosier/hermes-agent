import { Sun, Moon } from "lucide-react";
import { Button } from "@nous-research/ui/ui/components/button";
import { useTheme } from "@/themes";
import { useI18n } from "@/i18n";

/**
 * Quick-toggle button that swaps between light and dark variants of the
 * current theme family.  If the active theme name ends with `-light` we
 * look for a sibling `-dark` theme (and vice-versa).  When no counterpart
 * exists the button is hidden so the UI stays clean.
 */
export function DarkModeToggle() {
  const { themeName, availableThemes, setTheme } = useTheme();
  const { t } = useI18n();

  const isLight = themeName.endsWith("-light");
  const isDark = themeName.endsWith("-dark");

  if (!isLight && !isDark) return null;

  const counterpart = isLight
    ? themeName.replace(/-light$/, "-dark")
    : themeName.replace(/-dark$/, "-light");

  const hasCounterpart = availableThemes.some((th) => th.name === counterpart);
  if (!hasCounterpart) return null;

  const isCurrentlyDark = isDark;

  return (
    <Button
      ghost
      onClick={() => setTheme(counterpart)}
      className="px-2 py-1 normal-case tracking-normal font-normal text-xs text-muted-foreground hover:text-foreground"
      title={
        isCurrentlyDark
          ? (t.theme?.switchToLight ?? "Switch to light")
          : (t.theme?.switchToDark ?? "Switch to dark")
      }
      aria-label={
        isCurrentlyDark
          ? (t.theme?.switchToLight ?? "Switch to light")
          : (t.theme?.switchToDark ?? "Switch to dark")
      }
    >
      <span className="inline-flex items-center gap-1.5">
        {isCurrentlyDark ? (
          <Sun className="h-3.5 w-3.5" />
        ) : (
          <Moon className="h-3.5 w-3.5" />
        )}
      </span>
    </Button>
  );
}
