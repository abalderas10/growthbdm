import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Presentation, Phone, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { es } from "date-fns/locale"
import { addDays, format, isWeekend, setHours, setMinutes, isSameDay } from "date-fns"

const meetingTypes = [
  {
    id: "discovery",
    title: "Reunión de Descubrimiento",
    description: "Conoce más sobre nuestros servicios",
    duration: 30,
    icon: Users,
  },
  {
    id: "proposal",
    title: "Presentación de Propuesta",
    description: "Revisión de propuesta para tu proyecto",
    duration: 60,
    icon: Presentation,
  },
  {
    id: "followup",
    title: "Seguimiento",
    description: "Revisión del progreso de tu proyecto",
    duration: 30,
    icon: Phone,
  },
]

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [selectedMeeting, setSelectedMeeting] = useState<string>()
  const maxDate = addDays(new Date(), 30)

  return (
    <div className="w-full space-y-6">
      {/* Tipos de reunión */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">
          Tipo de reunión
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {meetingTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMeeting === type.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-100 hover:border-primary/30"
                }`}
                onClick={() => setSelectedMeeting(type.id)}
              >
                <CardContent className="p-4">
                  <Icon className="mb-2 h-5 w-5 text-primary" />
                  <h4 className="mb-1 text-sm font-medium">{type.title}</h4>
                  <p className="text-xs text-gray-500">{type.description}</p>
                  <div className="mt-2 text-xs font-medium text-primary">
                    {type.duration} min
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-[1fr,300px] gap-8">
        {/* Calendario */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              Selecciona fecha y hora
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <ChevronLeft className="h-4 w-4" />
              <span>Marzo 2025</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              disabled={(date) => {
                const today = new Date()
                return (
                  isWeekend(date) ||
                  date < today ||
                  date > maxDate ||
                  date.getHours() < 9 ||
                  date.getHours() >= 14
                )
              }}
              className="w-full"
              classNames={{
                head_cell: "text-xs font-medium text-gray-500",
                cell: "text-sm p-0 relative [&:has([aria-selected])]:bg-primary/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                day_today: "bg-accent/5 text-accent-foreground",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                table: "w-full border-collapse",
              }}
            />
          </div>
        </div>

        {/* Horarios */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            {selectedDate ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: es }) : "Horarios disponibles"}
          </h3>
          <div className="flex flex-col gap-2">
            {!selectedDate ? (
              <p className="text-sm text-gray-500">
                Selecciona una fecha para ver horarios disponibles
              </p>
            ) : (
              Array.from({ length: 10 }, (_, i) => {
                const time = setMinutes(
                  setHours(selectedDate, 9 + Math.floor(i / 2)),
                  (i % 2) * 30
                )
                const timeStr = format(time, "h:mm a")
                return (
                  <Button
                    key={i}
                    variant="outline"
                    className={`h-12 justify-start px-4 text-left text-sm font-normal hover:border-primary hover:bg-primary/5 ${
                      selectedTime === timeStr
                        ? "border-primary bg-primary/5 font-medium"
                        : "border-gray-100"
                    }`}
                    onClick={() => setSelectedTime(timeStr)}
                  >
                    {timeStr}
                  </Button>
                )
              })
            )}
          </div>
        </div>
      </div>

      <Button
        size="sm"
        className="ml-auto bg-blue-600 px-6 text-sm font-medium tracking-wide transition-transform hover:bg-blue-700 hover:scale-[1.02] disabled:hover:scale-100"
        disabled={!selectedDate || !selectedTime || !selectedMeeting}
      >
        Confirmar
      </Button>
    </div>
  )
}
