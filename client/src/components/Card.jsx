import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  
  return (
    <div className="mr-4 snap-start scroll-ml-px">
      <article>
        <Link to={`/profile/${props.id}`}>
          {" "}
          <div className="relative rounded-md group w-[210px] h-[350px] lg:hover:-translate-y-3 transition-all lg:cursor-pointer">
            <div className="flex flex-col w-full h-full rounded-md border overflow-hidden bg-neutral-100 pb-2  transition-all  border-neutral-100 undefined">
              <div className="absolute top-0 left-0 z-10 w-full pb-16 overflow-hidden">
                <div className="absolute rounded-tr-lg rounded-r-lg inset-0 bg-gradient-to-b from-black/40 to-black/0 z-[-1] rounded-lg m-px"></div>
              </div>
              <div className="relative w-full h-full grow -mb-10 p-1 rounded-lg overflow-hidden">
                <div id="starbtn" class="flex items-center card-star ">
                  <div class="flex ml-auto h-6 w-6 ">
                    <p class="ml-22 text-center text-yellow-400">
                      {Math.floor(Math.random() * 5) + 1}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      class=" h-6 w-6 "
                    >
                      <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                        fill="#ffcd00"
                      ></path>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </svg>
                  </div>
                </div>
                <div className="w-full aspect-video" />
                {/* Ajouter une image au card */}{" "}
                <img
                  src={props.imagesrc}
                  alt=""
                  decoding="async"
                  data-nimg="fill"
                  className="bg-neutral-300 w-full h-full object-cover"
                  loading="lazy"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: "transparent",
                  }}
                />
                <div className="transform-gpu absolute skew-y-[4deg] scale-x-105 -bottom-4 h-16 left-0 right-0 w-full z-[2] bg-neutral-100"></div>
              </div>
              <div className="p-0 px-3 z-10 flex-none mt-[1px]">
                <data
                  value={props.value}
                  className="text-blue-500 font-bold font-arabic  font-extrabold text-primary "
                >
                  <span className="mr-1">{props.value}</span>
                  {props.value ?   <span className="text-xs font-medium">DT</span>: null }
                
                </data>
                <h2 className="card-title font-arabic text-sm font-medium leading-5 text-gray-800 max-w-min min-w-full line-clamp-2 mb-2 mt-1">
                  {props.name}
                </h2>
                <div className="mt-1 mb-1 h-[1px] bg-black/5" />
                <div className="flex items-center space-x-1 text-2xs font-light text-neutral-800">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    className="text-neutral-300"
                    height={12}
                    width={12}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M128,256A128,128,0,1,0,256,384,128,128,0,0,0,128,256Zm379-54.86L400.07,18.29a37.26,37.26,0,0,0-64.14,0L229,201.14C214.76,225.52,232.58,256,261.09,256H474.91C503.42,256,521.24,225.52,507,201.14ZM480,288H320a32,32,0,0,0-32,32V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V320A32,32,0,0,0,480,288Z"></path>
                  </svg>
                  <span className="truncate text-xs w-3/5 font-medium text-neutral-500">
                    {props.category}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-2xs font-light text-neutral-800">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 20 20"
                    className="text-neutral-300"
                    height={12}
                    width={12}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="truncate text-xs w-3/5 font-medium text-neutral-500">
                    {props.Location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}

export default Card;
