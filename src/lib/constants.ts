const normalizeUrl = (value?: string) => value?.replace(/\/+$/, "");

// Prefer an explicit env var so web, emulator, and physical device builds can
// point at the correct backend host without code changes.
const viteEnv = import.meta.env as ImportMetaEnv & {
  VITE_API_URL?: string;
};

export const API_ENDPOINT =
  normalizeUrl(viteEnv.VITE_API_URL) ?? "http://localhost:4000";

export const getLandingPath = (role?: string | null) => {
  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === "teacher") {
    return "/ws/teacher";
  }

  return "/ws/dashboard";
};
