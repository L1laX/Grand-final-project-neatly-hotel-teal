const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 64 64",
    }}
    viewBox="0 0 64 64"
    {...props}
  >
    <path
      d="M32 0C14.33 0 0 14.33 0 32s14.33 32 32 32 32-14.33 32-32S49.67 0 32 0zm18.8 42.69c-1 1-2.32 1.5-3.63 1.5s-2.63-.5-3.63-1.5L32 31.15 20.46 42.69c-2 2.01-5.26 2.01-7.26 0s-2.01-5.26 0-7.26l13.38-13.38a7.671 7.671 0 0 1 10.84 0L50.8 35.43a5.124 5.124 0 0 1 0 7.26z"
      style={{
        fill: "#b3b3b3",
      }}
    />
  </svg>
)
export default SvgComponent
