import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FoodCard from "@/components/FoodCard";

const MenuSection = ({ categorias, onAddToCart }) => {
    if (!categorias || categorias.length === 0) {
        return <div className="text-center py-10">Cargando menú...</div>;
    }

    return (
        <section id="menu" className="py-16 menu-section">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro Menú</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Descubre nuestra variedad de deliciosas opciones preparadas con los mejores ingredientes.
                    </p>
                </motion.div>

                <Tabs defaultValue={categorias[0].name} className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-white/50 backdrop-blur-sm overflow-x-auto">
                            {categorias.map((categoria) => (
                                <TabsTrigger key={categoria.id} value={categoria.name}>
                                    {categoria.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {categorias.map((categoria) => (
                        <TabsContent key={categoria.id} value={categoria.name} className="mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {categoria.productos.map((producto) => (
                                    <FoodCard
                                        key={producto.id}
                                        food={producto}
                                        onAddToCart={onAddToCart}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};

export default MenuSection;
