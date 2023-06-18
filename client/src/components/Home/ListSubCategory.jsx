import React from "react";
import Card from "../Card";
import ColorCard from "./ColorCard";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";

function ListSubCategory(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
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
            className="flex items-center gap-3 afficher rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow text-white text-sm font-bold pl-3 mt-auto mb-2 h-8"
            to={`/SearchPage/${props.title}`}
          >
            Afficher tout
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 20 20"
              height={32}
              width={32}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div>
          <div className="hidden absolute right-0 translate-x-1/2 -translate-y-1/2 z-20 lg:flex flex-col gap-2"></div>
          <div>
            <div
              className="h-1 w-full bg-primary origin-left transition-transform ease-linear"
              style={{ transform: "scaleX(0%)" }}
            />
            <div className="mx-0 h-full w-full scrollbar-none overflow-x-auto scroll-ml-px pl-px scroll-smooth snap-x snap-mandatory">
              <Carousel
                autoPlay={false}
                responsive={responsive}
                infinite={false}
                draggable={false}
              >
                {props.data.profiles.map((profile) =>
                  profile.category === props.title ? (
                    <Card
                      id={profile._id}
                      imagesrc={profile.profilePhoto.url}
                      value={profile.price}
                      name={profile.user.name}
                      category={profile.subcategory}
                      Location={profile.city}
                    />
                  ) : null
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSubCategory;
