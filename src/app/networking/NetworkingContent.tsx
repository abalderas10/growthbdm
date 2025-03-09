'use client';

import Gallery from '@/components/Gallery/Gallery';
import ReservationForm from '@/components/Reservation/ReservationForm';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  currency: string;
}

interface NetworkingContentProps {
  product: Product;
}

export default function NetworkingContent({ product }: NetworkingContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 flex items-center">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                15 de Marzo 2025 - WeWork Reforma Latino
              </p>
              <p className="text-lg text-gray-300 max-w-2xl">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-30">
        <div className="grid lg:grid-cols-[1fr,400px] gap-8 max-w-7xl mx-auto">
          {/* Left Column: Event Details and Gallery */}
          <div className="space-y-12">
            {/* Event Details */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Detalles del Evento</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Fecha y Hora</h3>
                    <p className="text-gray-600 dark:text-gray-300">15 de Marzo, 2025 - 19:00 hrs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Ubicación</h3>
                    <p className="text-gray-600 dark:text-gray-300">WeWork Reforma Latino</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Av. Paseo de la Reforma 26, CDMX</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Capacidad</h3>
                    <p className="text-gray-600 dark:text-gray-300">Limitada a 30 personas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Networking Estratégico</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Conecta con profesionales y empresarios de alto nivel en un ambiente diseñado para maximizar oportunidades.
                </p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Oportunidades Únicas</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Genera conexiones valiosas y descubre sinergias para impulsar tu negocio al siguiente nivel.
                </p>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8">
              <Gallery />
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-8">
              <ReservationForm 
                price={product.price} 
                currency={product.currency} 
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
