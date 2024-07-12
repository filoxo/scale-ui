import { createContext, useContext } from "react"

export const AccordionContext = createContext<{
  expandedPanelId: string
  onSelect: (id: string) => void
}>({
  expandedPanelId: "",
  onSelect: () => {},
})

export const AccordionItemGroupId = createContext<string>("")

export const useAccordionGroupState = () => {
  const { expandedPanelId, onSelect } = useContext(AccordionContext)
  const htmlId = useContext(AccordionItemGroupId)

  return {
    id: htmlId,
    expanded: expandedPanelId === htmlId,
    onClick: () => onSelect(htmlId),
  }
}

export const useAccordionTrigger = () => {
  const id = useContext(AccordionItemGroupId)
  const { expanded, onClick } = useAccordionGroupState()

  return {
    id,
    ariaExpanded: expanded,
    onClick,
  }
}
