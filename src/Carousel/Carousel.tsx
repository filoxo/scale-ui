import { forwardRef, useState } from "react"
import "./carousel.css"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ className = "", ...props }, ref) => {
    return <div {...props} className={`carousel ${className}`} ref={ref}></div>
  }
)

export function CarouselItem({ className = "", ...props }: CarouselProps) {
  return <div className={`carousel-item ${className}`} {...props}></div>
}

export const useCarouselControls = () => {
  const [containerRef, setContainerRef] = useState<Element | null>(null)

  const items = Array.from(
    containerRef?.querySelectorAll(".carousel-item") || []
  )

  const setContainerRefSafe = (node: Element | null) => {
    if (node && !node?.classList.contains("carousel"))
      throw new Error(
        "ref must be a <Carousel /> component! Make sure it is attaches correctly to a Carousel, which might happen if there are intermediate components."
      )
    setContainerRef(node)
  }

  function isInView(container: Element, slide: Element) {
    const containerRect = container?.getBoundingClientRect()
    const slideRect = slide?.getBoundingClientRect()
    return (
      slideRect.right >= containerRect.left &&
      slideRect.left <= containerRect.right
    )
  }

  function onPrevClick() {
    if (!containerRef || !items.length) return

    const visibleItems = items.map((item) => isInView(containerRef, item))
    const lastVisibleIndex = visibleItems.indexOf(true)
    const prevSlide = items?.[lastVisibleIndex - 1] || items?.[items.length - 1]
    prevSlide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    })
  }

  function onNextClick() {
    if (!containerRef || !items.length) return
    const visibleItems = items.map((item) => isInView(containerRef, item))
    const lastVisibleIndex = visibleItems.lastIndexOf(true)
    const nextSlide = items?.[lastVisibleIndex + 1] || items?.[0]
    nextSlide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    })
  }

  return {
    setContainerRef: setContainerRefSafe,
    onPrevClick,
    onNextClick,
  }
}
