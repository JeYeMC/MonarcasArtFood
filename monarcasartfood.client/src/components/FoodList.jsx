import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "./FoodCard"; // Asegúrate de que este archivo exista

const FoodList = ({ onAddToCart }) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7105/api/Productos") // Verifica el puerto
            .then(response => {
                console.log("Productos desde la API:", response.data); // 👈 Para depuración

                const productos = response.data.map(p => ({
                    id: p.id,
                    name: p.nombre,
                    description: p.descripcion,
                    price: p.precio,
                    imageUrl: p.imagenUrl,
                    discount: p.promociones && p.promociones.length > 0
                        ? Math.round(100 - (p.promociones[0].precioPromocional * 100 / p.precio))
                        : null,
                    isNew: false, // Puedes cambiar esta lógica más adelante si lo necesitas
                }));

                setFoods(productos);
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {foods.length > 0 ? (
                foods.map(food => (
                    <FoodCard key={food.id} food={food} onAddToCart={onAddToCart} />
                ))
            ) : (
                <p className="text-center col-span-full">No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default FoodList;
