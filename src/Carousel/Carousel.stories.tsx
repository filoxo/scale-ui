import type { Meta, StoryObj } from "@storybook/react"
import {
  Carousel,
  CarouselItem,
  type CarouselProps,
  useCarouselControls,
} from "./Carousel"
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
      <>
        <section>
          <p>
            The Carousel was built to balance accessibility, performance, and
            flexibility. it supports any child so it can be used for anything
            such as image sliders, as well as interactive slides with
            links/videos/etc. it uses native HTML and CSS with no external
            dependencies.
          </p>
        </section>
        <div className="carousel-story-wrapper">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={onPrevClick}
          >
            &laquo;
          </button>
          <button type="button" aria-label="Next slide" onClick={onNextClick}>
            &raquo;
          </button>
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
      </>
    )
  },
}
