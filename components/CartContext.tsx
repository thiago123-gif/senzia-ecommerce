'use client'

import {
  createContext,
  useContext,
  useState,
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



export function CartProvider({
  children
}: {
  children: ReactNode
}) {


  const [items,setItems] = useState<CartItem[]>([])



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