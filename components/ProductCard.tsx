'use client'

import { useState } from 'react'
import { Heart, Plus, Minus } from 'lucide-react'
import { useUser, useClerk } from '@clerk/nextjs'
import { useCart } from './CartContext'
import { useFavorites } from './FavoritesContext'
import { WHATSAPP_NUMBER } from '../lib/constants'

interface ProductProps {
  id: string
  name: string
  price: number
  imageUrl: string
}

export default function ProductCard({ id, name, price, imageUrl }: ProductProps) {
  const { addToCart } = useCart()
  const { isSignedIn } = useUser()
  const { openSignIn } = useClerk()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [quantity, setQuantity] = useState(1)

  const increment = () => setQuantity(prev => prev + 1)
  const decrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  const handleFavoriteClick = () => {
    if (!isSignedIn) {
      openSignIn()
      return
    }
    toggleFavorite(id)
  }

  const handleWhatsApp = () => {
    const message = `¡Hola! Quiero comprar ${quantity} unidad(es) de: ${name}.`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
          Imagen
        </div>
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:scale-110 transition-transform"
        >
          <Heart className={`w-5 h-5 ${isFavorite(id) ? 'fill-[#7A8F5C] text-[#7A8F5C]' : 'text-gray-400'}`} />
        </button>
      </div>

      <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
      <p className="text-lg font-bold text-gray-900 mb-4">${price.toLocaleString()}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button onClick={decrement} className="px-3 py-1 text-gray-600 hover:bg-gray-50"><Minus size={14} /></button>
          <span className="px-3 text-sm font-medium">{quantity}</span>
          <button onClick={increment} className="px-3 py-1 text-gray-600 hover:bg-gray-50"><Plus size={14} /></button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button 
          onClick={() => {
            addToCart({ id, name, price, image: imageUrl }, quantity);
            alert('¡Producto agregado al carrito!');
          }}
          className="w-full py-2.5 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Agregar al carrito
        </button>

        <button 
          onClick={handleWhatsApp}
          className="w-full py-2.5 bg-[#111111] text-white font-medium rounded-lg hover:bg-black transition-colors text-sm"
        >
          Comprar ahora
        </button>
      </div>
    </div>
  )
}