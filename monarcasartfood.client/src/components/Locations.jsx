import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Locations = () => {
    const locations = [
        {
            id: 1,
            name: "Monarcas Fast-Food",
            address: "Cl. 40a #27-36, Villa Nueva",
            hours: "6:30 - 10:00",
            phone: "+57 3138596605",
            lat: 5.063377,    // Latitud obtenida de Google Maps
            lng: -75.507731,   // Longitud obtenida de Google Maps
        },
    ];

    return (
        <section id="locations" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Locales</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Visítanos en cualquiera de nuestras ubicaciones o pide a domicilio desde la más cercana.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Imagen estática a la izquierda */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-gray-100 rounded-lg overflow-hidden h-[600px]"
                    >
                        <img
                            alt="Map showing restaurant locations"
                            className="w-full h-full object-cover"
                            src="/Imagenes/local.png"
                        />
                    </motion.div>

                    {/* Información y mapa debajo del teléfono */}
                    <div className="space-y-6">
                        {locations.map((location, index) => (
                            <motion.div
                                key={location.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                            >
                                <h3 className="text-xl font-bold mb-3">{location.name}</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <MapPin className="h-5 w-5 text-primary mr-2" />
                                        <span>{location.address}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-primary mr-2" />
                                        <span>{location.hours}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-primary mr-2" />
                                        <span>{location.phone}</span>
                                    </div>
                                </div>

                                {/* Mapa de Leaflet */}
                                <div className="mt-4 rounded overflow-hidden shadow-lg">
                                    <MapContainer
                                        center={[location.lat, location.lng]}
                                        zoom={15}
                                        style={{ height: "300px", width: "100%" }}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[location.lat, location.lng]}>
                                            <Popup>
                                                {location.name}<br />{location.address}
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Locations;
