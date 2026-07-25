'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Plus, Minus, ChevronLeft, CircleCheck } from 'lucide-react'
import { useUser, useClerk } from '@clerk/nextjs'
import { productos } from '../../../data/products'
import { useCart } from '../../../components/CartContext'
import { useFavorites } from '../../../components/FavoritesContext'
import { useToast } from '../../../components/ToastContext'
import PageTransition from '../../../components/PageTransition'
import { WHATSAPP_NUMBER } from '../../../lib/constants'
import { fadeUp } from '../../../lib/motion'

export default function ProductoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // En Next.js 16, params llega como una Promise en client components.
  // `use()` la desenvuelve (es el reemplazo de hacerlo async en un server component).
  const { id } = use(params)
  const producto = productos.find((p) => p.id === id)

  const { addToCart } = useCart()
  const { isSignedIn } = useUser()
  const { openSignIn } = useClerk()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const [quantity, setQuantity] = useState(1)

  if (!producto) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-[#F8F8F8] pt-40 pb-24 px-6 text-center">
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-4">
            No encontramos este producto
          </h1>
          <Link href="/productos" className="text-[#7A8F5C] underline">
            Volver al catálogo
          </Link>
        </main>
      </PageTransition>
    )
  }

  const increment = () => setQuantity((prev) => prev + 1)
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleFavoriteClick = () => {
    if (!isSignedIn) {
      openSignIn()
      return
    }
    toggleFavorite(producto.id)
  }

  const handleAddToCart = () => {
    addToCart(
      { id: producto.id, name: producto.name, price: producto.price, image: producto.imageUrl },
      quantity
    )
    showToast(`${producto.name} agregado al carrito`)
  }

  const handleWhatsApp = () => {
    const message = `¡Hola! Quiero comprar ${quantity} unidad(es) de: ${producto.name}.`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#F8F8F8] pt-28 md:pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/productos"
            className="inline-flex items-center gap-1 text-sm text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors mb-10"
          >
            <ChevronLeft size={16} />
            Volver al catálogo
          </Link>

          {/* Bloque principal: imagen + info de compra */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="relative aspect-square bg-white rounded-3xl border border-neutral-200 overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                Imagen
              </div>
              <button
                onClick={handleFavoriteClick}
                className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur rounded-full hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite(producto.id) ? 'fill-[#7A8F5C] text-[#7A8F5C]' : 'text-gray-400'
                  }`}
                />
              </button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col justify-center"
            >
              <p className="text-sm uppercase tracking-wide text-[#7A8F5C] font-medium mb-3">
                {producto.category}
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                {producto.name}
              </h1>

              <p className="text-2xl font-semibold text-[#1A1A1A] mb-6">
                ${producto.price.toLocaleString()}
              </p>

              <p className="text-[#1A1A1A]/70 leading-7 mb-8">
                {producto.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={decrement}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-50"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={increment}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-50"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Agregar al carrito
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 bg-[#111111] text-white font-medium rounded-lg hover:bg-black transition-colors"
                >
                  Comprar ahora
                </button>
              </div>
            </motion.div>
          </div>

          {/* Características */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="bg-white rounded-3xl border border-neutral-200 p-8 md:p-12 mb-8"
          >
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">
              Características
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {producto.characteristics.map((item) => (
                <div key={item.label} className="flex justify-between border-b border-neutral-100 pb-3">
                  <dt className="text-[#1A1A1A]/60">{item.label}</dt>
                  <dd className="text-[#1A1A1A] font-medium text-right">{item.value}</dd>
                </div>
              ))}
            </dl>
          </motion.section>

          {/* Ventajas */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="bg-white rounded-3xl border border-neutral-200 p-8 md:p-12 mb-8"
          >
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">
              Ventajas
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {producto.advantages.map((advantage) => (
                <li key={advantage} className="flex items-start gap-3">
                  <CircleCheck size={18} className="text-[#7A8F5C] shrink-0 mt-0.5" />
                  <span className="text-[#1A1A1A]/75">{advantage}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Modo de uso + Recomendaciones */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-neutral-200 p-8 md:p-12"
            >
              <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Modo de uso
              </h2>
              <p className="text-[#1A1A1A]/70 leading-7">{producto.usage}</p>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-neutral-200 p-8 md:p-12"
            >
              <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Recomendaciones
              </h2>
              <p className="text-[#1A1A1A]/70 leading-7">{producto.recommendations}</p>
            </motion.section>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
