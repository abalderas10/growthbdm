'use client';

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const TeamProfile = ({ name, role, company, location, description, followers, connections, imageUrl, bannerUrl, linkedinUrl, education }) => {
  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Banner con gradiente y efecto de parallax */}
      <motion.div 
        className="h-32 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Image 
          src={bannerUrl} 
          alt={`${name} banner`} 
          width={500}
          height={128}
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 dark:to-black/50"></div>
      </motion.div>

      {/* Foto de perfil con borde y efecto de elevación */}
      <div className="relative -mt-16 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
        >
          <Image 
            src={imageUrl} 
            alt={name} 
            width={100} 
            height={100} 
            className="rounded-full"
          />
          <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/10"></div>
        </motion.div>
      </div>

      {/* Contenido con animaciones sutiles */}
      <div className="px-6 py-4 text-center">
        <motion.h3 
          className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-900 dark:from-blue-400 dark:to-gray-300"
        >
          {name}
        </motion.h3>
        <motion.p 
          className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {role}
        </motion.p>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 mb-1"
        >
          {company}
        </motion.p>
        <motion.p 
          className="text-sm text-gray-500 dark:text-gray-500 mb-4"
        >
          {location}
        </motion.p>
        
        <motion.div 
          className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
          {education && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
              <span className="font-medium">Educación:</span> {education}
            </p>
          )}
        </motion.div>

        {/* Estadísticas de LinkedIn con iconos */}
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{followers.toLocaleString()}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Seguidores</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{connections.toLocaleString()}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Conexiones</p>
          </div>
        </div>

        {/* Botón de LinkedIn con hover effect */}
        <motion.a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          Ver perfil en LinkedIn
        </motion.a>
      </div>
    </motion.div>
  );
};

const Page = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/10 to-white/20 dark:from-transparent dark:via-blue-900/10 dark:to-gray-900/20"></div>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-900 dark:from-blue-400 dark:to-gray-300 mb-8"
            >
              Growth Business Development
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-gray-600 dark:text-gray-300 mb-16 leading-relaxed"
            >
              Impulsamos la expansión y el crecimiento de empresas con soluciones estratégicas, 
              tecnología avanzada e inteligencia de negocios.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-6"
            >
              <div className="w-20 h-1 bg-blue-600/20 rounded-full"></div>
              <div className="w-20 h-1 bg-blue-600/40 rounded-full"></div>
              <div className="w-20 h-1 bg-blue-600/60 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">Nuestra Misión</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Facilitamos el desarrollo y la internacionalización de empresas a través de herramientas innovadoras, 
                automatización inteligente y estrategias de expansión adaptadas a las necesidades de cada cliente.
              </p>
            </motion.div>
            
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">Nuestra Visión</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Ser el aliado estratégico de referencia para empresas que buscan crecimiento sostenible, 
                expansión global y transformación digital en un mundo cada vez más interconectado.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-40 bg-gray-50 dark:bg-gray-900">
        {/* Banner de fondo */}
        <div className="absolute inset-0 h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/banner-equipo.jpg')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-gray-50 dark:from-gray-900/80 dark:to-gray-900"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-32"
            >
              <h2 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-900 dark:from-blue-400 dark:to-gray-300">
                Nuestro Equipo Directivo
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Liderando el camino hacia el éxito y la innovación en el desarrollo de negocios
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid gap-16 md:grid-cols-2 pt-8"
            >
              <TeamProfile
                name="Luis Méndez Trillo"
                role="Presidente"
                company="Coldwell Banker Commercial Mexico"
                location="Ciudad de México y alrededores, México"
                description="Presidente en Coldwell Banker Commercial Mexico desde septiembre 2011, liderando la expansión y el desarrollo estratégico de la compañía por más de 13 años."
                followers={500}
                connections={500}
                imageUrl="/1637191759604.jpg"
                bannerUrl="/1614275499710.jpg"
                linkedinUrl="https://www.linkedin.com/in/luis-mendez-trillo/"
              />
              <TeamProfile
                name="Adriana Vargas Olvera"
                role="Partner & Principal Chief Executive Officer"
                company="Aliest - Growth"
                location="Ciudad de México, México"
                description="Partner & Principal Chief Executive Officer en Aliest - Growth, liderando iniciativas estratégicas y el crecimiento de la empresa desde agosto 2024."
                followers={16311}
                connections={500}
                imageUrl="/1602816840383.jpg"
                bannerUrl="/1732761478686.jpg"
                linkedinUrl="https://www.linkedin.com/in/adrianavargasolvera/"
                education="Universidad Anáhuac Mexico Norte"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-16"
          >
            ¿Qué Hacemos?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Automatización y Tecnología",
                description: "Implementamos IA y automatización para optimizar ventas, atención al cliente y gestión operativa.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Expansión Internacional",
                description: "Facilitamos la entrada de empresas a nuevos mercados, conectándolas con inversores y socios estratégicos.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )
              },
              {
                title: "Consultoría en Desarrollo",
                description: "Diseñamos estrategias personalizadas para maximizar el crecimiento y la rentabilidad.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Marketing Digital",
                description: "Creamos campañas de alto impacto basadas en datos y en tendencias de mercado.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2 }
                  }
                }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
