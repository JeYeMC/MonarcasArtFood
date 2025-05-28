import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const Promotions = () => {
    return (
        <section
            id="promotions"
            className="py-24 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
        >
            <div className="container mx-auto px-4 text-center max-w-3xl">
                <motion.h2
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
                >
                    ¡Promociones Exclusivas <br /> Muy Pronto!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-lg md:text-xl mb-12 font-semibold drop-shadow-md"
                >
                    Estamos preparando ofertas irresistibles para que disfrutes tus sabores favoritos a precios increíbles.
                    <br />
                    ¡Mantente atento y no te las pierdas!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    <div
                        className="inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-white text-red-600 font-bold text-4xl md:text-5xl shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:shadow-[0_0_35px_rgba(255,0,0,0.5)] transition-shadow duration-300 ease-in-out select-none"
                    >
                        <Clock className="w-10 h-10 text-red-600 animate-pulse" />
                        <span
                            className="tracking-wide"
                            style={{
                                textShadow: "0 0 6px rgba(255, 0, 0, 0.5)"
                            }}
                        >
                            Próximamente
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Promotions;
