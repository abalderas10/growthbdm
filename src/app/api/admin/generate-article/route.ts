import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `Eres el editor de contenido de Growth BDM, empresa mexicana de Business Development Management especializada en Real Estate, inversión, networking estratégico y consultoría para empresas que quieren operar en México.

Genera dos bloques de contenido separados:

1. ARTÍCULO DE BLOG en formato Markdown para Wisp CMS
2. POST DE LINKEDIN listo para publicar

REGLAS DEL ARTÍCULO:
- Longitud: 650-900 palabras
- Basado en noticias o tendencias reales y actuales del sector
- Tono experto pero accesible, nunca académico ni genérico
- Estructura:
  * Frontmatter YAML completo
  * Headline con dato concreto o gancho fuerte
  * Introducción con contexto y por qué importa ahora
  * 3-4 secciones con subtítulos H2
  * Sección "Perspectiva Growth BDM": qué significa esto para inversionistas/empresarios
  * CTA final que dirija a un servicio de growthbdm.com
- Incluir 1-2 datos o estadísticas reales cuando sea posible
- El slug debe ser en español, con guiones, sin acentos ni caracteres especiales

FORMATO FRONTMATTER OBLIGATORIO:
---
title: "Título del artículo aquí"
description: "Descripción SEO entre 140-160 caracteres"
tags: ["tag1", "tag2", "tag3"]
category: "Categoría del artículo"
slug: "slug-del-articulo-en-espanol"
date: "FECHA_DE_HOY"
---

REGLAS DEL POST DE LINKEDIN:
- Máximo 1,200 caracteres
- Primera línea: gancho que detiene el scroll (sin emoji al inicio, con dato o pregunta impactante)
- Línea 2: vacía (genera el "ver más")
- Cuerpo: 3-5 ideas clave del artículo, una por párrafo corto
- Emojis moderados: máx 4 en todo el post
- Hashtags al final: 5-7 entre español e inglés relevantes al tema
- Última línea: "Artículo completo en growthbdm.com/blog →"

SEPARADOR ENTRE BLOQUES — usa exactamente esta línea entre el artículo y el post de LinkedIn:
===LINKEDIN===

No incluyas ningún texto adicional fuera de los dos bloques.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, customTopic, audience, tone, password } = body;

    const adminPassword = process.env.ADMIN_BLOG_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return Response.json({ error: "Acceso no autorizado" }, { status: 401 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const audienceMap: Record<string, string> = {
      ambos: "nacionales y extranjeros que quieren operar en México",
      extranjeros: "inversionistas y empresas extranjeras que quieren expandirse a México",
      nacionales: "empresarios mexicanos que quieren crecer o expandirse",
    };
    const toneMap: Record<string, string> = {
      profesional: "profesional y directo",
      consultivo: "consultivo y analítico, con perspectiva de experto del sector",
      oportunidad: "enfocado en la oportunidad de negocio y llamado a la acción",
    };

    const today = new Date().toISOString().split("T")[0];

    const userPrompt = customTopic
      ? `Categoría: ${category}\nTema específico: ${customTopic}\nAudiencia objetivo: ${audienceMap[audience]}\nTono: ${toneMap[tone]}\nFecha de hoy: ${today}\n\nGenera el artículo completo y el post de LinkedIn.`
      : `Categoría: ${category}\nAudiencia objetivo: ${audienceMap[audience]}\nTono: ${toneMap[tone]}\nFecha de hoy: ${today}\n\nBusca la noticia o tendencia más relevante y reciente relacionada con México, inversión, real estate, nearshoring o negocios dentro de la categoría "${category}". Genera el artículo completo y el post de LinkedIn.`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const fullText = message.content[0].type === "text" ? message.content[0].text : "";
    const parts = fullText.split("===LINKEDIN===");
    const article = parts[0].trim();
    const linkedin = parts[1] ? parts[1].trim() : "";

    return Response.json({ article, linkedin });
  } catch (error) {
    console.error("Error generando artículo:", error);
    return Response.json({ error: "Error al generar el artículo" }, { status: 500 });
  }
}
