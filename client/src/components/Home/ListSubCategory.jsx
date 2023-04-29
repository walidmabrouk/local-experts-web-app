import React from "react";
import Card from "../Card";
import ColorCard from "./ColorCard";
import { Link } from "react-router-dom";

function ListSubCategory(props) {
  return (
    <div className="w-full lg:max-w-4xl xl:max-w-5xl 2xl:max-w-9xl md:mx-6 lg:mx-10 xl:mx-auto relative flex flex-col lg:flex-row gap-1 lg:gap-6 lg:my-16 items-center">
      <ColorCard
        ColorCard={props.ColorCard}
        title={props.title}
        img={props.img}
        alt={props.alt}
      />
      <div className="overflow-x-hidden h-full w-full py-auto mb-8">
        <div className="flex justify-center lg:justify-end ">
          <Link
            className="flex items-center gap-3 text-sm font-bold pl-3 mt-auto mb-2"
            to="/"
          >
            Afficher tout
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 20 20"
              height={20}
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div>
          <div className="hidden absolute right-0 translate-x-1/2 -translate-y-1/2 z-20 lg:flex flex-col gap-2">
            <button
              type="button"
              className="bg-primary text-white p-2.5 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 20 20"
                height={26}
                width={26}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className=" shadow-md shadow-neutral-300 bg-white transition-colors text-neutral-500 p-1 mx-auto z-[1] rounded-full"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 20 20"
                height={26}
                width={26}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div>
            <div
              className="h-1 w-full bg-primary origin-left transition-transform ease-linear"
              style={{ transform: "scaleX(0%)" }}
            />
            <div className="mx-0 h-full w-full scrollbar-none overflow-x-auto scroll-ml-px pl-px scroll-smooth snap-x snap-mandatory">
              <ul className="h-full flex gap-4 pt-4">
                <li>
                  <div className="w-[210px] aspect-9/13 bg-neutral-100 animate-pulse rounded-lg">
                    <Card />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSubCategory;
