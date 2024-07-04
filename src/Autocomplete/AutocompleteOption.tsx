import * as React from "react";
import { useId } from "react";
import classNames from "classnames";
import { useActiveDescendantContext } from "./ActiveDescendantContext";

export interface AutocompleteOptionProps {
  id?: string;
  value: unknown;
  children?: React.ReactNode;
  className?: string;
}

export const AutocompleteOption = ({
  id,
  value,
  children,
  className,
}: AutocompleteOptionProps) => {
  const autoId = useId();
  const htmlId = id || autoId;
  const { checkIfActive, onOptionSelect } = useActiveDescendantContext();
  const selected = checkIfActive(htmlId);

  const handleSelection = (e: React.MouseEvent<HTMLElement>) => {
    // prevent blur from triggering when clicking on menu item
    // https://stackoverflow.com/a/67979700/2554793
    //
    // what should have been a simple "just use native browser events"
    // turned into this esoteric mess of an implementation detail
    e?.preventDefault()

    onOptionSelect(htmlId, value)
  }

  return (
    <li
      aria-selected={selected}
      className={classNames(
        "aria-selected:shadow-[inset_0px_0px_0px_2px_rgba(0,0,0,0.1)]",
        className
      )}
      id={htmlId}
      role="option"
      data-autocomplete-option=""
      // prevent mouse event sending focus to menu items, stealing focus from Input
      onMouseDown={handleSelection}
      // for keyboard event to trigger activeDescendant.click()
      onClick={handleSelection}
    >
      {children || value?.toString()}
    </li>
  )
};
