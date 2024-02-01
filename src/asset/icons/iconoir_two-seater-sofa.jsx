const SvgComponent = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2 16v3m10-6V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-8 4V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22 16v3M20 9a2 2 0 0 0-2 2v2H6v-2a2 2 0 0 0-4 0v6h20v-6a2 2 0 0 0-2-2Z"
    />
  </svg>
)
export default SvgComponent