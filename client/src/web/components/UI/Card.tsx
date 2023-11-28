import React, { ReactNode } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

interface CardProps {
  className?: string;
  children: ReactNode;
  link?: string;
}

export default function Card(props: CardProps) {
  return (
    <Link to={ props.link ? props.link : window.location.pathname }>
      <div className={`${"card"} ${props.className || ""}`}>
        {props.children}
      </div>
    </Link>
  );
}
