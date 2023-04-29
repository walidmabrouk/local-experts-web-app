import React from 'react'
import { Link } from 'react-router-dom';

function HomeServices(props) {
  return (
    <div>
      
      <Link
        className="flex flex-col items-center gap-y-1 group cursor-pointer"
        to={props.nav}
      >
        <div className="rounded-2xl p-1 md:p-3 lg:p-3 flex flex-col items-center justify-center gap-1 md:gap-2 w-full bg-neutral-100 group-hover:bg-primary/5 text-red-400 group-hover:text-red-400">
        {props.svg}
          <div className="w-full text-2xs group-hover:text-primary md:hidden text-center overflow-hidden whitespace-nowrap overflow-ellipsis">
            {props.name}
          </div>
        </div>
        <span className="text-2xs text-neutral-400 font-bold relative group-hover:text-neutral-700 hidden md:block">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 min-w-max">
            {props.name}
          </span>
        </span>
      </Link>
    </div>
  );
}

export default HomeServices