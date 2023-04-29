import React from "react";
import DownBar from "../../components/SearchPage/DownBar";
import Aside from "../../components/SearchPage/Aside";
import MainComponent from "../../components/SearchPage/MainComponent";
function SearchPage() {
  return (
    <div>
      <DownBar />
      <div>
        <div className="flex flex-col xl:flex-row h-fit w-full  mt-72   lg:mt-32">
          <div
            className="  lg:fixed w-fit mt-10 lg:mt-16  flex flex-col relative lg:z-10 md:z-10 xl:z-10 z-50"
            style={{ height: "calc(100vh - 88px)" }}
          >
            <Aside />
          </div>
          <div
            className="overflow-x-hidden mt-6 z-[1]   "
            style={{ width: "calc(100% - 384px)", marginLeft: "485px" }}
          >
            <MainComponent />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
