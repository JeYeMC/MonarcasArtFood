import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FoodCard from "./FoodCard";

const FoodWithCategories = ({ onAddToCart }) => {
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState("Todos");

    useEffect(() => {
        axios.get("https://localhost:7105/api/Categorias")
            .then(response => {
                const categoriasConProductos = response.data.map(c => ({
                    id: c.id,
                    name: c.nombre,
                    productos: c.productos.map(p => ({
                        id: p.id,
                        name: p.nombre,
                        description: p.descripcion,
                        price: p.precio,
                        imageUrl: p.imagenUrl,
                        discount: p.promociones && p.promociones.length > 0
                            ? Math.round(100 - (p.promociones[0].precioPromocional * 100 / p.precio))
                            : null,
                        isNew: false,
                        category: c.nombre
                    }))
                }));

                const allProducts = categoriasConProductos.flatMap(c => c.productos);
                setCategories([
                    { id: "Todos", name: "Todos", productos: allProducts },
                    ...categoriasConProductos
                ]);
            })
            .catch(error => {
                console.error("Error al cargar categorías:", error);
            });
    }, []);

    if (categories.length === 0) {
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro Menu</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Descubre nuestra variedad de deliciosas opciones preparadas con los mejores ingredientes.
                    </p>
                </motion.div>

                <Tabs defaultValue="Todos" onValueChange={setSelected} className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-white/50 backdrop-blur-sm overflow-x-auto">
                            {categories.map((cat) => (
                                <TabsTrigger key={cat.name} value={cat.name}>
                                    {cat.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {categories.map((cat) => (
                        <TabsContent key={cat.name} value={cat.name} className="mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {cat.productos.map((producto) => (
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

export default FoodWithCategories;
