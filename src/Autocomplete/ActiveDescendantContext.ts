import { createContext, useContext } from "react";

interface ActiveDescendantContextType {
  checkIfActive: (id: string) => boolean;
  onOptionSelect: (id: string, value: unknown) => void;
}

export const ActiveDescendantContext =
  createContext<ActiveDescendantContextType>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkIfActive: (_id) => {
      if (import.meta.env.NODE_ENV !== "production") {
        throw new Error(
          "ActiveDescendantContext was initialized without a Provider! You likely rendered an AutocompleteOption without a parent Autocomplete."
        );
      }
      return false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onOptionSelect: (_id, _value) => {
      if (import.meta.env.NODE_ENV !== "production") {
        throw new Error(
          "ActiveDescendantContext was initialized without a Provider! You likely rendered an AutocompleteOption without a parent Autocomplete."
        );
      }
    },
  });

export const useActiveDescendantContext = () =>
  useContext(ActiveDescendantContext);
