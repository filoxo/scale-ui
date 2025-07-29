import type { Meta, StoryObj } from "@storybook/react"
import {
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionItemGroup,
} from "./Accordion"
import { useAccordionTrigger } from "./hooks"

type AccordionProps = React.ComponentPropsWithoutRef<typeof Accordion>

const meta = {
  component: Accordion,
} satisfies Meta<AccordionProps>

export default meta

type Story = StoryObj<AccordionProps>

export const Default: Story = {
  args: {},
  render: (args) => (
    <>
      <p>
        An accordion is a JavaScript implementation of the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">
          HTML Details element
        </a>
        . Some UI requirements, like that in the <em>custom trigger</em> story,
        make a custom implementation necessary. Even a requirement as simple as
        "animate in/out" might require this.
      </p>
      <div>
        <p>See also:</p>
        <ul>
          <li>
            <a href="https://www.w3.org/TR/wai-aria-practices-1.2/#accordion">
              WAI-ARIA Accordion Pattern
            </a>
          </li>
          <li>
            <a href="https://www.w3.org/TR/wai-aria-practices-1.2/#disclosure">
              WAI-ARIA Disclosure Pattern
            </a>
          </li>
        </ul>
      </div>
      <Accordion {...args}>
        <AccordionItemGroup>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Lorem ipsum 1</AccordionPanel>
        </AccordionItemGroup>
        <AccordionItemGroup>
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Lorem ipsum 2</AccordionPanel>
        </AccordionItemGroup>
        <AccordionItemGroup>
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Lorem ipsum 3</AccordionPanel>
        </AccordionItemGroup>
      </Accordion>
    </>
  ),
}

const CustomTrigger = ({
  title,
  available,
}: {
  title: string
  available: boolean
}) => {
  const { id, ariaExpanded, onClick } = useAccordionTrigger()

  return (
    <h4
      style={{
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: ".5rem 0",
      }}
    >
      <p style={{ margin: 0 }}>{title}</p>
      <button
        aria-controls={id}
        aria-expanded={ariaExpanded}
        disabled={!available}
        aria-label="Toggle content"
        onClick={onClick}
      >
        {available ? "Available" : "Unavailable"}
      </button>
    </h4>
  )
}

export const WithCustomTrigger: Story = {
  args: {},
  render: (args) => (
    <Accordion {...args}>
      <AccordionItemGroup>
        <CustomTrigger title="Jan schedule" available={true} />
        <AccordionPanel>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Availability</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jan 15th</td>
                <td>Available</td>
                <td>
                  <a href="#">Book Now</a>
                </td>
              </tr>
            </tbody>
          </table>
        </AccordionPanel>
      </AccordionItemGroup>
      <AccordionItemGroup>
        <CustomTrigger title="Feb schedule" available={false} />
        {/* <AccordionPanel></AccordionPanel> */}
      </AccordionItemGroup>
      <AccordionItemGroup>
        <CustomTrigger title="Mar schedule" available={true} />
        <AccordionPanel>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Availability</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>March 1st</td>
                <td>Available</td>
                <td>
                  <a href="#">Book Now</a>
                </td>
              </tr>
              <tr>
                <td>March 15th</td>
                <td>Available</td>
                <td>
                  <a href="#">Book Now</a>
                </td>
              </tr>
            </tbody>
          </table>
        </AccordionPanel>
      </AccordionItemGroup>
    </Accordion>
  ),
}
