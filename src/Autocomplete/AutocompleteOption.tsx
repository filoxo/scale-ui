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

  const onClick = () => {
    onOptionSelect(htmlId, value);
  };

  return (
    <li
      aria-selected={selected}
      className={classNames(
        "aria-selected:shadow-[inset_0px_0px_0px_2px_rgba(0,0,0,0.1)]",
        className
      )}
      id={htmlId}
      role="option"
      //This needs to be a mouse down event to allow the click event in the AutocompleteOption to fire
      //before the onBlur event in the Autocomplete component
      onClick={onClick}
      onMouseDown={onClick}
    >
      {children || value?.toString()}
    </li>
  );
};
