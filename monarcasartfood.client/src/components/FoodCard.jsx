import React from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

const FoodCard = ({ food, onAddToCart }) => {
    // Si hay promociones, usamos el primero como referencia
    const promo = food.promociones?.[0];
    const hasDiscount = promo && promo.precioPromocional < food.precio;
    const discountPercent = hasDiscount
        ? Math.round(((food.precio - promo.precioPromocional) / food.precio) * 100)
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="food-card"
        >
            <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                    <img
                        alt={`${food.name} image`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        src={food.imageUrl || "/Imagenes/hamburguesa_sencilla.jpg"}
                    />
                    {hasDiscount && (
                        <Badge variant="destructive" className="absolute top-2 left-2">
                            {discountPercent}% DESCUENTO
                        </Badge>
                    )}
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{food.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                    <p className="text-sm text-muted-foreground">{food.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-0">
                    <div className="font-bold text-lg">
                        {hasDiscount ? (
                            <div className="flex items-center gap-2">
                                <span className="text-destructive">
                                    ${promo.precioPromocional}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                    ${food.price != null ? `$${food.price}` : "Precio no disponible"}
                                </span>
                            </div>
                        ) : (
                                <span>
                                    {food.price != null ? `$${food.price}` : "Precio no disponible"}
                                </span>
                        )}
                    </div>
                    <Button
                        onClick={() => onAddToCart(food)}
                        size="sm"
                        className="rounded-full"
                    >
                        <PlusCircle className="h-4 w-4 mr-1" /> Añadir
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default FoodCard;
