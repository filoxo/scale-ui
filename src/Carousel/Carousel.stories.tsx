import type { StoryDefault, Story } from "@ladle/react"
import { Carousel, CarouselItem, type CarouselProps } from "./Carousel"

export default {
  args: {},
} satisfies StoryDefault<CarouselProps>

export const Default: Story<CarouselProps> = () => {
  return (
    <div>
      <p>
        <strong>Soapbox time:</strong> traditional carousels as (mis)understood
        by most of the world, are just bad. see also{" "}
        <a href="https://shouldiuseacarousel.com">shouldiuseacarousel.com</a>.
        if we maintain the KISS principle with regards to ui dev, carousels that
        <ul>
          <li>have "pagination"</li>
          <li>have "dots" or some 'visual' count indicator</li>
          <li>autoplays</li>
          <li>contains interactive elements (video)</li>
          <li>behaves without user interacting with it</li>
        </ul>
        are "doing too much" and add so much complexity that they're almost
        never worthwhile without VERY good user metrics/data.
      </p>
      <h1>Simple carousel</h1>
      <p>
        Using a simple overflow scroll container with CSS snapping, we can get a
        nice responsive carousel with zero JS.
      </p>
      <Carousel
        style={{
          width: 320,
          padding: "1rem",
          border: "1px solid gray",
          borderRadius: ".5rem",
        }}
      >
        <CarouselItem>
          <img src="https://picsum.photos/id/1/200/300" alt="Random 1" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://picsum.photos/id/2/200/300" alt="Random 2" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://picsum.photos/id/3/200/300" alt="Random 3" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://picsum.photos/id/4/200/300" alt="Random 4" />
        </CarouselItem>
      </Carousel>
    </div>
  )
}

export const Alignment: Story<CarouselProps> = () => {
  return (
    <div>
      <h1>Centered carousel items</h1>
      <Carousel
        style={{
          width: 320,
          padding: "1rem",
          border: "1px solid gray",
          borderRadius: ".5rem",
        }}
        align="center"
      >
        <CarouselItem>
          <img src="https://picsum.photos/id/1/200/300" alt="Random 1" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://picsum.photos/id/2/200/300" alt="Random 2" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://picsum.photos/id/3/200/300" alt="Random 3" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://picsum.photos/id/4/200/300" alt="Random 4" />
        </CarouselItem>
      </Carousel>
    </div>
  )
}

function isInView(container: Element, element: Element) {
  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  debugger
  return (
    elementRect.right > containerRect.left &&
    elementRect.left < containerRect.right
  )
}

function isFullyInView(container: Element, element: Element) {
  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  console.log({
    "elementRect.right": elementRect.right,
    "containerRect.left": containerRect.left,
    "elementRect.left": elementRect.left,
    "containerRect.right": containerRect.right,
    "elementRect.right >= containerRect.left":
      elementRect.right >= containerRect.left,
    "elementRect.left <= containerRect.right":
      elementRect.left <= containerRect.right,
    container,
    element,
  })
  return (
    elementRect.right >= containerRect.left &&
    elementRect.left >= containerRect.right
  )
}

// export const SimpleCarouselControls: Story<CarouselProps> = () => {
//   const handleNext = () => {
//     const slider = document.getElementById("custom-controls-carousel")
//     if (slider === null) return
//     const cards = slider.querySelectorAll(".carousel-item")
//     if (cards === null || !cards?.length) return

//     const visibleCards = Array.from(cards).map((card: Element) =>
//       isFullyInView(slider, card)
//     )
//     console.log(visibleCards)

//     // const lastVisibleIndex = visibleCards.indexOf(true)
//     // const prevCard = cards?.[lastVisibleIndex - 1] || cards?.[cards.length - 1]
//     // prevCard?.scrollIntoView({ behavior: "smooth" })
//   }

//   const handlePrev = () => {
//     const slider = document.getElementById("custom-controls-carousel")
//     if (slider === null) return
//     const cards = slider.querySelectorAll(".carousel-item")
//     if (cards === null || !cards?.length) return

//     const visibleCards = Array.from(cards).map((card: Element) =>
//       isInView(slider, card)
//     )
//     console.log(visibleCards)

//     // const lastVisibleIndex = visibleCards.lastIndexOf(true)
//     // const nextCard = cards?.[lastVisibleIndex + 1] || cards?.[0]
//     // nextCard?.scrollIntoView({ behavior: "smooth" })
//   }

//   return (
//     <div
//       style={{
//         width: 320,
//       }}
//     >
//       <h1>With custom JS controls</h1>
//       <Carousel
//         style={{
//           padding: "1rem",
//           border: "1px solid gray",
//           borderRadius: ".5rem",
//         }}
//         id="custom-controls-carousel"
//         align="center"
//       >
//         <CarouselItem>
//           <img src="https://picsum.photos/id/1/200/300" alt="Random 1" />
//         </CarouselItem>
//         <CarouselItem>
//           <img src="https://picsum.photos/id/2/200/300" alt="Random 2" />
//         </CarouselItem>
//         <CarouselItem>
//           <img src="https://picsum.photos/id/3/200/300" alt="Random 3" />
//         </CarouselItem>
//         <CarouselItem>
//           <img src="https://picsum.photos/id/4/200/300" alt="Random 4" />
//         </CarouselItem>
//         <CarouselItem>
//           <img src="https://picsum.photos/id/5/200/300" alt="Random 5" />
//         </CarouselItem>
//       </Carousel>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <button type="button" onClick={handlePrev}>
//           Prev
//         </button>
//         <button type="button" onClick={handleNext}>
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }
