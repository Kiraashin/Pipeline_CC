
import { useState } from "react";
import { Palette, X, Check } from "lucide-react";

const themes = [
  { id: "theme1", name: "Purple", color: "#43246b", type: "dark" },
  { id: "theme2", name: "Blue", color: "#133155", type: "dark" },
  { id: "theme3", name: "Maroon", color: "#56173a", type: "dark" },
  { id: "theme4", name: "Teal", color: "#003b47", type: "dark" },
  { id: "theme5", name: "Brown", color: "#522028", type: "dark" },

  { id: "theme6", name: "Mint", color: "#c5e9cb", type: "light" },
  { id: "theme7", name: "Yellow", color: "#f2e0b0", type: "light" },
  { id: "theme8", name: "Lavender", color: "#e8d4ff", type: "light" },
  { id: "theme9", name: "Peach", color: "#ffd7b9", type: "light" },
  { id: "theme10", name: "Pink", color: "#ffd0e7", type: "light" },
];

const applyTheme = (themeId) => {
  const root = document.documentElement;

  themes.forEach(({ id }) => root.classList.remove(id));
  root.classList.add(themeId);

  localStorage.setItem("selectedTheme", themeId);
};

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);

  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem("selectedTheme");
    return themes.some((theme) => theme.id === saved)
      ? saved
      : "theme1";
  });

  const selectTheme = (themeId) => {
    applyTheme(themeId);
    setActiveTheme(themeId);
  };

  const renderThemes = (type) =>
    themes
      .filter((theme) => theme.type === type)
      .map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => selectTheme(theme.id)}
          title={theme.name}
          aria-label={`Pilih tema ${theme.name}`}
          aria-pressed={activeTheme === theme.id}
          className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md ${activeTheme === theme.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-border hover:border-primary/50"
            }`}
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 shadow-sm"
            style={{ backgroundColor: theme.color }}
          >
            {activeTheme === theme.id && (
              <Check
                size={18}
                color={type === "dark" ? "#ffffff" : "#18181b"}
              />
            )}
          </span>

          <span className="text-center text-xs font-medium">
            {theme.name}
          </span>
        </button>
      ));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-muted"
      >
        <Palette size={17} />
        Tema
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-modal-title"
            className="w-full max-w-md rounded-2xl border border-border bg-background p-5 text-foreground shadow-2xl sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="theme-modal-title"
                  className="text-lg font-semibold"
                >
                  Pengaturan Tema
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pilih warna sesuai seleramu
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 transition hover:bg-muted"
                aria-label="Tutup modal"
              >
                <X size={19} />
              </button>
            </div>

            <section className="mb-6">
              <h3 className="mb-3 text-sm font-semibold">Dark</h3>
              <div className="grid grid-cols-5 gap-2">
                {renderThemes("dark")}
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-semibold">Light</h3>
              <div className="grid grid-cols-5 gap-2">
                {renderThemes("light")}
              </div>
            </section>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                Aktif:{" "}
                {themes.find((theme) => theme.id === activeTheme)?.name}
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
