import type { Meta, StoryObj } from "@storybook/react"
import { Carousel, CarouselItem, type CarouselProps, useCarouselControls } from "./Carousel"
import "./carousel.stories.css"

const meta = {
  component: Carousel,
} satisfies Meta<CarouselProps>

export default meta

type Story = StoryObj<CarouselProps>

export const Default: Story = {
  args: {
    id: "scale-modal-demo",
  },
  render: (args) => {
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
        <Carousel {...args} ref={setContainerRef}>
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
  },
}
