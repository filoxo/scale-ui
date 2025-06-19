import type { Meta, StoryObj } from "@storybook/react"
import { Autocomplete, type AutocompleteProps } from "./Autocomplete"
import { AutocompleteOption } from "./AutocompleteOption"
import { useState } from "react"

const meta = {
  component: Autocomplete,
} satisfies Meta<AutocompleteProps>

export default meta

type Story = StoryObj<AutocompleteProps>

export const Default: Story = {
  args: {
    autoExpand: true,
    id: "demo",
    value: "",
  },
  render: (args) => {
    const [displayValue, setDisplayValue] = useState("")
    return (
      <div style={{ minHeight: 250 }}>
        <p>
          This Autocomplete was built with the assumption that it might not know
          what its "options" might look like. Specifically, the use case was to
          allow for Design/UX to be able to have full flexibility the way the
          option displayed, as long as the action specified a value on the
          MenuItem.
        </p>
        <p>
          This implementation also makes use of{" "}
          <code>aria-activedescendant</code>, per{" "}
          <a href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_activedescendant">
            WAI-ARIA "Managing Focus in Composites Using aria-activedescendant"
          </a>
          .
        </p>
        <p>
          See also:
          <ul>
            <li>
              <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/">
                WAI-ARIA Combobox Example
              </a>
            </li>
          </ul>
        </p>
        <label htmlFor="demo">Select an option</label>
        <Autocomplete
          {...args}
          value={displayValue}
          onChange={(e) => {
            setDisplayValue(e.target.value)
          }}
          onOptionSelect={(option: unknown) => {
            const value =
              typeof option === "string" ? option : JSON.stringify(option)
            setDisplayValue(value)
            return false // this controls whether the autocomplete stays open or not after clicking on an option
          }}
        >
          <AutocompleteOption value="A" />
          <AutocompleteOption value="B" />
          <AutocompleteOption value={3}>C</AutocompleteOption>
          <AutocompleteOption
            value={{
              details:
                "you can even pass in an object or other primitive! (as long as it can be turned into a string)",
              advanced: true,
              value: +9000,
            }}
          >
            D (advanced option)
          </AutocompleteOption>
        </Autocomplete>
      </div>
    )
  },
}
