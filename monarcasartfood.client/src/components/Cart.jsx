
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CheckoutForm from "@/components/CheckoutForm";
import { useToast } from "@/components/ui/use-toast";

const Cart = ({ cartItems, removeFromCart, clearCart, onWhatsAppOrder }) => {
  const { toast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity * (1 - (item.discount || 0) / 100),
    0
  );

  const totalOrderPrice = subtotal + deliveryCost;

  const handleFinalizeOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito Vacío",
        description: "Añade productos antes de finalizar el pedido.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setIsCheckoutOpen(true);
  };
  
  const updateDeliveryCostInCart = (cost) => {
    setDeliveryCost(cost);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tu Pedido</h2>
        {cartItems.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearCart}
            className="text-xs"
          >
            <Trash2 className="h-3 w-3 mr-1" /> Vaciar
          </Button>
        )}
      </div>
      
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Tu carrito está vacío</h3>
          <p className="text-muted-foreground mb-6">Añade algunos productos deliciosos para comenzar tu pedido</p>
          <Button asChild>
            <a href="#menu">Ver Menú</a>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-auto">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                      <img   
                        alt={item.name}
                        className="w-full h-full object-cover"
                        src={item.imageUrl || "https://images.unsplash.com/photo-1614496281665-1b7f456cfddf"} />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-muted-foreground mr-2">
                          Cantidad: {item.quantity}
                        </span>
                        <span className="text-sm font-medium">
                          ${(item.price * (1 - (item.discount || 0) / 100))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-6">
            <Separator className="mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span>${deliveryCost}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalOrderPrice}</span>
              </div>
            </div>
            
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-6" onClick={handleFinalizeOrder}>
                  Finalizar Pedido
                </Button>
              </DialogTrigger>
              {isCheckoutOpen && (
                 <CheckoutForm 
                    cartItems={cartItems} 
                    totalPrice={totalOrderPrice} 
                    onWhatsAppOrder={onWhatsAppOrder}
                    closeDialog={() => setIsCheckoutOpen(false)}
                    updateDeliveryCost={updateDeliveryCostInCart}
                 />
              )}
            </Dialog>
            <p className="text-xs text-muted-foreground mt-3 flex items-center">
              <Info className="h-3 w-3 mr-1" /> Serás redirigido a WhatsApp para confirmar tu pedido.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
