'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, XCircle } from "lucide-react"
import { EASE_PREMIUM } from "../lib/motion"


type ToastType = "success" | "error"

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  // Muestra una notificación temporal. `type` es opcional, por defecto "success".
  showToast: (message: string, type?: ToastType) => void
}


const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Cuánto tiempo queda visible cada notificación antes de desaparecer sola
const TOAST_DURATION_MS = 2500


export function ToastProvider({ children }: { children: ReactNode }) {

  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = "success") => {

    const id = Date.now()

    setToasts(current => [...current, { id, message, type }])

    // La saca sola de la lista pasado el tiempo definido
    setTimeout(() => {
      setToasts(current => current.filter(toast => toast.id !== id))
    }, TOAST_DURATION_MS)

  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>

      {children}

      {/* Contenedor fijo donde se apilan las notificaciones, centrado abajo */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE_PREMIUM }}
              className="flex items-center gap-2.5 bg-[#111111] text-white pl-4 pr-5 py-3 rounded-full shadow-lg text-sm font-medium"
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={18} className="text-[#7A8F5C] shrink-0" />
              ) : (
                <XCircle size={18} className="text-red-400 shrink-0" />
              )}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </ToastContext.Provider>
  )
}


export function useToast() {

  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("useToast debe utilizarse dentro de ToastProvider")
  }

  return context

}
