import React from 'react'
import Card from '../Card';

function MainComponent() {
  return (
    <main className=" mt-4 mr-8" >
      <div className="mt-3 mx-2 lg:ml-0 lg:mr-4 lg:mt-12">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex lg:flex-row flex-col items-center gap-2">
            <div>
              <h1 className="text-2xl font-bold text-blue-700">Immobilier</h1>
            </div>
            <data className="block text-xs text-center md:text-start font-medium text-gray-700">
              (0 annonces)
            </data>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row" />
        </div>
        <div className>
          <div className="flex items-center justify-end gap-x-2 my-3">
            <select className="select focus:outline-offset-0 bg-gray-100 text-2xs text-gray-600 font-light rounded-full select-sm w-[160px] max-w-full">
              <option value="default" selected>
                Trier par
              </option>
              <option value={0}>Plus récentes</option>
              <option value={1}>Plus anciennes</option>
              <option value={2}>Prix croissant</option>
              <option value={3}>Prix décroissant</option>
            </select>
          </div>
          <div>
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-1 sm:gap-4 lg:gap-6">
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainComponent;