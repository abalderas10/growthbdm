// Wisp CMS temporalmente deshabilitado
// Este componente no es parte de las funcionalidades principales (Stripe, Cloudinary, Cal.com)
// Se reactivará cuando se decida implementar el blog

import { buildWispClient } from "@wisp-cms/client";

if (!process.env.NEXT_PUBLIC_BLOG_ID) {
  throw new Error('Blog ID is not configured. Please check your .env.local file.');
}

export const wisp = buildWispClient({
  blogId: process.env.NEXT_PUBLIC_BLOG_ID,
  baseUrl: "https://www.wisp.blog"
});
