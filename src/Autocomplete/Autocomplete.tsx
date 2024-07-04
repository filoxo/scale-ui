import React, {
  useId,
  useMemo,
  useState,
  forwardRef,
  useCallback,
} from "react";
import { ActiveDescendantContext } from "./ActiveDescendantContext";
import { useTrackActiveDescendant } from "./useTrackActiveDescendant";
import { KeyCode } from "../constants";
import "./styles.css";

export interface AutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  autoExpand?: boolean;
  listboxPosition?: "top" | "bottom";
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onOptionSelect: (value: unknown) => boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  function AutocompleteComponent(
    {
      id,
      children,
      autoExpand = true,
      listboxPosition = "bottom",
      value,
      onFocus,
      onKeyDown,
      onOptionSelect,
      ...remainingProps
    },
    comboboxRef
  ) {
    const autoId = useId()
    const comboboxId = id || autoId
    const listboxId = `${comboboxId}-listbox`

    const [expanded, setExpanded] = useState(false)
    // @todo: can/should ref handler be moved into hook?
    // @todo: why do i feel like useImperativeHandle should be used here somehow?
    const [domNode, setDomNode] = useState<HTMLUListElement>()
    const listboxRefCb = useCallback((domNode: HTMLUListElement | null) => {
      setDomNode(domNode || undefined)
    }, [])
    const activeDescendant = useTrackActiveDescendant({ element: domNode })

    const activeDescendantState = useMemo(() => {
      return {
        checkIfActive: activeDescendant.check,
        onOptionSelect: (id: string | undefined, newValue: unknown) => {
          activeDescendant.update(id)
          const result = onOptionSelect?.(newValue)
          setExpanded(result)
        },
      }
      // 'activeDescendant' is a custom hook that does not need to be included as a dependency here since it handles its own internal dependencies.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domNode, activeDescendant.check, onOptionSelect])

    const trackActiveDescendant = (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (expanded) {
        if (e.key === KeyCode.DOWN) {
          e.preventDefault()
          activeDescendant.next()
        } else if (e.key === KeyCode.UP) {
          e.preventDefault()
          activeDescendant.prev()
        } else if (e.key === KeyCode.ESC) {
          setExpanded(false)
          activeDescendant.clear()
        } else if (e.key === KeyCode.ENTER) {
          activeDescendant.click()
        }
      } else {
        if (
          // e.key === KeyCode.ENTER ||
          // e.key === KeyCode.SPACE ||
          e.key === KeyCode.DOWN
        ) {
          setExpanded(true)
        }
      }
      if (e.key === KeyCode.ENTER || e.key === KeyCode.SPACE) {
        setExpanded(!expanded)
      }
    }

    return (
      <div
        data-autocomplete-root=""
        data-autocomplete-listbox-position={listboxPosition}
      >
        <input
          {...remainingProps}
          aria-activedescendant={activeDescendant.current ?? undefined}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={expanded}
          autoComplete="off"
          data-autocomplete-input=""
          id={comboboxId}
          ref={comboboxRef}
          role="combobox"
          value={value}
          onMouseDown={() => {
            console.log("onMouseDown")
            setExpanded(!expanded)
          }}
          onBlur={() => {
            console.log("onBlur")
            setExpanded(false)
          }}
          onFocus={(e) => {
            setExpanded(autoExpand)
            onFocus?.(e)
          }}
          onKeyDown={(e) => {
            console.log("onKeyDown")
            trackActiveDescendant(e)
            onKeyDown?.(e)
          }}
        />
        <div data-autocomplete-listbox-anchor="">
          <ActiveDescendantContext.Provider value={activeDescendantState}>
            <ul
              aria-labelledby={comboboxId}
              data-autocomplete-listbox=""
              data-autocomplete-listbox-position={listboxPosition}
              id={listboxId}
              ref={listboxRefCb}
              role="listbox"
              data-expanded={expanded}
            >
              {children}
            </ul>
          </ActiveDescendantContext.Provider>
        </div>
      </div>
    )
  }
)

Autocomplete.displayName = "Autocomplete";
