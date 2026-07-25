'use client'

import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

import { useCart } from '../../components/CartContext'
import { WHATSAPP_NUMBER } from '../../lib/constants'


export default function CartPage() {

  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart()


  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )


  const handleWhatsApp = () => {

    const resumen = items
      .map(
        item =>
          `• ${item.quantity}x ${item.name} - $${item.price}`
      )
      .join('\n')


    const mensaje =
`Hola! Quiero realizar una compra:

${resumen}

Total: $${total.toLocaleString('es-AR')}`


    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`,
      '_blank'
    )
  }



  if(items.length === 0){

    return (

      <main className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      ">

        <motion.div
          initial={{
            opacity:0,
            y:20
          }}

          animate={{
            opacity:1,
            y:0
          }}

          className="
            text-center
            max-w-md
          "
        >

          <div className="
            mx-auto
            mb-8
            w-20
            h-20
            rounded-full
            bg-neutral-100
            flex
            items-center
            justify-center
          ">

            <ShoppingBag
              size={34}
              className="text-neutral-700"
            />

          </div>


          <h1 className="
            text-3xl
            font-semibold
            tracking-tight
          ">
            Tu carrito está vacío
          </h1>


          <p className="
            mt-4
            text-neutral-500
            leading-relaxed
          ">
            Descubrí nuestras fragancias y transformá tus espacios.
          </p>


        </motion.div>

      </main>

    )
  }




  return (

    <main className="
      min-h-screen
      pt-32
      px-6
      pb-20
      max-w-7xl
      mx-auto
    ">


      <motion.h1

        initial={{
          opacity:0,
          y:-20
        }}

        animate={{
          opacity:1,
          y:0
        }}

        className="
          text-4xl
          font-semibold
          tracking-tight
          mb-12
        "
      >
        Tu carrito
      </motion.h1>




      <div className="
        grid
        lg:grid-cols-[1fr_380px]
        gap-10
      ">



        {/* PRODUCTOS */}

        <section className="space-y-5">


          {
            items.map((item)=> (

              <motion.article

                key={item.id}

                initial={{
                  opacity:0,
                  y:15
                }}

                animate={{
                  opacity:1,
                  y:0
                }}

                className="
                  bg-white
                  border
                  border-neutral-200
                  rounded-3xl
                  p-5
                  flex
                  gap-5
                  items-center
                "
              >


                <div className="
                  relative
                  w-28
                  h-28
                  rounded-2xl
                  overflow-hidden
                  bg-neutral-100
                  shrink-0
                ">

                  {
                    item.image && (

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="
                          object-cover
                        "
                      />

                    )
                  }


                </div>



                <div className="
                  flex-1
                ">

                  <h2 className="
                    text-lg
                    font-medium
                  ">
                    {item.name}
                  </h2>


                  <p className="
                    text-neutral-500
                    mt-1
                  ">
                    ${item.price.toLocaleString('es-AR')}
                  </p>




                  <div className="
                    flex
                    items-center
                    gap-3
                    mt-5
                  ">


                    <button

                      onClick={() =>
                        decreaseQuantity(item.id)
                      }

                      className="
                        w-9
                        h-9
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        hover:bg-neutral-100
                        transition
                      "
                    >

                      <Minus size={16}/>

                    </button>



                    <span className="
                      min-w-6
                      text-center
                      font-medium
                    ">
                      {item.quantity}
                    </span>




                    <button

                      onClick={() =>
                        increaseQuantity(item.id)
                      }

                      className="
                        w-9
                        h-9
                        rounded-full
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                        hover:opacity-80
                        transition
                      "
                    >

                      <Plus size={16}/>

                    </button>


                  </div>


                </div>




                <button

                  onClick={() =>
                    removeFromCart(item.id)
                  }

                  className="
                    text-neutral-400
                    hover:text-black
                    transition
                  "
                >

                  <Trash2 size={20}/>

                </button>




              </motion.article>


            ))
          }


        </section>






        {/* RESUMEN */}


        <aside className="
          lg:sticky
          lg:top-28
          h-fit
          bg-neutral-50
          rounded-3xl
          p-8
        ">


          <h2 className="
            text-xl
            font-semibold
            mb-8
          ">
            Resumen
          </h2>



          <div className="
            flex
            justify-between
            text-neutral-600
          ">

            <span>
              Productos
            </span>

            <span>
              {items.length}
            </span>

          </div>




          <div className="
            border-t
            my-6
          "/>




          <div className="
            flex
            justify-between
            items-center
          ">

            <span className="
              text-lg
            ">
              Total
            </span>


            <span className="
              text-3xl
              font-semibold
            ">
              ${total.toLocaleString('es-AR')}
            </span>


          </div>





          <button

            onClick={handleWhatsApp}

            className="
              mt-8
              w-full
              bg-black
              text-white
              py-4
              rounded-full
              font-medium
              hover:opacity-80
              transition
            "
          >

            Finalizar por WhatsApp

          </button>



        </aside>




      </div>



    </main>

  )

}