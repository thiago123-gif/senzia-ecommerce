'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useUser, SignInButton } from '@clerk/nextjs'

import { useFavorites } from '../../components/FavoritesContext'
import ProductCard from '../../components/ProductCard'
import { productos } from '../../data/products'


export default function FavoritosPage() {

  const { isSignedIn, isLoaded: userLoaded } = useUser()
  const { favoriteIds } = useFavorites()


  if (!userLoaded) {
    return null
  }


  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
            <Heart size={34} className="text-neutral-700" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Iniciá sesión para ver tus favoritos
          </h1>

          <p className="mt-4 text-neutral-500 leading-relaxed">
            Creá una cuenta gratuita para guardar tus fragancias preferidas y encontrarlas cuando quieras.
          </p>

          <SignInButton mode="modal">
            <button className="mt-8 px-8 py-4 bg-black text-white rounded-full font-medium hover:opacity-80 transition">
              Iniciar sesión
            </button>
          </SignInButton>
        </motion.div>
      </main>
    )
  }


  const favoriteProducts = productos.filter(
    product => favoriteIds.includes(product.id)
  )


  if (favoriteProducts.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
            <Heart size={34} className="text-neutral-700" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Todavía no tenés favoritos
          </h1>

          <p className="mt-4 text-neutral-500 leading-relaxed">
            Explorá el catálogo y tocá el corazón en los productos que más te gusten.
          </p>
        </motion.div>
      </main>
    )
  }


  return (
    <main className="min-h-screen pt-32 px-6 pb-20 max-w-7xl mx-auto">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-semibold tracking-tight mb-12"
      >
        Tus favoritos
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoriteProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>

    </main>
  )
}