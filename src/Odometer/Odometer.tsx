import "./odometer.css"

export interface OdometerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The numeric value to display. Can be a number or formatted string (e.g. "1,234.56"). */
  value: number
  format?: (value: number) => string
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

/**
 * Splits a value string into an array of character tokens, tagging each as
 * either a digit or a non-digit (punctuation, sign, etc.).
 */
function tokenize(
  value: string,
): Array<{ type: "digit" | "non-digit"; char: string }> {
  return value.split("").map((char) => ({
    type: DIGITS.includes(char) ? "digit" : "non-digit",
    char,
  }))
}

function OdometerDigit({ digit }: { digit: string }) {
  const index = parseInt(digit, 10)
  return (
    <span className="odometer-digit">
      <span
        className="odometer-digit-inner"
        style={{ "--digit": index } as React.CSSProperties}
        aria-hidden="true"
      >
        {DIGITS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </span>
    </span>
  )
}

/**
 * Odometer — displays a number with slot-machine style digit transitions.
 *
 * Each numeric digit animates vertically (like a real odometer) when the
 * value changes. Non-numeric characters (commas, dots, signs) render inline
 * without animation.
 *
 * @example
 * <Odometer value={1234} />
 * <Odometer value="1,337.00" />
 */
export function Odometer({
  value,
  className = "",
  format,
  ...props
}: OdometerProps & { format?: (value: number) => string }) {
  const display = format ? format(value) : String(value)
  const tokens = tokenize(display)

  return (
    <span
      {...props}
      className={`odometer ${className}`}
      role="img"
      aria-label={display}
    >
      {tokens.map((token, i) =>
        token.type === "digit" ? (
          <OdometerDigit key={i} digit={token.char} />
        ) : (
          <span key={i} className="odometer-non-digit" aria-hidden="true">
            {token.char}
          </span>
        ),
      )}
    </span>
  )
}
