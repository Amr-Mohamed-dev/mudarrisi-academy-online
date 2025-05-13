
import * as React from "react"

type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  dismiss: () => void
}

const toastContextDefaultValue = {
  toasts: [] as Toast[],
}

const ToastContext = React.createContext(toastContextDefaultValue)

export function useToast() {
  const context = React.useContext(ToastContext)

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  const { toasts } = context

  const toast = React.useCallback((props: ToastProps) => {
    // For now, we're just logging the toast since the implementation
    // will be provided by the Toaster component
    console.log("Toast triggered:", props)
    
    // This is a placeholder implementation
    // The actual implementation is in the ui/toast components
    return {
      id: Date.now().toString(),
      ...props,
      dismiss: () => {
        // No op for now
      }
    }
  }, [])

  return {
    toast,
    toasts,
  }
}

// Create a standalone toast function that can be imported directly
export const toast = (props: ToastProps) => {
  console.log("Toast triggered from standalone function:", props)
  
  return {
    id: Date.now().toString(),
    ...props,
    dismiss: () => {
      // No op for now
    }
  }
}
