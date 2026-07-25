'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"


export interface Product {
  id: string
  name: string
  price: number
  image?: string
}


export interface CartItem extends Product {
  quantity: number
}



interface CartContextType {

  items: CartItem[]

  addToCart: (product: Product, quantity?: number) => void

  removeFromCart: (id: string) => void

  increaseQuantity: (id: string) => void

  decreaseQuantity: (id: string) => void

  clearCart: () => void

}



const CartContext = createContext<CartContextType | undefined>(
  undefined
)


// Clave con la que se guarda el carrito en el navegador (localStorage)
const CART_STORAGE_KEY = "senzia-cart"



export function CartProvider({
  children
}: {
  children: ReactNode
}) {


  const [items,setItems] = useState<CartItem[]>([])

  // Controla si ya terminamos de leer el carrito guardado en el navegador.
  // Empieza en false para no pisar el localStorage con un carrito vacío
  // antes de haber tenido la chance de leerlo.
  const [isLoaded, setIsLoaded] = useState(false)


  // AL MONTAR: leer el carrito guardado en el navegador (si existe)
  //
  // Esto corre solo en el cliente (useEffect nunca se ejecuta en el
  // servidor), así que es seguro usar localStorage acá adentro.
  useEffect(() => {

    try {

      const savedCart = localStorage.getItem(CART_STORAGE_KEY)

      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }

    } catch (error) {

      console.error("No se pudo leer el carrito guardado:", error)

    } finally {

      setIsLoaded(true)

    }

  }, [])


  // CADA VEZ QUE CAMBIA EL CARRITO: guardarlo en el navegador
  //
  // Se espera a que isLoaded sea true para no sobreescribir el carrito
  // guardado con el estado inicial vacío, antes de leerlo.
  useEffect(() => {

    if (!isLoaded) return

    try {

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))

    } catch (error) {

      console.error("No se pudo guardar el carrito:", error)

    }

  }, [items, isLoaded])



  // AGREGAR PRODUCTO
  // Si existe aumenta cantidad
  // Si no existe crea uno nuevo

  const addToCart = (product: Product, quantity: number = 1) => {


    setItems(currentItems => {


      const existingProduct = currentItems.find(
        item => item.id === product.id
      )


      if(existingProduct){

        return currentItems.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity:item.quantity + quantity
              }
            : item
        )

      }



      return [
        ...currentItems,
        {
          ...product,
          quantity
        }
      ]

    })


  }




  // ELIMINAR PRODUCTO COMPLETO

  const removeFromCart = (id:string)=>{

    setItems(current =>
      current.filter(
        item => item.id !== id
      )
    )

  }





  // SUMAR CANTIDAD

  const increaseQuantity = (id:string)=>{


    setItems(current =>

      current.map(item =>

        item.id === id

        ?

        {
          ...item,
          quantity:item.quantity + 1
        }

        :

        item

      )

    )


  }




  // RESTAR CANTIDAD

  const decreaseQuantity = (id:string)=>{


    setItems(current =>

      current.map(item => {


        if(item.id !== id)
          return item



        return {

          ...item,

          quantity:
            item.quantity > 1
            ? item.quantity - 1
            : 1

        }


      })

    )


  }




  const clearCart = ()=>{

    setItems([])

  }





  return (

    <CartContext.Provider

      value={{

        items,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart

      }}

    >

      {children}

    </CartContext.Provider>

  )

}




export function useCart(){


  const context = useContext(CartContext)


  if(!context){

    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    )

  }


  return context


}
