import type { StoryDefault, Story } from "@ladle/react";

import { Autocomplete, type AutocompleteProps } from "./Autocomplete";
import { AutocompleteOption } from "./AutocompleteOption";
import { useState } from "react";

export default {
  args: {
    autoExpand: true,
    onOptionSelect: (value) => console.log({ value }),
  },
} satisfies StoryDefault<AutocompleteProps>;

export const Default: Story<AutocompleteProps> = () => {
  const [option, setOption] = useState("");
  return (
    <div className="min-h-250px">
      <label htmlFor="demo">Select an option</label>
      <Autocomplete
        id="demo"
        value={option?.toString()}
        onChange={(e) => setOption(e.target.value)}
      >
        <AutocompleteOption
          className="hover:bg-warm-grey px-4 py-2"
          value="A"
        />
        <AutocompleteOption
          className="hover:bg-warm-grey px-4 py-2"
          value="B"
        />
        <AutocompleteOption
          className="hover:bg-warm-grey px-4 py-2"
          value="C"
        />
        <AutocompleteOption
          className="hover:bg-warm-grey px-4 py-2"
          value={{
            details:
              "you can even pass in an object or other primitive! (as long as its stringify-able)",
            simple: false,
            value: +9000,
          }}
        >
          D (advanced option)
        </AutocompleteOption>
      </Autocomplete>
    </div>
  );
};
