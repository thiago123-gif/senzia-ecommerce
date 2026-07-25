import { clerkMiddleware } from '@clerk/nextjs/server'

// No protegemos ninguna ruta a propósito: el catálogo y el carrito
// tienen que quedar accesibles sin necesidad de iniciar sesión.
// Este middleware solo hace que Clerk esté disponible en toda la app
// (para que useUser(), <Show when="..."> y UserButton funcionen bien
// en cualquier página, incluida la home).
export default clerkMiddleware()

export const config = {
  matcher: [
    // Corre en todas las rutas menos los archivos estáticos internos de Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre corre en rutas de API
    '/(api|trpc)(.*)',
  ],
}
