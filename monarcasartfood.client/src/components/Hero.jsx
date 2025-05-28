
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="hero-section text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Sabores Irresistibles a un Click de Distancia
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Descubre nuestra selección de deliciosas hamburguesas, perros y más. 
              Entrega rápida y calidad garantizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Ver Menú <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Promociones
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img  
                alt="Delicious burger with fries"
                className="w-full h-auto"
               src="/Imagenes/abrimos.jpg" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-lg shadow-lg z-20"
            >
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full h-3 w-3 mr-2"></div>
                <span className="font-medium">Entrega en 45 min o menos</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-secondary text-black p-4 rounded-lg shadow-lg z-20"
            >
              <div className="font-bold">¡DOMICILIO GRATIS!</div>
              <div className="text-sm">En tu primer pedido</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
