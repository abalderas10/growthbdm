"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState, useCallback } from "react";
import { Target, Handshake, TrendingUp, BarChart } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogClose, DialogTitle } from "./ui/dialog";
import { X } from "lucide-react";

export default function AliestGrowth() {
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();
  
  // Función para abrir el calendario
  const openCalendar = useCallback(() => {
    setShowCalendar(true);
  }, []);

  // Exportar la función para uso en otros componentes
  useEffect(() => {
    // @ts-ignore - Añadir al objeto window
    window.openCalModal = () => openCalendar();
    return () => {
      // @ts-ignore - Limpiar del objeto window
      window.openCalModal = undefined;
    };
  }, [openCalendar]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Construye Alianzas Estratégicas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Impulsa tu negocio a través de alianzas que generan valor y crecimiento sostenible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Objetivos Claros</h3>
            <p className="text-gray-600">
              Definimos metas específicas y medibles para cada alianza
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Relaciones Sólidas</h3>
            <p className="text-gray-600">
              Construimos vínculos basados en la confianza y beneficio mutuo
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crecimiento Acelerado</h3>
            <p className="text-gray-600">
              Potenciamos tu crecimiento mediante sinergias estratégicas
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resultados Medibles</h3>
            <p className="text-gray-600">
              Evaluamos constantemente el impacto de cada alianza
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={openCalendar}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Agenda una Consulta Estratégica
          </Button>
        </div>
      </div>

      {/* Modal del calendario */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden p-0">
          <DialogTitle className="sr-only">Calendario de citas</DialogTitle>
          <div>
            <iframe 
              src="https://cal.com/alberto-balderas/30min?embed=true&hideBranding=true&hideFooter=true&borderless=true&theme=light&layout=month_view" 
              width="100%" 
              height="80vh" 
              frameBorder="0"
              style={{ minHeight: "650px" }}
              title="Calendario de citas"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
