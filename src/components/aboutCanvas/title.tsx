import { useThemeContext } from "@/context/theme";
import { Typography } from "antd";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const TitleABout: React.FC<TitleProps> = ({ children }) => {
  const { isThemeDark } = useThemeContext();

  return (
    <Typography
      className={`text-2xl text-center font-bold  mt-2 mb-4`}
      style={{ color: isThemeDark ? "white" : "var(--primary-color)" }}
    >
      {children}
    </Typography>
  );
};

export default TitleABout;
