import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cart from "@/components/Cart";

const Navbar = ({ cartItems, removeFromCart, clearCart, onWhatsAppOrder }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const navLinks = [
        { name: "Inicio", href: "#home" },
        { name: "Menú", href: "#menu" },
        { name: "Promociones", href: "#promotions" },
        { name: "Locales", href: "#locations" },
        { name: "Contacto", href: "#contact" },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleOrderNow = () => {
        if (totalItems === 0) {
            setAlertMessage("Selecciona los productos que deseas ordenar");
            scrollToSection("menu");
        } else {
            setAlertMessage("Verifica tu pedido dando clic en el carrito");
        }

        setTimeout(() => {
            setAlertMessage("");
        }, 4000);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-bold"
                            style={{
                                color: "#FF9800",
                                marginRight: "20px",
                            }}
                        >
                            Monarcas Fast-Food
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="nav-link text-gray-700 hover:text-primary font-medium transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    <ShoppingCart className="h-5 w-5" />
                                    {totalItems > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="cart-badge"
                                        >
                                            {totalItems}
                                        </motion.span>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <Cart
                                    cartItems={cartItems}
                                    removeFromCart={removeFromCart}
                                    clearCart={clearCart}
                                    onWhatsAppOrder={onWhatsAppOrder}
                                />
                            </SheetContent>
                        </Sheet>

                        <Button
                            variant="default"
                            className="hidden md:flex"
                            style={{ backgroundColor: "#FF9800", color: "white" }}
                            onClick={handleOrderNow}
                        >
                            Ordenar Ahora
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mensaje de alerta con estilo impecable */}
                <AnimatePresence>
                    {alertMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-6 py-3 rounded shadow-lg flex items-center space-x-2 z-50 max-w-sm"
                        >
                            <Info className="w-5 h-5" />
                            <span className="font-semibold">{alertMessage}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <nav className="flex flex-col space-y-4 py-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-gray-700 hover:text-primary font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <Button
                                    variant="default"
                                    className="mt-2"
                                    style={{ backgroundColor: "#FF9800", color: "white" }}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        handleOrderNow();
                                    }}
                                >
                                    Ordenar Ahora
                                </Button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
