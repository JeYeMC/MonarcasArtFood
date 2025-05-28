
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useCart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        localStorage.removeItem("cart"); 
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
        
        toast({
          title: "Cantidad actualizada",
          description: `${item.name} (${existingItem.quantity + 1})`,
          duration: 2000,
        });
        
        return updatedItems;
      } else {
        toast({
          title: "Añadido al carrito",
          description: item.name,
          duration: 2000,
        });
        
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === itemId);
      
      if (item && item.quantity > 1) {
        return prevItems.map(cartItem => 
          cartItem.id === itemId 
            ? { ...cartItem, quantity: cartItem.quantity - 1 } 
            : cartItem
        );
      } else {
        return prevItems.filter(item => item.id !== itemId);
      }
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Carrito vaciado",
      description: "Se han eliminado todos los productos",
      duration: 2000,
    });
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    setCartItems
  };
};
