'use client';

import Image from 'next/image';

export default function LogoTest() {
  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gradient-to-r from-white to-gray-800">
      {/* Logo oscuro */}
      <div className="bg-white p-4 rounded-lg">
        <Image
          src="/growthSVG_.svg"
          alt="Growth BDM Logo Dark"
          width={200}
          height={50}
          className="h-auto"
        />
      </div>

      {/* Logo claro */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <Image
          src="/growthSVG_w.svg"
          alt="Growth BDM Logo Light"
          width={200}
          height={50}
          className="h-auto"
        />
      </div>
    </div>
  );
}
