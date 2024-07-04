import { userEvent } from "@testing-library/user-event";
import {
  fireEvent,
  act,
  waitFor,
  render,
  screen,
} from "@testing-library/react";
import { Autocomplete, AutocompleteOption } from ".";
import type { AutocompleteProps } from ".";
import { KeyCode } from "../constants";

describe("Autocomplete", () => {
  let testProps: Omit<AutocompleteProps, "children">;
  let user: ReturnType<typeof userEvent.setup>;

  const options = [
    { label: "Las Vegas", value: 1 },
    { label: "Salt Lake City", value: 2 },
    { label: "Orlando", value: 3 },
  ];

  beforeEach(() => {
    testProps = {
      value: "Las Vegas",
      onChange: vi.fn(),
      onOptionSelect: vi.fn(),
      autoExpand: true,
    };
    user = userEvent.setup();
  });

  it("should trigger onOptionSelect handler when clicking on an option", () => {
    render(
      <Autocomplete {...testProps} data-testid="scale-autocomplete">
        {options.map((option) => (
          <AutocompleteOption key={option.label} value={option.value}>
            {option.label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    );

    const input = screen.queryByTestId(
      "scale-autocomplete"
    ) as HTMLInputElement;

    screen.debug(input);

    act(() => {
      // listbox opens if `autoExpand` is true and input is focused
      input?.focus();
    });

    const lastOption = screen.queryByText(options[options.length - 1].label);

    lastOption && fireEvent.mouseDown(lastOption);
    expect(testProps.onOptionSelect).toHaveBeenCalled();
  });

  describe("keyboard navigation", () => {
    it("should move virtual focus to the next option", () => {
      render(
        <Autocomplete {...testProps} data-testid="scale-autocomplete">
          {options.map((option) => (
            <AutocompleteOption key={option.label} value={option.value}>
              {option.label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      );

      const input = screen.getByTestId(
        "scale-autocomplete"
      ) as HTMLInputElement;
      act(() => {
        input?.focus();
      });
      document.activeElement &&
        fireEvent.keyDown(document.activeElement, {
          key: KeyCode.DOWN,
        });

      const firstOption = screen.queryByText(options[0].label);

      waitFor(() => {
        expect(firstOption?.getAttribute("aria-selected")).toEqual("true");
      });
    });

    it("should move virtual focus last option", () => {
      render(
        <Autocomplete {...testProps} data-testid="scale-autocomplete">
          {options.map((option) => (
            <AutocompleteOption key={option.label} value={option.value}>
              {option.label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      );

      const input = screen.getByTestId(
        "scale-autocomplete"
      ) as HTMLInputElement;
      act(() => {
        input?.focus();
      });
      document.activeElement &&
        fireEvent.keyDown(document.activeElement, {
          key: KeyCode.UP,
        });

      const lastOption = screen.queryByText(options[options.length - 1].label);
      waitFor(() => {
        expect(lastOption?.getAttribute("aria-selected")).toEqual("true");
      });
    });

    it("closes the listbox when the escape key is pressed", async () => {
      render(
        <Autocomplete {...testProps} data-testid="scale-autocomplete">
          {options.map((option) => (
            <AutocompleteOption key={option.label} value={option.value}>
              {option.label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      );

      const input = screen.getByTestId(
        "scale-autocomplete"
      ) as HTMLInputElement;

      await user.click(input);
      input?.focus();

      const listbox = screen.queryByRole("listbox");
      expect(listbox).toBeInTheDocument()

      document.activeElement &&
        fireEvent.keyDown(document.activeElement, {
          key: KeyCode.ESC,
        })

      expect(listbox).toHaveAttribute("data-expanded", "false")
    });

    it("opens the listbox when alt + enter is pressed", () => {
      render(
        <Autocomplete
          {...testProps}
          data-testid="scale-autocomplete"
          autoExpand={false}
        >
          {options.map((option) => (
            <AutocompleteOption key={option.label} value={option.value}>
              {option.label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      );

      const input = screen.getByTestId(
        "scale-autocomplete"
      ) as HTMLInputElement;
      act(() => {
        input?.focus();
      });

      document.activeElement &&
        fireEvent.keyDown(document.activeElement, {
          altKey: true,
          key: KeyCode.ENTER,
        });

      const firstOption = screen.getByText(options[0].label);
      expect(firstOption).toBeVisible();
    });
  });
});

describe("AutocompleteOption", () => {
  it("should throw an error if rendered outside of an Autocomplete", () => {
    const ogConsoleError = console.error; // silence console.error
    console.error = vi.fn();
    expect(() => {
      render(<AutocompleteOption value="test">test</AutocompleteOption>);
    }).toThrowError();
    console.error = ogConsoleError;
  });
});
