export interface Characteristic {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  category: string
  description: string
  characteristics: Characteristic[]
  advantages: string[]
  usage: string
  recommendations: string
}

export const productos: Product[] = [
  {
    id: "home-spray-vainilla",
    name: "Home Spray Vainilla",
    price: 4500,
    imageUrl: "",
    category: "Spray para ambientes",
    description:
      "Aromatizante en spray de vainilla cálida y envolvente, ideal para renovar el aire de cualquier ambiente en segundos. Su fórmula de rápida difusión deja una fragancia suave y duradera, perfecta para living, dormitorio o baño.",
    characteristics: [
      { label: "Formato", value: "Spray 250 ml" },
      { label: "Familia olfativa", value: "Gourmand / dulce" },
      { label: "Duración del aroma", value: "Aprox. 4 a 6 horas por aplicación" },
      { label: "Ambientes recomendados", value: "Living, dormitorio, baño" },
    ],
    advantages: [
      "Efecto inmediato: perfuma el ambiente al instante",
      "Frasco práctico, ideal para tener siempre a mano",
      "Fragancia suave que no satura el ambiente",
      "Rendimiento aproximado de 150 aplicaciones por envase",
    ],
    usage:
      "Agitar antes de usar. Vaporizar a una distancia de 30-40 cm del ambiente a perfumar, evitando aplicar directamente sobre telas delicadas, madera o superficies pintadas.",
    recommendations:
      "Conservar en un lugar fresco, alejado de la luz solar directa. Mantener fuera del alcance de niños y mascotas. No vaporizar cerca de llamas o fuentes de calor.",
  },
  {
    id: "difusor-coco",
    name: "Difusor Coco",
    price: 6200,
    imageUrl: "",
    category: "Difusor de varillas",
    description:
      "Difusor de varillas con aroma a coco fresco, pensado para perfumar el ambiente de manera constante y pareja durante semanas, sin necesidad de electricidad ni recambios.",
    characteristics: [
      { label: "Formato", value: "Frasco 200 ml + varillas de ratán" },
      { label: "Familia olfativa", value: "Frutal / tropical" },
      { label: "Duración del aroma", value: "Aprox. 6 a 8 semanas" },
      { label: "Ambientes recomendados", value: "Living, hall de entrada, oficina" },
    ],
    advantages: [
      "Aroma continuo las 24 horas, sin electricidad",
      "Diseño prolijo que combina con cualquier decoración",
      "Intensidad regulable según la cantidad de varillas",
      "Ideal para espacios medianos y grandes",
    ],
    usage:
      "Retirar la tapa, colocar las varillas dentro del frasco y darlas vuelta cada 5-7 días para renovar la intensidad del aroma. Usar la cantidad de varillas según el tamaño del ambiente.",
    recommendations:
      "Ubicar en una superficie estable, alejado del borde de mesas o repisas. Evitar el contacto directo del líquido con superficies de madera sin proteger, ya que puede mancharlas.",
  },
  {
    id: "vela-lavanda",
    name: "Vela Aromática Lavanda",
    price: 3800,
    imageUrl: "",
    category: "Vela aromática",
    description:
      "Vela aromática de lavanda, pensada para crear un ambiente relajado y armonioso. Ideal para momentos de descanso, lectura o simplemente para darle una atmósfera cálida a cualquier rincón de la casa.",
    characteristics: [
      { label: "Formato", value: "Vela en frasco de vidrio, 180 g" },
      { label: "Familia olfativa", value: "Floral / herbal" },
      { label: "Tiempo de combustión", value: "Aprox. 35 a 40 horas" },
      { label: "Ambientes recomendados", value: "Dormitorio, living, espacios de relax" },
    ],
    advantages: [
      "Combustión pareja gracias a su mecha centrada",
      "Frasco de vidrio reutilizable al terminar la vela",
      "Aroma equilibrado, ni muy intenso ni muy suave",
      "Perfecta para regalo por su presentación",
    ],
    usage:
      "Antes de cada uso, recortar la mecha a unos 5 mm. Dejar que la cera se derrita de borde a borde en el primer encendido para un consumo parejo. No dejar encendida más de 4 horas seguidas.",
    recommendations:
      "Usar siempre sobre una superficie resistente al calor y alejada de cortinas u objetos inflamables. No dejar encendida sin supervisión ni al alcance de niños o mascotas.",
  },
  {
    id: "aceite-jazmin",
    name: "Aceite Esencial Jazmín",
    price: 2900,
    imageUrl: "",
    category: "Aceite esencial",
    description:
      "Aceite esencial de jazmín, ideal para difusores eléctricos o ultrasónicos. Su fragancia floral e intensa transforma cualquier ambiente en un espacio de bienestar.",
    characteristics: [
      { label: "Formato", value: "Frasco gotero 30 ml" },
      { label: "Familia olfativa", value: "Floral intenso" },
      { label: "Compatibilidad", value: "Difusores eléctricos y ultrasónicos" },
      { label: "Ambientes recomendados", value: "Dormitorio, espacios de yoga o meditación" },
    ],
    advantages: [
      "Alta concentración: rinde muchas aplicaciones por frasco",
      "Se puede combinar con otros aceites para crear mezclas propias",
      "Formato gotero que facilita dosificar la cantidad exacta",
      "Versátil: también apto para aromatizar en pequeñas cantidades sobre superficies textiles",
    ],
    usage:
      "Agregar de 5 a 8 gotas junto con agua en el depósito del difusor, siguiendo las indicaciones del fabricante del equipo. No aplicar el aceite puro sobre la piel.",
    recommendations:
      "Conservar el frasco bien cerrado, en un lugar fresco y sin luz directa. Mantener fuera del alcance de niños y mascotas. Uso exclusivo para difusión ambiental.",
  },
]
