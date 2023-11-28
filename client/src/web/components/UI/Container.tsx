import React, { ReactNode } from "react";
import "./Container.css";
import { Link } from "react-router-dom";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  link?: string;
}

export default function Container(props: ContainerProps) {
  return (
    <Link to={ props.link ? props.link : window.location.pathname }>
      <div className={`${"container"} ${props.className || ""}`}>
        {props.children}
      </div>
    </Link>
  );
}
