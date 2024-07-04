import type { StoryDefault, Story } from "@ladle/react";

import { Autocomplete, type AutocompleteProps } from "./Autocomplete";
import { AutocompleteOption } from "./AutocompleteOption";
import { useState } from "react";

export default {
  args: {
    autoExpand: true,
  },
} satisfies StoryDefault<AutocompleteProps>;

export const Default: Story<AutocompleteProps> = () => {
  const [displayValue, setDisplayValue] = useState("");
  return (
    <div className="min-h-250px">
      <label htmlFor="demo">Select an option</label>
      <Autocomplete
        id="demo"
        value={displayValue}
        onChange={(e) => {
          setDisplayValue(e.target.value);
        }}
        onOptionSelect={(option: unknown) => {
          const value =
            typeof option === "string" ? option : JSON.stringify(option);
          setDisplayValue(value);
          return false; // this controls whether the autocomplete stays open or not after clicking on an option
        }}
      >
        <AutocompleteOption value="A" />
        <AutocompleteOption value="B" />
        <AutocompleteOption value="C" />
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
  );
};
