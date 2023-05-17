import React from 'react'

function AllAnnouncements() {
  return (
    <div className="max-w-8xl mx-auto">
    
  
            {/*button affichier plus */}
            <div className="flex justify-center">
              <button
                className="btn normal-case font-bold border-none rounded-lg hover:bg-red-700    
                                        bg-blue-500  text-white px-16 mt-11 font-extrabold text-lg "
              >
                <span className="flex h-full w-full items-center gap-x-1 gap-y-[2.5px] flex-row">
                  <span className="ml-0 mr-0" />
                  <span className="sm:ml-0.5 justify-center flex w-full">
                    Afficher toutes les annonces
                  </span>
                </span>
              </button>
            </div>
          </div>

  );
}

export default AllAnnouncements