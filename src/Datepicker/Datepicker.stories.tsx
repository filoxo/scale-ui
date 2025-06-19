import type { Meta, StoryObj } from "@storybook/react"
import { Datepicker, type DatepickerProps } from "./Datepicker"
import { Drawer, DrawerHandle } from "../Drawer/Drawer"
import { useRef, useState } from "react"
import "./datepicker.stories.css"

const meta = {
  component: Datepicker,
} satisfies Meta<DatepickerProps>

export default meta

type Story = StoryObj<DatepickerProps>

export const Default: Story = {
  args: {
    id: "scale-datepicker-demo",
  },
  render: (args) => {
    return <Datepicker {...args} date={new Date()} />
  },
}

export const WithinDrawer: Story = {
  args: {
    id: "scale-datepicker-demo",
  },
  render: ({ id }) => {
    const drawerRef = useRef<DrawerHandle>(null)
    // default to today
    const [date, setDate] = useState(new Date())

    return (
      <div>
        <button
          id="scale-datepicker-drawer-toggle"
          popoverTarget={id}
          popoverTargetAction="toggle"
        >
          {date.toLocaleDateString()}
        </button>
        <Drawer id={id} ref={drawerRef}>
          <Datepicker
            id="datepicker-drawer-demo"
            date={date}
            onChange={([date]) => {
              // @todo: handle date selection
              setDate(date)
              drawerRef.current?.close()
            }}
          />
        </Drawer>
      </div>
    )
  },
}
