'use client';

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';

export function SimpleMeetingScheduler() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#0066cc" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const handleClick = async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: "alberto-balderas/30min",
      config: {
        layout: "month_view"
      }
    });
  };

  return (
    <Button 
      onClick={handleClick}
      variant="default" 
      className="bg-primary hover:bg-primary/90 w-full md:w-auto"
    >
      Agenda una Reunión
    </Button>
  );
}
