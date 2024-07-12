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
