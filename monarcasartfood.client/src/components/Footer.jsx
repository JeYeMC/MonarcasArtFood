
import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Monarcas Art Food</h3>
            <p className="text-gray-300 mb-4">
              Deliciosa comida rápida con los mejores ingredientes, entregada directamente a tu puerta.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#menu" className="text-gray-300 hover:text-white transition-colors">Menú</a>
              </li>
              <li>
                <a href="#promotions" className="text-gray-300 hover:text-white transition-colors">Promociones</a>
              </li>
              <li>
                <a href="#locations" className="text-gray-300 hover:text-white transition-colors">Locales</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Calle 40A # 27 - 36, Villa Nueva
              </li>
              <li className="text-gray-300">
                +57 313 859 6605
              </li>
              <li className="text-gray-300">
                info@monarcasaf.com
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Horarios</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Martes - Jueves: 6:30 - 10:00
              </li>
              <li className="text-gray-300">
                Viernes - Sábado: 6:30 - 10:30
              </li>
              <li className="text-gray-300">
                Domingo: 6:30 - 9:30
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Monarcas Art Food. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
