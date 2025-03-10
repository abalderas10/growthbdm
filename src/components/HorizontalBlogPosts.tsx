'use client';

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const HorizontalBlogPosts = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative mt-16 py-12 bg-white/5 backdrop-blur-sm rounded-xl"
    >
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Blog posts coming soon...
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Estamos preparando contenido valioso sobre desarrollo de negocios y oportunidades en el sector inmobiliario. ¡Visita nuestra <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">página del blog</a>!
        </p>
      </div>
    </motion.div>
  );
};
