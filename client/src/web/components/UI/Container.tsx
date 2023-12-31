import React, { ReactNode } from "react";
import "./Container.css";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  link?: string;
}

export default function Container(props: ContainerProps) {
  return (
    <div className={`${"container"} ${props.className || ""}`}>
      {props.children}
    </div>
  );
}
