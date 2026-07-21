import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../components/Navbar'
import { CartProvider } from '../components/CartContext'
import { FavoritesProvider } from '../components/FavoritesContext'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>
          <CartProvider>
            <FavoritesProvider>
              <Navbar />
              {children}
            </FavoritesProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}