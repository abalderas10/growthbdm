import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, position, company, email, meetingType, meetingDate, duration, notes } = body

    // Guardar en la tabla de reuniones
    const meeting = await db.meeting.create({
      data: {
        name,
        position,
        company,
        email,
        meetingType,
        meetingDate: new Date(meetingDate),
        duration,
        notes,
        status: "PENDING",
      },
    })

    return NextResponse.json({ success: true, meeting })
  } catch (error) {
    console.error("Error creating meeting:", error)
    return NextResponse.json(
      { error: "Error al agendar la reunión" },
      { status: 500 }
    )
  }
}
