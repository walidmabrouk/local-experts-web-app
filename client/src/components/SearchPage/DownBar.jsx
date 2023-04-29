import React from 'react'

function DownBar() {
  return (
    <div
      className="flex w-full flex-col border-t border-gray-200 shadow-sm fixed bottom-0 left-0 right-0 z-[99999] bg-white/80 bg-blend-overlay"
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div className="w-full font-arabic grid grid-cols-3">
        <a href="/fr/">
          <button
            aria-label="Acceuil"
            className="btn normal-case font-bold border-none rounded-lg
            
            line-clamp-1 w-full rounded-none font-normal text-2xs pt-1 !bg-transparent text-slate-900/60"
          >
            <span className="flex h-full w-full items-center gap-x-1 gap-y-[2.5px] flex-col">
              <span className="ml-0 mr-0">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 1024 1024"
                  height={24}
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                </svg>
              </span>
              <span className="sm:ml-0.5 justify-center flex w-full">
                Accueil
              </span>
            </span>
          </button>
        </a>
        <a href="/fr/search/">
          <button
            aria-label="Rechercher"
            className="btn normal-case font-bold border-none rounded-lg
            
            line-clamp-1 w-full rounded-none font-normal text-2xs pt-1 !bg-transparent text-blue-700"
          >
            <span className="flex h-full w-full items-center gap-x-1 gap-y-[2.5px] flex-col">
              <span className="ml-0 mr-0">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height={24}
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <span className="sm:ml-0.5 justify-center flex w-full">
                Rechercher
              </span>
            </span>
          </button>
        </a>
        <a href="/fr/post-listing/">
          <button
            aria-label="Postuler annonce"
            className="btn normal-case font-bold border-none rounded-lg
            undefined
            line-clamp-1 w-full rounded-none font-normal text-2xs pt-1 !bg-transparent text-slate-900/60"
          >
            <span className="flex h-full w-full items-center gap-x-1 gap-y-[2.5px] flex-col">
              <span className="ml-0 mr-0">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height={24}
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </span>
              <span className="sm:ml-0.5 justify-center flex w-full">
                Annonce
              </span>
            </span>
          </button>
        </a>
      </div>
    </div>
  );
}

export default DownBar;