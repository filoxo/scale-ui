import "./carousel.css"

export interface CarouselProps extends React.ComponentProps<"div"> {
  align?: "center" | "end" // "start" is default
}

export const CarouselItem = (props: CarouselProps) => {
  return (
    <div {...props} className={`carousel-item ${props?.className || ""}`} />
  )
}

const AlignClassMap = {
  center: "carousel-center",
  end: "carousel-end",
}

export const Carousel = ({ align, ...props }: CarouselProps) => {
  const alignment = align && AlignClassMap[align]
  return (
    <div
      {...props}
      className={`carousel ${alignment || ""} ${props?.className || ""}`}
    />
  )
}
