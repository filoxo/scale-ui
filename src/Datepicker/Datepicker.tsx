import { useState } from "react"
import "./datepicker.css"

export type DatepickerProps = {
  id: string
  date: Date | [Date, Date]
  selectRange?: boolean
  onChange?: (date: [Date] | [Date, Date]) => void
  onDayClick?: (day: number) => void
}

export function Datepicker({ id, date, onChange }: DatepickerProps) {
  const today = new Date()
  const firstDate = Array.isArray(date) ? date[0] : date

  const [currentMonth, setCurrentMonth] = useState(firstDate.getMonth())
  const [currentYear, setCurrentYear] = useState(firstDate.getFullYear())

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
    (day) => new Date(currentYear, currentMonth, day)
  )
  // get day of week that first day is on
  const currentMonthName = new Date(
    currentYear,
    currentMonth,
    1
  ).toLocaleString("en-US", { month: "long" })
  const firstDay = days[0].getDay()

  return (
    <>
      <div className="datepicker-header">
        <button
          type="button"
          onClick={() => setCurrentMonth((prev) => prev - 1)}
        >
          &larr;
        </button>
        <h3>{currentMonthName}</h3>
        <button
          type="button"
          onClick={() => setCurrentMonth((prev) => prev + 1)}
        >
          &rarr;
        </button>
      </div>

      <div id={id} className="datepicker-grid">
        {firstDay ? (
          <span style={{ gridColumn: `span ${firstDay}` }}></span>
        ) : null}
        {days.map((day) => (
          <button
            key={day.getDate()}
            className="datepicker-day"
            role="option"
            aria-selected={false}
            data-is-today={day === today ? "true" : null}
            onClick={() => onChange?.([day])}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </>
  )
}
