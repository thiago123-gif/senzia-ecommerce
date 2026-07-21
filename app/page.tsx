'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { staggerContainer, staggerItem } from '../lib/motion'

export default function HeroSection() {
  return (
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
  )
}