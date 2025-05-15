import React, {
  ComponentPropsWithoutRef,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react"
import "./drawer.css"

export interface DrawerProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * The popover id, must be unique in the DOM
   */
  id: string
  /**
   * Children to render inside the popover
   */
  children?: React.ReactNode
  /**
   * Called when popover is dismissed
   */
  onClose?: () => void
}

export interface DrawerHandle {
  open: () => void
  close: () => void
  toggle: () => void
  readonly isOpen: boolean
}

/**
 * Native Popover, with imperative open/close/toggle via ref.
 * Use popovertarget on a button for declarative open/close, or use ref for imperative control.
 */
export const Drawer = forwardRef<DrawerHandle, DrawerProps>(
  ({ id, className = "", children, onClose, ...props }, ref) => {
    const drawerRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(
      ref,
      () => ({
        open() {
          drawerRef.current?.showPopover()
        },
        close() {
          drawerRef.current?.hidePopover()
        },
        toggle() {
          if (drawerRef.current) {
            if (drawerRef.current.matches(":popover-open")) {
              drawerRef.current.hidePopover()
            } else {
              drawerRef.current.showPopover()
            }
          }
        },
        get isOpen() {
          return !!drawerRef.current?.matches(":popover-open")
        },
      }),
      []
    )

    // Call onClose when popover is dismissed
    useEffect(() => {
      const node = drawerRef.current
      if (!node || !onClose) return
      function handleClose() {
        onClose?.()
      }
      node.addEventListener("close", handleClose)
      return () => {
        node.removeEventListener("close", handleClose)
      }
    }, [onClose])

    return (
      <div
        id={id}
        ref={drawerRef}
        popover=""
        className={`drawer ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
