'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react"

import { useUser } from "@clerk/nextjs"


interface FavoritesContextType {

  favoriteIds: string[]

  isFavorite: (id: string) => boolean

  toggleFavorite: (id: string) => Promise<void>

  isLoaded: boolean

}


const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)


export function FavoritesProvider({
  children
}: {
  children: ReactNode
}) {

  const { user, isLoaded } = useUser()

  const [favoriteIds, setFavoriteIds] = useState<string[]>([])


  // Cuando Clerk termina de cargar el usuario,
  // leemos sus favoritos guardados (o vaciamos si cerró sesión)

  useEffect(() => {

    if (!isLoaded) return

    if (user) {
      const stored = user.unsafeMetadata?.favorites as string[] | undefined
      setFavoriteIds(stored ?? [])
    } else {
      setFavoriteIds([])
    }

  }, [isLoaded, user])


  const isFavorite = (id: string) => favoriteIds.includes(id)


  // Agrega o quita un producto de favoritos
  // y lo persiste en el perfil del usuario en Clerk

  const toggleFavorite = async (id: string) => {

    if (!user) return

    const updated = favoriteIds.includes(id)
      ? favoriteIds.filter(favId => favId !== id)
      : [...favoriteIds, id]

    setFavoriteIds(updated) // actualización optimista en pantalla

    await user.update({
      unsafeMetadata: {
        ...user.unsafeMetadata,
        favorites: updated
      }
    })

  }


  return (

    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        isLoaded
      }}
    >
      {children}
    </FavoritesContext.Provider>

  )

}


export function useFavorites() {

  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error(
      "useFavorites debe utilizarse dentro de FavoritesProvider"
    )
  }

  return context

}