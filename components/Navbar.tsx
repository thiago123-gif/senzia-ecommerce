'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Search, X, Heart, Menu } from 'lucide-react'
import { useCart } from './CartContext'
import { useRouter } from 'next/navigation'
import { Show, SignInButton, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  const { items } = useCart()
  const [isMounted, setIsMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl tracking-tighter">SENZIA</Link>

      <div className="hidden md:flex gap-8 font-medium text-sm">
        <Link href="/">Inicio</Link>
        <Link href="/productos">Productos</Link>
        <Link href="/nosotros">Nosotros</Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="hover:text-[#7A8F5C] transition-colors"
        >
          {isSearchOpen ? <X size={20} /> : <Search size={20} />}
        </button>

        <Link href="/favoritos" className="hover:text-[#7A8F5C] transition-colors">
          <Heart size={20} />
        </Link>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="hover:text-[#7A8F5C] transition-colors text-sm font-medium">
              Ingresar
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>

        <Link href="/carrito" className="relative hover:text-[#7A8F5C] transition-colors">
          <ShoppingBag size={20} />
          {isMounted && items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Link>

        {/* Botón hamburguesa: solo visible en pantallas chicas (mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden hover:text-[#7A8F5C] transition-colors"
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white p-4 border-b shadow-sm animate-in slide-in-from-top-4">
          <input
            type="text"
            placeholder="Buscar fragancias..."
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A8F5C]"
            autoFocus
            onChange={(e) => router.push(`/productos?q=${e.target.value}`)}
          />
        </div>
      )}

      {/* Menú desplegable para mobile: Inicio / Productos / Nosotros */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-sm flex flex-col gap-1 p-4 font-medium text-sm">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-2 rounded-lg hover:bg-gray-50">
            Inicio
          </Link>
          <Link href="/productos" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-2 rounded-lg hover:bg-gray-50">
            Productos
          </Link>
          <Link href="/nosotros" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-2 rounded-lg hover:bg-gray-50">
            Nosotros
          </Link>
        </div>
      )}
    </nav>
  )
}
