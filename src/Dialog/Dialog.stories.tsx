import type { StoryDefault, Story } from "@ladle/react"
import { Dialog, type DialogProps } from "./Dialog"
import { useState } from "react"

export default {
  args: {
    title: "Dialog title",
  },
} satisfies StoryDefault<DialogProps>

export const Default: Story<DialogProps> = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open modal
      </button>
      {isOpen && (
        <Dialog
          id="scale-modal-demo"
          onClose={() => {
            setIsOpen(false)
          }}
        >
          <h2>Title</h2>
          Dialog contents go here
        </Dialog>
      )}
    </>
  )
}

export const WithActions: Story<DialogProps> = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button onClick={toggleOpen}>Open modal with actions</button>
      {isOpen && (
        <Dialog
          id="scale-modal-demo"
          onClose={toggleOpen}
          actions={
            <>
              <button type="button" id="action-ok" onClick={toggleOpen}>
                OK
              </button>
              <button type="button" id="action-cancel" onClick={toggleOpen}>
                Cancel
              </button>
            </>
          }
        >
          <h2>Title</h2>
          <p>
            The <code>actions</code> slot/prop is useful for when you want to
            use simple actions within a dialog. it's predefined styles ensure
            that actions are rendered first, ensuring that assitive tech goes to
            the right place immediately.
          </p>
        </Dialog>
      )}
    </>
  )
}
