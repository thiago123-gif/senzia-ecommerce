'use client'
import { Suspense } from 'react'
import ProductCard from '../../components/ProductCard'
import PageTransition from '../../components/PageTransition'
import { useSearchParams } from 'next/navigation'
import { productos } from '../../data/products'

function ProductosContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const productosFiltrados = productos.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          {query ? `Resultados para: "${query}"` : "Catálogo Premium"}
        </h1>

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
