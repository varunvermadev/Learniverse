/* eslint-disable react/prop-types */
function Button({ btnType, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-800 hover:bg-blue-700 transition-all duration-300 text-gray-50 py-2 px-5 sm:px-8 sm:py-3 rounded-md hover:shadow-md hover:-translate-y-[2px] font-medium uppercase text-sm focus:outline-none hover:text-gray-200 hover:font-semibold"
    >
      {children}
    </button>
  );
}

export default Button;
