import React from "react";

import cx from "classnames";
import "./app-buttons.scss"; // Import Link component from React Router

interface ButtonProps {
  url?: string;
  outline?: boolean;
  color?: string;
  block?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  url,
  children,
  onClick,
  type,
  disabled,
  block,
  outline,
}) => {
  // Your component logic here
  const classes = cx({
    basicBtn: true,
    block,
    outline,
  });
  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
Button.defaultProps = {
  color: "primary",
  block: false,
  disabled: false,
  type: "button",
  outline: false,
};
export default Button;


