// Wisp CMS temporalmente deshabilitado
// Este componente no es parte de las funcionalidades principales (Stripe, Cloudinary, Cal.com)
// Se reactivará cuando se decida implementar el blog

import { buildWispClient } from "@wisp-cms/client";

const blogId = process.env.NEXT_PUBLIC_BLOG_ID;

const fallbackWisp = {
  async getPosts() {
    return {
      posts: [],
      pagination: {
        total: 0,
        limit: 0,
        page: 1,
        currentPage: 1,
        totalPages: 1,
      },
    };
  },
  async getPost() {
    return { post: null };
  },
  async getTags() {
    return { tags: [] };
  },
};

export const wisp = (blogId
  ? buildWispClient({
      blogId,
      baseUrl: "https://www.wisp.blog",
    })
  : fallbackWisp) as unknown as ReturnType<typeof buildWispClient>;
