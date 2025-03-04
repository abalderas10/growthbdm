import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, message } = body

    // Guardar en la tabla de contactos
    const contact = await db.contact.create({
      data: {
        name,
        email,
        company,
        message,
        status: "PENDING",
      },
    })

    return NextResponse.json({ success: true, contact })
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    )
  }
}
