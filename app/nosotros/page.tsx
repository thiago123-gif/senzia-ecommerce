'use client'

import { Sparkles, HeartHandshake, Gem, Leaf } from 'lucide-react'
import PageTransition from '../../components/PageTransition'

export default function NosotrosPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-[#F8F8F8] pt-32 pb-24 px-6 md:px-12">
        <section className="max-w-5xl mx-auto">
          {/* Título */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-8">
              Sobre SENZIA
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-9 text-[#1A1A1A]/75 font-light">
              En <span className="font-semibold">SENZIA</span> creemos que una
              fragancia tiene el poder de transformar un ambiente. Nos dedicamos
              a ofrecer una cuidada selección de aromatizantes pensados para
              llenar cada espacio de bienestar, frescura y personalidad.
            </p>
          </div>

          {/* Misión */}
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 p-10 md:p-14 mb-16">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Nuestra misión
            </h2>

            <p className="text-center text-lg text-[#1A1A1A]/70 leading-8 max-w-3xl mx-auto">
              Acercar fragancias de calidad que aporten armonía y bienestar a
              cada ambiente, ofreciendo una atención cercana, productos
              confiables y una excelente relación entre calidad y precio.
            </p>
          </div>

          {/* Valores */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold text-center mb-10">
              ¿Por qué elegir SENZIA?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-md transition">
                <Sparkles className="w-8 h-8 mb-4 text-black" />
                <h3 className="font-semibold text-xl mb-2">
                  Variedad de fragancias
                </h3>
                <p className="text-[#1A1A1A]/70">
                  Aromas para cada espacio y cada momento, pensados para crear
                  ambientes únicos.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-md transition">
                <Leaf className="w-8 h-8 mb-4 text-black" />
                <h3 className="font-semibold text-xl mb-2">
                  Calidad seleccionada
                </h3>
                <p className="text-[#1A1A1A]/70">
                  Elegimos productos que destacan por su calidad, duración y
                  excelente rendimiento.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-md transition">
                <HeartHandshake className="w-8 h-8 mb-4 text-black" />
                <h3 className="font-semibold text-xl mb-2">
                  Atención personalizada
                </h3>
                <p className="text-[#1A1A1A]/70">
                  Te ayudamos a encontrar la fragancia ideal según tus gustos y
                  necesidades.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-md transition">
                <Gem className="w-8 h-8 mb-4 text-black" />
                <h3 className="font-semibold text-xl mb-2">
                  Calidad y precio
                </h3>
                <p className="text-[#1A1A1A]/70">
                  Productos cuidadosamente seleccionados para ofrecer la mejor
                  experiencia al mejor valor.
                </p>
              </div>

            </div>
          </div>

          {/* Frase */}
          <div className="text-center border-t border-neutral-200 pt-16">
            <p className="text-2xl italic font-light text-[#1A1A1A]/70">
              "Transformamos ambientes, un aroma a la vez."
            </p>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}