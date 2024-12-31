import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import "./dialog.css"

export interface DialogProps
  extends React.DialogHTMLAttributes<HTMLDialogElement> {
  actions?: React.ReactNode
  children: React.ReactNode
  disableBodyScroll?: boolean
  className?: string
  root?: Element | DocumentFragment
  scroll?: boolean
  title?: string
  contentRef?: React.RefObject<HTMLDivElement>
  onClose?: () => void
}

/** @desc disable body scroll when component is mounted */
const useDisableBodyScroll = (disableBodyScroll: boolean) => {
  useEffect(() => {
    if (disableBodyScroll) document.body.classList.add("overflow-y-hidden")
    return () => {
      if (disableBodyScroll) document.body.classList.remove("overflow-y-hidden")
    }
    /** only runs on mount/unmount */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * @example
 * <Modal
 *   actions={
 *     <>
 *       <Button>Action</Button>
 *       <Button variant='outlined'>Cancel</Button>
 *     </>
 *   }
 *   title="Example Modal"
 *   onClose={handleModalClose}
 * >
 *   <div>This is example modal content.</div>
 * </Modal>
 */
export const Dialog = ({
  actions,
  children,
  contentRef,
  disableBodyScroll = true,
  root = document.body,
  onClose,
  ...props
}: DialogProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null)
  useDisableBodyScroll(disableBodyScroll)

  /**
   * Using a [ref callback function](https://react.dev/reference/react-dom/components/common#ref-callback) we can imperatively trigger the modal on mount and cleanup on unmount.
   *
   *
   * @description
   * per mdn,
   * > It is recommended to use the .show() or .showModal() method to render dialogs, rather than the open attribute. If a <dialog> is opened using the open attribute, __it is non-modal__.
   *
   * (emphasis added). the "non modal" description means also a slight difference in behavior.
   *
   * - a `<dialog open></dialog>` cannot have a styled backdrop, ie. `dialog[open]::backdrop` doesn't exist or work. it must be opened with js api for that.
   */
  const handleDialogRef = (node: HTMLDialogElement | null) => {
    if (node) {
      modalRef.current = node
      modalRef.current?.showModal()
    } else if (node === null) {
      modalRef.current?.close()
      modalRef.current = null
    }
  }

  const modal = (
    <dialog
      data-dialog=""
      ref={handleDialogRef}
      {...props}
      className={`modal-backdrop ${props?.className || ""}`}
    >
      <div data-dialog-content="" ref={contentRef}>
        {children}
      </div>
      {actions && <div data-dialog-actions="">{actions}</div>}
      {/* always last element, but visually first */}
      <div data-dialog-close="">
        <button aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
      </div>
    </dialog>
  )

  return createPortal(modal, root)
}
