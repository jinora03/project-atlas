// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// Read SITE_URL from the process environment (host / CI) or a local .env file.
// Prefix "" means "load all vars", not just PUBLIC_-prefixed ones.
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

// The Atlas is static-first: content is authored as Markdown/MDX at the repo
// root (guides/ concepts/ decisions/ domains/) and this Astro app is purely the
// presentation + navigation layer over it. See src/content.config.ts.
//
// The canonical site origin comes from SITE_URL (see .env.example). When it is
// unset, `site` is undefined and BaseLayout omits canonical/OG absolute URLs
// rather than emitting a wrong domain.
export default defineConfig({
  site: SITE_URL || undefined,
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
