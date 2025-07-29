import type { Meta, StoryObj } from "@storybook/react"
import "./color-theming.css"

const ColorTheming = () => {
  const getLightnessFromHex = (value: string) => {
    const hex = value.replace(/^#/, "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    // luminance formula
    const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return +(brightness * 100).toFixed(2)
  }

  const handleThemeColorOnInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const lightness = getLightnessFromHex(event.target.value)
    document.body.setAttribute(
      "style",
      `
      --theme-color: ${event.target.value};
      --text-color: ${
        lightness > 60 ? "var(--text-color-dark)" : "var(--text-color-light)"
      };
      `
    )
  }
  return (
    <>
      <main className="space-y-6">
        <div className="flex justify-between">
          <h1>Color theming</h1>

          <label htmlFor="theme-color-input" className="surface">
            <svg
              id="Color_Dropper_24"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="24"
                height="24"
                stroke="none"
                fill="#000000"
                opacity="0"
              />

              <g transform="matrix(1 0 0 1 12 12)">
                <path
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 4,
                    fill: "currentColor",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="translate(-12, -11.99)"
                  d="M 18.357422 2 C 17.426547 2 16.496656 2.3563594 15.785156 3.0683594 L 13.132812 5.71875 L 12.207031 4.7929688 L 10.792969 6.2070312 L 11.71875 7.1328125 L 11.71875 7.1347656 L 11.777344 7.1933594 C 11.093645 7.8506285 7.0669847 11.720124 6.1015625 12.685547 C 5.262068 13.525041 4.7691713 14.197465 4.4804688 14.826172 C 4.1917662 15.454879 4.140511 16.020494 4.109375 16.400391 C 4.078239 16.780287 4.067985 16.975205 3.9160156 17.310547 C 3.7640463 17.645888 3.4373368 18.140895 2.7050781 18.880859 L 2.0058594 19.587891 L 4.4042969 21.986328 L 5.1113281 21.302734 C 6.5039438 19.956539 6.7711174 20.055409 7.5625 19.955078 C 7.9581913 19.904913 8.5158958 19.824442 9.1425781 19.525391 C 9.7692605 19.226339 10.454507 18.733767 11.304688 17.910156 L 11.308594 17.904297 L 11.314453 17.898438 C 12.293848 16.919042 16.346563 13.026476 16.992188 12.40625 L 17.792969 13.207031 L 19.207031 11.792969 L 18.28125 10.867188 L 20.931641 8.2148438 C 22.355641 6.7908438 22.355641 4.4913594 20.931641 3.0683594 C 20.219641 2.3563594 19.288297 2 18.357422 2 z M 13.191406 8.6074219 C 13.191523 8.6073094 13.193243 8.6075341 13.193359 8.6074219 L 15.576172 10.992188 C 14.905692 11.63602 10.954225 15.430541 9.9003906 16.484375 C 9.1595628 17.199834 8.6441016 17.545598 8.28125 17.71875 C 7.9156823 17.893198 7.6878556 17.922868 7.3105469 17.970703 C 6.828706 18.03179 6.0934509 18.30057 5.25 18.785156 C 5.377353 18.582814 5.6499992 18.325263 5.7363281 18.134766 C 6.0220151 17.504357 6.0725266 16.940603 6.1035156 16.5625 C 6.1345046 16.184397 6.1461244 15.992699 6.2988281 15.660156 C 6.4515318 15.327614 6.7796195 14.835615 7.515625 14.099609 C 8.3983928 13.216842 12.533292 9.2403802 13.191406 8.6074219 z"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <input
              type="color"
              id="theme-color-input"
              onInput={handleThemeColorOnInput}
            />
          </label>
        </div>
        <section>
          <h2>Section 1</h2>
          <div>
            <p>
              Adapted from{" "}
              <a
                href="https://www.youtube.com/watch?v=7YaWnHVl7Hk"
                target="_blank"
              >
                this awesome video from Code2GO
              </a>{" "}
              this approach makes use of CSS Custom Properties, and oklch units
              with{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch#relative_value_syntax"
                target="_blank"
              >
                relative value syntax
              </a>
              , which gives you:
            </p>
            <ul>
              <li>color selection</li>
              <li>color calculations</li>
              <li>lightness-aware text color</li>
            </ul>
          </div>
          <p>
            I found this approach to be a very neat and elegant solution to
            establishing a scalable color theming system. There is more to this
            in order to scale this up, but this would be immediately useful for
            a simple site or a blog.
          </p>
        </section>
        <section>
          <h2>Section 2</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            aut maiores enim voluptas iste expedita animi tempore modi
            doloremque illo. Odio impedit expedita hic numquam. Fugit officiis
            deserunt quis excepturi.
          </p>
        </section>
      </main>
    </>
  )
}

const meta = {
  component: ColorTheming,
} satisfies Meta<{}>

export default meta

type Story = StoryObj<{}>

export const Default: Story = {
  render: () => <ColorTheming />,
}
