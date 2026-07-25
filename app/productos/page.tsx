'use client'
import { Suspense, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import PageTransition from '../../components/PageTransition'
import { useSearchParams } from 'next/navigation'
import { productos } from '../../data/products'

// Opción "Todos" + cada categoría existente en el catálogo, sin repetidos
const CATEGORIAS = ['Todos', ...Array.from(new Set(productos.map((p) => p.category)))]

function ProductosContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')

  const productosFiltrados = productos
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .filter((p) => categoriaActiva === 'Todos' || p.category === categoriaActiva)

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {query ? `Resultados para: "${query}"` : "Catálogo Premium"}
        </h1>

        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIAS.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                categoriaActiva === categoria
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosFiltrados.map((prod) => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              name={prod.name}
              price={prod.price}
              imageUrl={prod.imageUrl}
            />
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No encontramos productos con ese nombre.</p>
        )}
      </div>
    </div>
  )
}

export default function ProductosPage() {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
        <ProductosContent />
      </Suspense>
    </PageTransition>
  )
}
