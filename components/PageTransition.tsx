'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { fadeUp } from '../lib/motion'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {children}
    </motion.div>
  )
}