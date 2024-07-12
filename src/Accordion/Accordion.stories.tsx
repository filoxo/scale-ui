import type { StoryDefault, Story } from "@ladle/react"
import {
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionItemGroup,
} from "./Accordion"
import { useAccordionTrigger } from "./hooks"

type AccordionProps = React.ComponentPropsWithoutRef<typeof Accordion>

export default {
  args: {},
} satisfies StoryDefault<AccordionProps>

export const Default: Story<AccordionProps> = () => {
  return (
    <Accordion>
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
  )
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

export const WithCustomTrigger: Story<AccordionProps> = () => {
  return (
    <Accordion>
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
  )
}
