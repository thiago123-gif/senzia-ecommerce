import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../components/Navbar'
import { CartProvider } from '../components/CartContext'
import { FavoritesProvider } from '../components/FavoritesContext'
import { ToastProvider } from '../components/ToastContext'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="es">
        <body>
          <ToastProvider>
            <CartProvider>
              <FavoritesProvider>
                <Navbar />
                {children}
              </FavoritesProvider>
            </CartProvider>
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
