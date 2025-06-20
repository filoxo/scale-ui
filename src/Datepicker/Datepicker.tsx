import { useState } from "react"
import "./datepicker.css"

export type DatepickerProps = {
  id: string
  date: Date
  onChange?: (date: Date) => void
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
          onClick={() => setCurrentMonth((prev: number) => prev - 1)}
        >
          &larr;
        </button>
        <h3>{currentMonthName}</h3>
        <button
          type="button"
          onClick={() => setCurrentMonth((prev: number) => prev + 1)}
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
            aria-selected={day.toDateString() === date.toDateString()}
            data-is-today={
              day.toDateString() === today.toDateString() ? "true" : null
            }
            onClick={() => onChange?.(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </>
  )
}

export type DateRangepickerProps = {
  id: string
  date: [Date, Date]
  onChange?: (date: [Date, Date]) => void
}

const normalize = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()

function isDateInRange(date: Date, [start, end]: [Date, Date | null]) {
  const t = normalize(date)
  const tStart = normalize(start)
  return t >= tStart && !!end && t <= normalize(end)
}

function isDateAfter(date: Date, otherDate: Date) {
  return normalize(date) >= normalize(otherDate)
}

export function DateRangepicker({ id, date, onChange }: DateRangepickerProps) {
  const today = new Date()
  const [firstDate, secondDate] = date

  const [currentMonth, setCurrentMonth] = useState(firstDate.getMonth())
  const [currentYear, setCurrentYear] = useState(firstDate.getFullYear())

  const [selectedDates, setSelectedDates] = useState<[Date, Date | null]>([
    firstDate,
    secondDate,
  ])

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
          onClick={() => {
            setCurrentMonth((prev: number) => prev - 1)
          }}
        >
          &larr;
        </button>
        <h3>
          {currentMonthName} {currentYear}
        </h3>
        <button
          type="button"
          onClick={() => {
            setCurrentMonth((prev: number) => prev + 1)
            if (currentMonth === 11) {
              setCurrentYear((prev: number) => prev + 1)
            }
          }}
        >
          &rarr;
        </button>
      </div>

      <div id={id} className="datepicker-grid">
        {firstDay ? (
          <span style={{ gridColumn: `span ${firstDay}` }}></span>
        ) : null}
        {days.map((day) => {
          const isStart = day.toDateString() === selectedDates[0].toDateString()
          const isEnd = day.toDateString() === selectedDates[1]?.toDateString()
          const isInRange = isDateInRange(day, selectedDates)

          return (
            <button
              key={day.getDate()}
              className="datepicker-day"
              role="option"
              aria-selected={isStart || isEnd || isInRange}
              data-is-today={
                day.toDateString() === today.toDateString() ? "true" : null
              }
              data-is-start={isStart ? "true" : null}
              data-is-end={isEnd ? "true" : null}
              onClick={() => {
                if (selectedDates[1] !== null) {
                  setSelectedDates([day, null])
                } else {
                  const newSelection: [Date, Date] = isDateAfter(
                    day,
                    selectedDates[0]
                  )
                    ? [selectedDates[0], day]
                    : [day, selectedDates[0]]
                  setSelectedDates(newSelection)
                  onChange?.(newSelection)
                }
              }}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </>
  )
}
