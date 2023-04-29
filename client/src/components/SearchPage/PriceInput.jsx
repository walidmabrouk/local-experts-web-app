import React from 'react'

function PriceInput() {
  return (
    <div className="relative w-full">
      <input
        placeholder="Minimum"
        type="number"
        className="input input-bordered w-full rounded-md bg-gray-50 focus:outline-none placeholder:text-gray-600 text-base border-gray-300 pl-4 "
        defaultValue
      />
      <div className="absolute inset-0 flex gap-2 pl-[1.1rem] pointer-events-none items-center justify-between w-full">
        <span>
          <p className="text-gray-600 transition-all text-xs"></p>
        </span>
      </div>
    </div>
  );
}

export default PriceInput