import * as React from "react";

const Button = ({
  usage = "primary",
  type = "submit",
  additionalClass,
  isDisabled = false,
  children,
  onClick,
}) => {
  const getClass = () => {
    if (usage === "primary") {
      return `text-red-700 border-red-500 focus:ring-red-600 hover:bg-rose-200`;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={`items-center px-5 py-2.5 text-sm font-medium text-center rounded-lg border-2 focus:ring-1 ${getClass()} ${additionalClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
