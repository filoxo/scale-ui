import type { Story } from "@ladle/react"
import { Drawer, DrawerHandle } from "./Drawer"
import { useRef } from "react"

export const Default: Story = () => {
  const drawerRef = useRef<DrawerHandle>(null)

  return (
    <div>
      <button popoverTarget="drawer-pop" popoverTargetAction="toggle">
        Open Drawer
      </button>
      <Drawer id="drawer-pop" ref={drawerRef}>
        <div style={{ padding: 24 }}>
          <h2>Drawer Content</h2>
          <p>This is a native popover drawer with animation.</p>
          <button onClick={() => drawerRef.current?.close()}>Close</button>
        </div>
      </Drawer>
    </div>
  )
}
