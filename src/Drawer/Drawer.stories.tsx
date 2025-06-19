import type { Meta, StoryObj } from "@storybook/react"
import { Drawer, DrawerHandle } from "./Drawer"
import { useRef } from "react"

const meta = {
  component: Drawer,
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "drawer-pop",
  },
  render: ({ id }) => {
    const drawerRef = useRef<DrawerHandle>(null)

    return (
      <div>
        <p>
          The Drawer component was inspired by{" "}
          <a href="https://craftofui.substack.com/p/building-a-drawer">
            this great article
          </a>{" "}
          that makes use of native{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">
            Popover API
          </a>{" "}
          for a slick, mobile responsive drawer.
        </p>
        <button popoverTarget={id} popoverTargetAction="toggle">
          Open Drawer
        </button>
        <Drawer id={id} ref={drawerRef}>
          <button
            type="button"
            aria-label="Close drawer"
            onClick={() => drawerRef.current?.close()}
          >
            &times;
          </button>

          <div style={{ padding: 24 }}>
            <h2>Drawer Content</h2>
            <p>This is a native popover drawer with animation.</p>
          </div>
        </Drawer>
      </div>
    )
  },
}
