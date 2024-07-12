import { useId, useState } from "react"
import "./mini-accordion.css"
import {
  AccordionContext,
  AccordionItemGroupId,
  useAccordionGroupState,
  useAccordionTrigger,
} from "./hooks"

/**
 * mini accordion lib
 *
 * @desc this was created because:
 * - design-system does not have an accordion component
 * - reach-ui/accordion could not be integrated with design-system button (`as` prop fails to work)
 * - avoids a new dependency
 *
 * @todo move to design system someday?
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ for accessibility requirements
 */
export const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [selectedPanelId, setSelectedPanelId] = useState<string>("")

  return (
    <AccordionContext.Provider
      value={{
        expandedPanelId: selectedPanelId,
        onSelect: (updatedPanelId) => {
          const panelId =
            selectedPanelId === updatedPanelId ? null : updatedPanelId
          setSelectedPanelId(panelId ?? "")
        },
      }}
    >
      <div>{children}</div>
    </AccordionContext.Provider>
  )
}

export const AccordionItemGroup = ({
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  const id = useId()
  const htmlId = `accordion-item-group-${id}`

  return (
    <AccordionItemGroupId.Provider value={htmlId}>
      <div {...props}>{children}</div>
    </AccordionItemGroupId.Provider>
  )
}

export const AccordionPanel = ({ children }: { children: React.ReactNode }) => {
  const { id, expanded } = useAccordionGroupState()

  return (
    <div
      data-accordion-panel=""
      /* aria-expanded applies to the _trigger_ NOT the panel, so instead we communicate the current state using data-attr  */
      data-expanded={expanded}
      id={id}
    >
      {children}
    </div>
  )
}

export const AccordionButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { id, ariaExpanded, onClick } = useAccordionTrigger()

  return (
    <button
      {...props}
      aria-controls={id}
      aria-expanded={ariaExpanded}
      type="button"
      onClick={onClick}
    >
      {props?.children}
      {ariaExpanded ? <>&#9652;</> : <>&#9662;</>}
    </button>
  )
}
