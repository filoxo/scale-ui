import type { Story } from "@ladle/react"
import { Drawer, DrawerHandle } from "./Drawer"
import { useRef } from "react"

export const Default: Story = () => {
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
      <button popoverTarget="drawer-pop" popoverTargetAction="toggle">
        Open Drawer
      </button>
      <Drawer id="drawer-pop" ref={drawerRef}>
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
}
