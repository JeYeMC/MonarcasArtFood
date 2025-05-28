import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Promotions from "@/components/Promotions";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { manizalesBarrios } from "@/data/manizalesBarrios";
import FoodList from "@/components/FoodList"; // ✅ nuevo componente dinámico
import FoodWithCategories from "./components/FoodWithCategories";

const App = () => {
    const { toast } = useToast();
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
    const WHATSAPP_NUMBER = "573138596605";

    const handleWhatsAppOrder = (customerInfo, deliveryCost) => {
        const orderDetails = cartItems.map(item =>
            `${item.quantity}x ${item.name} - $${(item.precioPromocional || item.price).toLocaleString('de-DE') } (ID: ${item.id})`
        ).join("\n");

        const subtotal = cartItems.reduce(
            (total, item) => total + (item.precioPromocional || item.price) * item.quantity, 0
        );
        const finalTotal = (subtotal + deliveryCost);
        const selectedBarrioData = manizalesBarrios.find(b => b.name === customerInfo.barrio);
        const barrioDisplayName = selectedBarrioData ? selectedBarrioData.name : customerInfo.barrio;

        const message = `
¡Hola! Quiero hacer un pedido:
-------------------------------
PRODUCTOS:
${orderDetails}
-------------------------------
INFORMACIÓN DEL CLIENTE:
Nombre: ${customerInfo.name}
Barrio: ${barrioDisplayName}
Dirección: ${customerInfo.address}
Número de Contacto: ${customerInfo.phone}
Método de Pago: ${customerInfo.paymentMethod}
-------------------------------
RESUMEN DEL PAGO:
Subtotal: $${subtotal.toLocaleString('de-DE') }
Costo de Envío (${barrioDisplayName}): $${deliveryCost.toLocaleString('de-DE') }
Total a Pagar: $${finalTotal.toLocaleString('de-DE') }
-------------------------------
¡Gracias!
    `;

        const encodedMessage = encodeURIComponent(message.trim());
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");

        toast({
            title: "Pedido enviado",
            description: "Se ha abierto WhatsApp para que confirmes tu pedido.",
            duration: 3000,
        });
        clearCart();
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                onWhatsAppOrder={handleWhatsAppOrder}
            />

            <main className="flex-grow">
                <Hero />
                {/* ✅ Aquí usamos la lista dinámica desde el backend */}
                <FoodWithCategories onAddToCart={addToCart} />
                <Promotions />
                <Locations />
            </main>

            <Footer />
            <Toaster />
        </div>
    );
};

export default App;
