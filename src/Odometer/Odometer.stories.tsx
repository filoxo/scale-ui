import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Odometer, type OdometerProps } from "./Odometer"

const meta = {
  component: Odometer,
  args: {
    value: 1234,
  },
} satisfies Meta<OdometerProps>

export default meta

type Story = StoryObj<OdometerProps>

export const Default: Story = {
  args: { value: 42 },
}

export const Formatted: Story = {
  args: { value: 1337.99 },
  render: (args) => {
    const [value, setValue] = useState(() => args.value)

    useEffect(() => {
      // increase value by random value between .01 and .50 cents
      const interval = setInterval(() => {
        setValue((v) => {
          const num = parseFloat(String(v)) || 0
          return num + Math.random() * 0.99 + 0.01
        })
      }, 1000)

      return () => clearInterval(interval)
    }, [])

    return (
      <Odometer {...args} value={value} format={(v) => "$" + v.toFixed(2)} />
    )
  },
}

export const WithSign: Story = {
  render: () => {
    const [value, setValue] = useState(42)
    useEffect(() => {
      const interval = setInterval(() => {
        // random number between -50 and 50 as integer
        setValue(() => Math.floor(Math.random() * 101) - 50)
      }, 1000)
      return () => clearInterval(interval)
    }, [])
    return (
      <Odometer
        value={value}
        format={(v) => (v < 0 ? String(v) : "+" + String(v))}
      />
    )
  },
}

export const CountUp: Story = {
  render: () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      const id = setInterval(() => {
        setCount((prev) => (prev >= 9999 ? 0 : prev + 1))
      }, 400)
      return () => clearInterval(id)
    }, [])

    return (
      <div style={{ fontSize: "3rem" }}>
        <Odometer value={count} />
      </div>
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(0)

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          fontSize: "2rem",
        }}
      >
        <Odometer value={value} />
        <div style={{ display: "flex", gap: "0.5rem", fontSize: "1rem" }}>
          <button
            type="button"
            onClick={() => setValue((v) => Math.max(0, v - 1))}
          >
            −1
          </button>
          <button type="button" onClick={() => setValue((v) => v + 1)}>
            +1
          </button>
          <button type="button" onClick={() => setValue((v) => v + 100)}>
            +100
          </button>
          <button type="button" onClick={() => setValue(0)}>
            Reset
          </button>
        </div>
      </div>
    )
  },
}

export const LargeText: Story = {
  args: {
    value: 1000000,
    style: { fontSize: "4rem" },
    // add format so number appears as $X,XXX.XX
    format: (v) => "$" + v.toLocaleString("en-US"),
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    useEffect(() => {
      const interval = setInterval(() => {
        // add number between 1 and 999
        const num = Math.floor(Math.random() * 999) + 1
        setValue((v) => v + num)
      }, 1000)
      return () => clearInterval(interval)
    }, [])
    return <Odometer {...args} value={value} />
  },
}
