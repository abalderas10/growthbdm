export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface NetworkingEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  banner: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export async function fetchFromStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // Cache for 1 minute
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
  }

  const url = `${baseUrl}/api/${endpoint}`;
  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    throw new Error(`Error fetching from Strapi: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
