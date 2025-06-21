import type { Meta, StoryObj } from "@storybook/react"
import { Datepicker, type DatepickerProps } from "./Datepicker"
import { DateRangepicker, type DateRangepickerProps } from "./Datepicker"
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
    const [date, setDate] = useState(new Date())

    return <Datepicker {...args} date={date} onChange={setDate} />
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
            onChange={(date) => {
              setDate(date)
              setTimeout(() => {
                // delay close for improved ux
                drawerRef.current?.close()
              }, 400)
            }}
          />
        </Drawer>
      </div>
    )
  },
}

export const WithDateRangepicker: Story = {
  args: {
    id: "scale-daterangepicker-demo",
  },
  render: ({ id }) => {
    const [dates, setDates] = useState<[Date, Date]>(() => {
      // default to today & tomorrow
      const today = new Date()
      const tomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1)
      return [today, tomorrow]
    })

    return <DateRangepicker id={id} date={dates} onChange={setDates} />
  },
}
