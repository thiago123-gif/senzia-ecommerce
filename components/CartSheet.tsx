'use client'
import { useCart } from './CartContext'
import { X } from 'lucide-react'

export default function CartSheet({ onClose }: { onClose: () => void }) {
  const { items, removeFromCart } = useCart()
  
  const total = items.reduce((acc: number, i: any) => acc + (i.price * i.quantity), 0)

  const handleWhatsAppCart = () => {
    if (items.length === 0) return;
    const resumen = items.map((i: any) => `• ${i.quantity}x ${i.name} ($${i.price})`).join('\n')
    const mensaje = `¡Hola! Quiero comprar:\n\n${resumen}\n\nTotal: $${total}`
    const url = `https://wa.me/5493454086271?text=${encodeURIComponent(mensaje)}` // Cambia el numero!
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro detrás */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      {/* Panel lateral */}
      <div className="bg-white w-full max-w-sm h-full p-6 relative shadow-xl overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tu Carrito</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
        </div>
        
        {items.length === 0 ? <p className="text-gray-500">Tu carrito está vacío.</p> : (
          <>
            {items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center mb-4 border-b pb-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Cant: {item.quantity} - ${item.price * item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(index)} className="text-red-500 text-sm hover:underline">Eliminar</button>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t">
              <p className="text-lg font-bold mb-4">Total: ${total.toLocaleString()}</p>
              <button 
                onClick={handleWhatsAppCart}
                className="w-full py-3 bg-[#111111] text-white rounded-lg font-medium hover:bg-black transition-colors"
              >
                Comprar todo por WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}