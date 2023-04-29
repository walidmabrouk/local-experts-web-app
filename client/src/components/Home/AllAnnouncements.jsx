import React from 'react'

function AllAnnouncements() {
  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-700 font-arabic ">
        Toutes les annonces
      </h1>
      <div className>
        <div className="flex items-center justify-end gap-x-2 my-3" />
        <div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 lg:gap-6">
              <article className="mx-auto">
                <a href>
                  <div className="relative rounded-md group h-full lg:card-hover  flex ">
                    <div
                      className="flex flex-col h-full w-full rounded-md overflow-hidden  pb-2  transition-all border-neutral-100 bg-neutral-100 aspect-grid cursor-pointer"
                      layout={1}
                      index={0}
                    >
                      <div className="relative w-[101%] h-full grow -mb-10">
                        <div className="w-full  aspect-video" />
                        <img
                          alt=""
                          src
                          decoding="async"
                          data-nimg="fill"
                          className="bg-neutral-300 w-full object-cover"
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
                        <div className="transform-gpu absolute skew-y-[4deg] -bottom-4 h-16 left-0 right-0 w-full z-[2] bg-neutral-100 border-t border-t-neutral-100"></div>
                      </div>
                      <div className="p-0 px-3 z-10 flex-none -mt-1">
                        <data
                          value={80}
                          className="text-blue-600 font-bold font-arabic  undefined"
                        >
                          <span className="mr-1">80</span>
                          <span className="text-xs font-medium">DT</span>
                        </data>
                        <h2
                          className="card-title font-arabic text-sm font-medium leading-5 text-gray-800 max-w-min min-w-full line-clamp-2 mb-2 mt-1"
                          dir="auto"
                        >
                          {" "}
                          description{" "}
                        </h2>
                        <div className="mt-1 mb-1 h-[1px] bg-black/5" />
                        <div
                          className="flex items-center space-x-1 mb-[1px] text-2xs font-light 
          text-gray-800"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 512 512"
                            className="text-neutral-300 mr-1"
                            height={11}
                            width={11}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M128,256A128,128,0,1,0,256,384,128,128,0,0,0,128,256Zm379-54.86L400.07,18.29a37.26,37.26,0,0,0-64.14,0L229,201.14C214.76,225.52,232.58,256,261.09,256H474.91C503.42,256,521.24,225.52,507,201.14ZM480,288H320a32,32,0,0,0-32,32V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V320A32,32,0,0,0,480,288Z"></path>
                          </svg>
                          <span className=" truncate text-3xs md:text-xs lg:text-xs w-3/5 font-medium text-neutral-500">
                            Tablettes
                          </span>
                        </div>
                        <div
                          className="flex items-center space-x-1 text-2xs font-light 
          text-gray-800"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 20 20"
                            className="text-neutral-300 mr-1 "
                            height={11}
                            width={11}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="line-clamp-1 truncate text-3xs md:text-xs lg:text-xs w-3/5 font-medium text-neutral-500">
                            Tunis, il y a quelques secondes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
              <article className="mx-auto">
                <a href>
                  <div className="relative rounded-md group h-full lg:card-hover  flex ">
                    <div
                      className="flex flex-col h-full w-full rounded-md overflow-hidden  pb-2  transition-all border-neutral-100 bg-neutral-100 aspect-grid cursor-pointer"
                      layout={1}
                      index={0}
                    >
                      <div className="relative w-[101%] h-full grow -mb-10">
                        <div className="w-full  aspect-video" />
                        <img
                          alt=""
                          src
                          decoding="async"
                          data-nimg="fill"
                          className="bg-neutral-300 w-full object-cover"
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
                        <div className="transform-gpu absolute skew-y-[4deg] -bottom-4 h-16 left-0 right-0 w-full z-[2] bg-neutral-100 border-t border-t-neutral-100"></div>
                      </div>
                      <div className="p-0 px-3 z-10 flex-none -mt-1">
                        <data
                          value={80}
                          className="text-blue-600 font-bold font-arabic  undefined"
                        >
                          <span className="mr-1">80</span>
                          <span className="text-xs font-medium">DT</span>
                        </data>
                        <h2
                          className="card-title font-arabic text-sm font-medium leading-5 text-gray-800 max-w-min min-w-full line-clamp-2 mb-2 mt-1"
                          dir="auto"
                        >
                          {" "}
                          description{" "}
                        </h2>
                        <div className="mt-1 mb-1 h-[1px] bg-black/5" />
                        <div
                          className="flex items-center space-x-1 mb-[1px] text-2xs font-light 
                                          text-gray-800"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 512 512"
                            className="text-neutral-300 mr-1"
                            height={11}
                            width={11}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M128,256A128,128,0,1,0,256,384,128,128,0,0,0,128,256Zm379-54.86L400.07,18.29a37.26,37.26,0,0,0-64.14,0L229,201.14C214.76,225.52,232.58,256,261.09,256H474.91C503.42,256,521.24,225.52,507,201.14ZM480,288H320a32,32,0,0,0-32,32V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V320A32,32,0,0,0,480,288Z"></path>
                          </svg>
                          <span className=" truncate text-3xs md:text-xs lg:text-xs w-3/5 font-medium text-neutral-500">
                            Tablettes
                          </span>
                        </div>
                        <div
                          className="flex items-center space-x-1 text-2xs font-light 
                                          text-gray-800"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 20 20"
                            className="text-neutral-300 mr-1 "
                            height={11}
                            width={11}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="line-clamp-1 truncate text-3xs md:text-xs lg:text-xs w-3/5 font-medium text-neutral-500">
                            Tunis, il y a quelques secondes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            </div>
            {/*button affichier plus */}
            <div className="flex justify-center">
              <button
                className="btn normal-case font-bold border-none rounded-lg hover:bg-red-700
                                        
                                        bg-blue-500  text-white px-16 mt-11 font-extrabold text-lg "
              >
                <span className="flex h-full w-full items-center gap-x-1 gap-y-[2.5px] flex-row">
                  <span className="ml-0 mr-0" />
                  <span className="sm:ml-0.5 justify-center flex w-full">
                    Afficher plus
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllAnnouncements