import React, { ReactNode } from "react";
import "./Card.css";

interface CardProps {
  className?: string;
  children: ReactNode;
  link?: string;
}

export default function Card(props: CardProps) {
  return (
    <div className={`${"card"} ${props.className || ""}`}>
      {props.children}
    </div>
  );
}
