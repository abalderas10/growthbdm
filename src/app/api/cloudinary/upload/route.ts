import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Tope de 8 MB. Cloudinary acepta más, pero para imágenes de galería no hace
// falta más y evita que alguien nos llene el bucket.
const MAX_BYTES = 8 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Sube una imagen al bucket.
 *
 * Este endpoint estaba abierto a todo Internet: cualquiera podía hacer POST
 * con un archivo y usarlo como hosting gratuito dentro de la cuenta de
 * Growth BDM. Ahora exige contraseña.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const auth = requireAdmin(request, {
      password: formData.get("password")?.toString() ?? null,
      scope: "cloudinary-upload",
      budget: 20,
      windowMs: 10 * 60 * 1000,
    });
    if (!auth.ok) return auth.response;

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Tipo de archivo no permitido: ${file.type}` },
        { status: 415 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "El archivo supera el límite de 8 MB" },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "GrowthBDM",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[cloudinary/upload] Error subiendo archivo:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
