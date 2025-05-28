
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: "Combo Familiar",
      description: "4 hamburguesas, 2 papas grandes y 4 bebidas",
      price: 29.99,
      originalPrice: 39.99,
      image: "family combo"
    },
    {
      id: 2,
      title: "Pizza + Refresco",
      description: "Pizza mediana de cualquier especialidad y 2 refrescos",
      price: 15.99,
      originalPrice: 19.99,
      image: "pizza and soda combo"
    },
    {
      id: 3,
      title: "Martes 2x1",
      description: "Compra una hamburguesa y llévate otra gratis",
      price: 8.99,
      originalPrice: 17.98,
      image: "burger promotion"
    }
  ];

  return (
    <section id="promotions" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Promociones Especiales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Aprovecha nuestras ofertas por tiempo limitado y disfruta de los mejores sabores a precios increíbles.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full promo-card">
                <div className="h-48 overflow-hidden">
                  <img   
                    alt={promo.title}
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1647668322891-31471ca8eb37" />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                    <p className="text-muted-foreground">{promo.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xl font-bold text-primary">${promo.price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">${promo.originalPrice.toFixed(2)}</span>
                    </div>
                    <Button>Ordenar</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
