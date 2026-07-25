'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { staggerContainer, staggerItem, fadeUp } from '../lib/motion'
import { productos } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function HeroSection() {
  // Productos destacados en la home: por ahora los primeros 4 del catálogo.
  // Cuando haya más productos, esto se puede cambiar por una lista curada a mano.
  const destacados = productos.slice(0, 4)

  return (
    <>
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#F8F8F8] overflow-hidden px-4">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-7xl font-bold text-[#1A1A1A] tracking-tight mb-6"
          >
            Transformá cada ambiente con la fragancia perfecta.
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-base md:text-xl text-[#1A1A1A]/80 mb-10 max-w-2xl font-light"
          >
            Descubrí nuestra selección de fragancias para ofrecerte la mejor calidad al mejor precio.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center w-full"
          >
            <Link
              href="/productos"
              className="px-8 py-4 bg-[#111111] hover:bg-[#000000] text-white rounded-full transition-all duration-300 font-medium cursor-pointer text-center"
            >
              Ver catálogo
            </Link>
          </motion.div>
        </motion.div>

      </section>

      {/* Productos destacados */}
      <section className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-sm uppercase tracking-wide text-[#7A8F5C] font-medium mb-2">
                Selección SENZIA
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                Productos destacados
              </h2>
            </div>

            <Link
              href="/productos"
              className="inline-flex items-center gap-1.5 text-[#1A1A1A] font-medium hover:gap-2.5 transition-all duration-300 whitespace-nowrap"
            >
              Ver todo el catálogo
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {destacados.map((producto) => (
              <motion.div key={producto.id} variants={staggerItem}>
                <ProductCard
                  id={producto.id}
                  name={producto.name}
                  price={producto.price}
                  imageUrl={producto.imageUrl}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  )
}
