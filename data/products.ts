export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
}

export const productos: Product[] = [
  { id: "home-spray-vainilla", name: "Home Spray Vainilla", price: 4500, imageUrl: "" },
  { id: "difusor-coco", name: "Difusor Coco", price: 6200, imageUrl: "" },
  { id: "vela-lavanda", name: "Vela Aromática Lavanda", price: 3800, imageUrl: "" },
  { id: "aceite-jazmin", name: "Aceite Esencial Jazmín", price: 2900, imageUrl: "" },
]