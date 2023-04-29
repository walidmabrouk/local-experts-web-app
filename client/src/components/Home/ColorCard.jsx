import React from 'react'
import { Link } from 'react-router-dom';

function ColorCard(props) {
  return (
    <div>
      <Link className="w-11/12 sm:w-1/3 " to="/">
        <div
          className={props.ColorCard}
        />
        <div className="flex flex-col justify-center aspect-4/3 relative perspective">
          <img
            loading="lazy"
            src={props.img}
            style={{ width: "350px" }}
            alt={props.alt}
            className="w-full relative z-10"
          />
          <h1 className="sm:text-white text-neutral-700 text-3xl font-extrabold text-center leading-10 line-clamp-2">
            {props.title}
          </h1>
        </div>
      </Link>
    </div>
  );
}

export default ColorCard;