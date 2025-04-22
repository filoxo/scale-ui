import type { StoryDefault, Story } from "@ladle/react"
import {
  Carousel,
  CarouselItem,
  type CarouselProps,
  useCarouselControls,
} from "./Carousel"
import "./carousel.stories.css"

export default {
  args: {},
} satisfies StoryDefault<CarouselProps>

export const Default: Story<CarouselProps> = () => {
  const { setContainerRef, onPrevClick, onNextClick } = useCarouselControls()

  return (
    <div>
      <div className="carousel-stories-controls">
        <button type="button" onClick={onPrevClick}>
          Prev
        </button>
        <button type="button" onClick={onNextClick}>
          Next
        </button>
      </div>
      <Carousel id="scale-modal-demo" ref={setContainerRef}>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
        <CarouselItem>Item 4</CarouselItem>
        <CarouselItem>Item 5</CarouselItem>
        <CarouselItem>Item 6</CarouselItem>
        <CarouselItem>Item 7</CarouselItem>
        <CarouselItem>Item 8</CarouselItem>
        <CarouselItem>Item 9</CarouselItem>
        <CarouselItem>Item 10</CarouselItem>
      </Carousel>
    </div>
  )
}
