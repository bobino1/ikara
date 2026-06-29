"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { course } from "./sanity/course";

export default defineConfig({
  basePath: "/studio",
  name: "ikara",
  title: "Autoškola IKARA",
  projectId: "npcqujal",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: [course] },
});
