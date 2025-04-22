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

const Button = (props: any) => (
  <button
    {...props}
    style={{
      padding: ".5rem 1.5rem",
      borderRadius: "1rem",
      border: "none",
      backgroundColor: "gainsboro",
    }}
  />
)

export const Default: Story<CarouselProps> = () => {
  const { setContainerRef, onPrevClick, onNextClick } = useCarouselControls()

  return (
    <div>
      <div
        style={{
          marginBlockEnd: "1rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onPrevClick}>Prev</Button>
        <Button onClick={onNextClick}>Next</Button>
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
