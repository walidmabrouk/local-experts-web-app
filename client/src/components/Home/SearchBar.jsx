import React, { useState } from "react";
import "./SearchBar.css";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function SearchBar({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.profiles.filter((value) => {
      return value.user.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <div className="w-1/2  relative mx-auto transition-all outline-4 outline-offset-2 outline-neutral-400  lg:max-w-2xl max-w-[calc(100%_-_16px)]">
      <div>
        <input
          type="text"
          className=" z-[99999] text-2xl cursor-text w-full input-md flex bg-neutral-100 text-neutral-600 rounded-3xl outline-none ring-white  
                      ring-[12px] pb-6 pl-20 outline-1 
                    placeholder:text-neutral-400  placeholder:text-2xl transition-all duration-300 focus:transition-all
                      font-extrabold font-arabic h-20 hover:outline-none "
          placeholder="Rechercher sur ExpertServices"
          value={wordEntered}
          onChange={handleFilter}
        />

        <span className="absolute inset-0 flex items-center justify-between pointer-events-none px-5">
          <span className="flex ">
            <div className="my-auto pointer-events-auto">
              {filteredData.length === 0 ? (
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  className="text-neutral-500 undefined"
                  height={40}
                  width={40}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </span>
        </span>

        {filteredData.length !== 0 && (
          <div className="sug ">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <section class="sec py-2">
                  <Link
                    className="dataItem flex gap-2 md:flex items-center px-6  "
                    to={`/profile/${value._id}`}
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      className="text-neutral-500 undefined"
                      height={20}
                      width={20}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                        fill="currentColor"
                      />
                    </svg>
                    {value.profilePhoto.url ? (
                      <img
                        className="Navbar-logo search-logo "
                        src={value.profilePhoto.url}
                        alt=""
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#1E90FF"
                        className="w-6 h-6 relative top-1 Navbar-logo   search-logo"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <div>{value.user.name}</div>

                    <div className="bio"> • {value.bio}</div>
                  </Link>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
