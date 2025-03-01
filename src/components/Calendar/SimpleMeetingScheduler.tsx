'use client';

import { useState } from 'react';
import BookingCalendar from './BookingCalendar';
import { useToast } from '@/components/ui/use-toast';
import { QuickContactForm } from "@/components/QuickContactForm";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function SimpleMeetingScheduler() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"INITIAL" | "CONTACT" | "CALENDAR">("INITIAL")
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Agenda una Reunión
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agenda una Reunión</DialogTitle>
          <DialogDescription>
            Déjanos tus datos y nos pondremos en contacto contigo
          </DialogDescription>
        </DialogHeader>

        {step === "INITIAL" && (
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setStep("CONTACT")}
                variant="outline"
                className="h-24 text-lg font-medium hover:border-primary/50"
              >
                Contacto
              </Button>
              <Button
                onClick={() => setStep("CALENDAR")}
                variant="outline"
                className="h-24 text-lg font-medium hover:border-primary/50"
              >
                Agendar Reunión
              </Button>
            </div>
          </div>
        )}

        {step === "CONTACT" && (
          <div className="py-4">
            <QuickContactForm />
          </div>
        )}

        {step === "CALENDAR" && (
          <div className="py-4">
            <BookingCalendar onClose={() => setOpen(false)} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
