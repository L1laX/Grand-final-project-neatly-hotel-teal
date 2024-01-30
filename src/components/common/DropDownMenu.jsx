import Link from "next/link";

const DropdownMenu = () => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Dropdown
          {/* Heroicon name: chevron-down */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 13l-5-5h10l-5 5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg outline-none"
        role="menu"
      >
        <div className="py-1" role="none">
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
