import { useState, useCallback, useEffect, useRef } from "react"
import "./datepicker.css"

export type DatepickerProps = {
  id: string
  date: Date
  onChange?: (date: Date) => void
}

/**
 * Get the day index (1-based) of the currently focused day button
 */
function getFocusedDayIndex(): number | null {
  const active = document.activeElement
  if (!active || !(active instanceof HTMLElement)) return null
  const dayAttr = active.getAttribute("data-day")
  return dayAttr ? parseInt(dayAttr, 10) : null
}

/**
 * Focus a specific day button by its index
 */
function focusDay(dayIndex: number): void {
  const element = document.querySelector<HTMLElement>(
    `[data-day="${dayIndex}"]`,
  )
  element?.focus()
}

export function Datepicker({ id, date, onChange }: DatepickerProps) {
  const today = new Date()
  const firstDate = Array.isArray(date) ? date[0] : date

  const [currentMonth, setCurrentMonth] = useState(firstDate.getMonth())
  const [currentYear, setCurrentYear] = useState(firstDate.getFullYear())
  const [pendingFocusDay, setPendingFocusDay] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const handlePreviousMonth = useCallback(() => {
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const daysInPreviousMonth = new Date(
      previousYear,
      previousMonth + 1,
      0,
    ).getDate()
    const currentDay = getFocusedDayIndex() ?? date.getDate()
    const targetDay = Math.min(currentDay, daysInPreviousMonth)

    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((prev: number) => prev - 1)
    } else {
      setCurrentMonth((prev: number) => prev - 1)
    }
    setPendingFocusDay(targetDay)
  }, [currentMonth, currentYear, date])

  const handleNextMonth = useCallback(() => {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate()
    const currentDay = getFocusedDayIndex() ?? date.getDate()
    const targetDay = Math.min(currentDay, daysInNextMonth)

    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((prev: number) => prev + 1)
    } else {
      setCurrentMonth((prev: number) => prev + 1)
    }
    setPendingFocusDay(targetDay)
  }, [currentMonth, currentYear, date])

  // Focus the target day after month change
  useEffect(() => {
    if (pendingFocusDay !== null) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        const element = document.querySelector<HTMLElement>(
          `[data-day="${pendingFocusDay}"]`,
        )
        if (element) {
          element.focus()
          setPendingFocusDay(null)
        }
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [pendingFocusDay, currentMonth, currentYear])

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
    (day) => new Date(currentYear, currentMonth, day),
  )
  const currentMonthName = new Date(
    currentYear,
    currentMonth,
    1,
  ).toLocaleString("en-US", { month: "long" })
  const firstDayOfWeek = days[0].getDay()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentDay = getFocusedDayIndex()
    if (!currentDay) return

    const currentIndex = currentDay - 1 // 0-based
    const currentWeekday = (firstDayOfWeek + currentIndex) % 7
    const currentWeekStartIndex = currentIndex - currentWeekday

    switch (event.key) {
      case "ArrowLeft": {
        event.preventDefault()
        if (currentIndex > 0) {
          focusDay(currentIndex)
        } else {
          handlePreviousMonth()
        }
        break
      }
      case "ArrowRight": {
        event.preventDefault()
        if (currentIndex < daysInMonth - 1) {
          focusDay(currentIndex + 2)
        } else {
          handleNextMonth()
        }
        break
      }
      case "ArrowUp": {
        event.preventDefault()
        const targetIndex = currentIndex - 7
        if (targetIndex >= 0) {
          focusDay(targetIndex + 1)
        } else {
          handlePreviousMonth()
        }
        break
      }
      case "ArrowDown": {
        event.preventDefault()
        const targetIndex = currentIndex + 7
        if (targetIndex < daysInMonth) {
          focusDay(targetIndex + 1)
        } else {
          handleNextMonth()
        }
        break
      }
      case "Home": {
        event.preventDefault()
        focusDay(currentWeekStartIndex + 1)
        break
      }
      case "End": {
        event.preventDefault()
        const lastDayOfWeek = Math.min(
          currentWeekStartIndex + 6,
          daysInMonth - 1,
        )
        focusDay(lastDayOfWeek + 1)
        break
      }
      case "PageUp": {
        event.preventDefault()
        handlePreviousMonth()
        break
      }
      case "PageDown": {
        event.preventDefault()
        handleNextMonth()
        break
      }
    }
  }

  return (
    <>
      <div className="datepicker-header">
        <button
          type="button"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
        >
          &larr;
        </button>
        <h3>
          {currentMonthName} {currentYear}
        </h3>
        <button type="button" onClick={handleNextMonth} aria-label="Next month">
          &rarr;
        </button>
      </div>

      <div id={id} ref={gridRef} className="datepicker-grid">
        {firstDayOfWeek ? (
          <span style={{ gridColumn: `span ${firstDayOfWeek}` }}></span>
        ) : null}
        {days.map((day) => {
          const isSelected = day.toDateString() === date.toDateString()
          const isToday = day.toDateString() === today.toDateString()
          return (
            <button
              key={day.getDate()}
              data-day={day.getDate()}
              className="datepicker-day"
              aria-selected={isSelected}
              aria-label={day.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              data-is-start={isSelected ? "true" : null}
              data-is-end={isSelected ? "true" : null}
              data-is-today={isToday ? "true" : null}
              onClick={() => onChange?.(day)}
              onKeyDown={handleKeyDown}
            >
              {day.getDate()}
            </button>
          )
        })}
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
  const [pendingFocusDay, setPendingFocusDay] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const handlePreviousMonth = useCallback(() => {
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const daysInPreviousMonth = new Date(
      previousYear,
      previousMonth + 1,
      0,
    ).getDate()
    const currentDay = getFocusedDayIndex() ?? firstDate.getDate()
    const targetDay = Math.min(currentDay, daysInPreviousMonth)

    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((prev: number) => prev - 1)
    } else {
      setCurrentMonth((prev: number) => prev - 1)
    }
    setPendingFocusDay(targetDay)
  }, [currentMonth, currentYear, firstDate])

  const handleNextMonth = useCallback(() => {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate()
    const currentDay = getFocusedDayIndex() ?? firstDate.getDate()
    const targetDay = Math.min(currentDay, daysInNextMonth)

    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((prev: number) => prev + 1)
    } else {
      setCurrentMonth((prev: number) => prev + 1)
    }
    setPendingFocusDay(targetDay)
  }, [currentMonth, currentYear, firstDate])

  // Focus the target day after month change
  useEffect(() => {
    if (pendingFocusDay !== null) {
      const timer = setTimeout(() => {
        const element = document.querySelector<HTMLElement>(
          `[data-day="${pendingFocusDay}"]`,
        )
        if (element) {
          element.focus()
          setPendingFocusDay(null)
        }
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [pendingFocusDay, currentMonth, currentYear])

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
    (day) => new Date(currentYear, currentMonth, day),
  )
  const currentMonthName = new Date(
    currentYear,
    currentMonth,
    1,
  ).toLocaleString("en-US", { month: "long" })
  const firstDayOfWeek = days[0].getDay()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentDay = getFocusedDayIndex()
    if (!currentDay) return

    const currentIndex = currentDay - 1
    const currentWeekday = (firstDayOfWeek + currentIndex) % 7
    const currentWeekStartIndex = currentIndex - currentWeekday

    switch (event.key) {
      case "ArrowLeft": {
        event.preventDefault()
        if (currentIndex > 0) {
          focusDay(currentIndex)
        } else {
          handlePreviousMonth()
        }
        break
      }
      case "ArrowRight": {
        event.preventDefault()
        if (currentIndex < daysInMonth - 1) {
          focusDay(currentIndex + 2)
        } else {
          handleNextMonth()
        }
        break
      }
      case "ArrowUp": {
        event.preventDefault()
        const targetIndex = currentIndex - 7
        if (targetIndex >= 0) {
          focusDay(targetIndex + 1)
        } else {
          handlePreviousMonth()
        }
        break
      }
      case "ArrowDown": {
        event.preventDefault()
        const targetIndex = currentIndex + 7
        if (targetIndex < daysInMonth) {
          focusDay(targetIndex + 1)
        } else {
          handleNextMonth()
        }
        break
      }
      case "Home": {
        event.preventDefault()
        focusDay(currentWeekStartIndex + 1)
        break
      }
      case "End": {
        event.preventDefault()
        const lastDayOfWeek = Math.min(
          currentWeekStartIndex + 6,
          daysInMonth - 1,
        )
        focusDay(lastDayOfWeek + 1)
        break
      }
      case "PageUp": {
        event.preventDefault()
        handlePreviousMonth()
        break
      }
      case "PageDown": {
        event.preventDefault()
        handleNextMonth()
        break
      }
    }
  }

  return (
    <>
      <div className="datepicker-header">
        <button
          type="button"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
        >
          &larr;
        </button>
        <h3>
          {currentMonthName} {currentYear}
        </h3>
        <button type="button" onClick={handleNextMonth} aria-label="Next month">
          &rarr;
        </button>
      </div>

      <div id={id} ref={gridRef} className="datepicker-grid">
        {firstDayOfWeek ? (
          <span style={{ gridColumn: `span ${firstDayOfWeek}` }}></span>
        ) : null}
        {days.map((day) => {
          const isToday = day.toDateString() === today.toDateString()
          const isStart = day.toDateString() === selectedDates[0].toDateString()
          const isEnd = day.toDateString() === selectedDates[1]?.toDateString()
          const isInRange = isDateInRange(day, selectedDates)
          return (
            <button
              key={day.getDate()}
              data-day={day.getDate()}
              className="datepicker-day"
              aria-selected={isStart || isEnd || isInRange}
              aria-label={day.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              data-is-today={isToday ? "true" : null}
              data-is-start={isStart ? "true" : null}
              data-is-end={isEnd ? "true" : null}
              onClick={() => {
                if (selectedDates[1] !== null) {
                  setSelectedDates([day, null])
                } else {
                  const newSelection: [Date, Date] = isDateAfter(
                    day,
                    selectedDates[0],
                  )
                    ? [selectedDates[0], day]
                    : [day, selectedDates[0]]
                  setSelectedDates(newSelection)
                  onChange?.(newSelection)
                }
              }}
              onKeyDown={handleKeyDown}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </>
  )
}
