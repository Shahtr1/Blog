import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import * as React from "react";

export interface ThemeProps {
  children: React.ReactNode;
}

export default function ThemeProvider(props: ThemeProps) {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,43)] min-h-screen">
        {props.children}
      </div>
    </div>
  );
}
