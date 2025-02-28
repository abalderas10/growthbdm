import Image from 'next/image';

interface TeamProfileProps {
  name: string;
  role: string;
  company: string;
  location: string;
  description: string;
  followers: number;
  connections: number;
  imageUrl: string;
  bannerUrl: string;
  linkedinUrl: string;
  education?: string;
}

export const TeamProfile = ({
  name,
  role,
  company,
  location,
  description,
  followers,
  connections,
  imageUrl,
  bannerUrl,
  linkedinUrl,
  education
}: TeamProfileProps) => {
  return (
    <div className="bg-white dark:bg-[#1D2226] rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Banner y Foto */}
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <Image
          src={bannerUrl}
          alt={`${name} banner`}
          width={800}
          height={200}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50"></div>
        <div className="absolute -bottom-10 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-[#1D2226] overflow-hidden bg-white">
            <Image
              src={imageUrl}
              alt={name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Información Principal */}
      <div className="pt-14 px-6 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:underline cursor-pointer">
              {name}
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300">{role}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{company}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{location}</p>
            {education && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{education}</p>
            )}
          </div>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A66C2] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#004182] transition-colors"
          >
            Seguir
          </a>
        </div>

        {/* Estadísticas */}
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
            <span>{followers.toLocaleString()} seguidores</span>
          </div>
          <span>•</span>
          <div>{connections.toLocaleString()} contactos</div>
        </div>

        {/* Botones de Acción */}
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Enviar mensaje
          </button>
          <button className="flex-1 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Ver servicios
          </button>
          <button className="px-3 py-1.5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Más
          </button>
        </div>

        {/* Descripción */}
        <div className="mt-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </div>
      </div>
    </div>
  );
};
