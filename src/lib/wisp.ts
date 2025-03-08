import { buildWispClient } from "@wisp-cms/client";

export const wisp = buildWispClient({
  projectId: process.env.NEXT_PUBLIC_WISP_PROJECT_ID || "",
  apiKey: process.env.NEXT_PUBLIC_WISP_API_KEY || "",
});
