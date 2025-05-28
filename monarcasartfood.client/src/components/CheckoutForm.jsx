
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { manizalesBarrios, paymentMethods } from "@/data/manizalesBarrios";

const CheckoutForm = ({ cartItems, totalPrice, onWhatsAppOrder, closeDialog, updateDeliveryCost }) => {
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    barrio: "",
    address: "",
    phone: "",
    paymentMethod: "",
  });
  const [currentDeliveryCost, setCurrentDeliveryCost] = useState(0);

  useEffect(() => {
    const selectedBarrioData = manizalesBarrios.find(b => b.name === customerInfo.barrio);
    const cost = selectedBarrioData ? selectedBarrioData.deliveryCost : 0;
    setCurrentDeliveryCost(cost);
    updateDeliveryCost(cost);
  }, [customerInfo.barrio, updateDeliveryCost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.barrio || !customerInfo.address || !customerInfo.phone || !customerInfo.paymentMethod) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa todos los campos para continuar.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    onWhatsAppOrder(customerInfo, currentDeliveryCost);
    closeDialog();
  };

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Información de Entrega y Pago</DialogTitle>
        <DialogDescription>
          Ingresa tus datos para completar el pedido. El costo de envío se actualizará según el barrio.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Input id="name" name="name" placeholder="Nombre Completo" value={customerInfo.name} onChange={handleChange} />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Select onValueChange={(value) => handleSelectChange("barrio", value)} value={customerInfo.barrio}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona tu Barrio" />
            </SelectTrigger>
            <SelectContent>
              {manizalesBarrios.map((barrio) => (
                <SelectItem key={barrio.name} value={barrio.name}>
                  {barrio.name} - (${barrio.deliveryCost})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Input id="address" name="address" placeholder="Dirección (Ej: Calle 50 #20-30, Apto 101)" value={customerInfo.address} onChange={handleChange} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Input id="phone" name="phone" type="tel" placeholder="Número de Contacto" value={customerInfo.phone} onChange={handleChange} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Select onValueChange={(value) => handleSelectChange("paymentMethod", value)} value={customerInfo.paymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona Método de Pago" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.id} value={method.name}>
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </form>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={closeDialog}>
          Cancelar
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Enviar Pedido por WhatsApp
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CheckoutForm;
