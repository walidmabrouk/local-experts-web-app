import React, { useEffect, useState, useRef } from "react";
import DownBar from "../../components/SearchPage/DownBar";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile, GetProfiles, searchAction } from "../../redux/actions/profileActions";
import SelectedInput from "../../components/SearchPage/SelectedInput";
import datas from "../../state-municipality.json";
import Card from "../../components/Card";
import { useParams } from "react-router-dom";
import { fetchCategories, fetchSubCategories } from "../../redux/actions/categoryActions";

function SearchPage() {
  const dispatch = useDispatch();
    const  category  = useParams();

      const [params, setParams] = useState({});
const [listName, setListName] = useState(category.category || "");
  const [citySelected, setCitySelected] = useState("");
  console.log(category);

  const handleInputChange = (e) => {
  if (e.target.value) {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  } else {
    const updatedParams = { ...params };
    delete updatedParams[e.target.name];
    setParams(updatedParams);
    }
    if (e.target.name === "category") {
      setListName(e.target.value);
    } else if (e.target.name === "city") {
      setCitySelected(e.target.value);
    }
};


// ...
  const [isFirstDispatch, setIsFirstDispatch] = useState(true);

useEffect(() => {
       dispatch(fetchCategories());
       dispatch(fetchSubCategories());
  const fetchData = async () => {
    if (isFirstDispatch) {
      await dispatch( GetProfiles(category));
      setIsFirstDispatch(false);
    } else {
      await dispatch( GetProfiles(params));
    }
  };

  fetchData();
}, [category, params]);

  const profiles = useSelector((state) => state.profiles);
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector((state) => state.categories.subCategories);
console.log(subCategories)
  const onResetHandler = async () => {
       setCitySelected("")
       setListName("");

        await dispatch(await GetProfiles());
  };
 


  const getDelegationNames = (regionName, datas) => {
    let delegationNames = [];

    datas.map((data) => {
      if (data.Name === regionName) {
        data.Delegations.map((delegation) => {
          delegationNames = [...delegationNames, delegation.Name];
        });
      }
    });

    return delegationNames;
  }
  const DelegationArray = getDelegationNames(citySelected, datas)
  


  const filteredSubCategories = subCategories?.filter((subCategory) => {
    return listName === subCategory.category.title;
  });
console.log(filteredSubCategories)


  return (
    <div>
      <DownBar />
      <div>
        <div className="flex flex-col xl:flex-row h-fit w-full  mt-72   lg:mt-32">
          <div
            className="  lg:fixed w-fit mt-10 lg:mt-16  flex flex-col relative lg:z-10 md:z-10 xl:z-10 z-50"
            style={{ height: "calc(100vh - 88px)" }}
          >
            <aside className="relative w-fit  mt-16 lg:mt-2  flex flex-col">
              <div className="max-w-min grow-0 flex items-center justify-center lg:justify-between h-34 py-1 px-2 md:px-3 lg:px-4">
                <button
                  aria-label="Retour"
                  className="btn normal-case font-bold border-none rounded-lg
    undefined
    hidden lg:block btn-outline btn-sm text-2xs font-normal text-gray-700 bg-gray-100 border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-500 min-w-max"
                >
                  <span className="flex h-full w-full items-center gap-x-1 gap-y-[2.5px] flex-row">
                    <span className="ml-0 mr-0">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 20 20"
                        height={16}
                        width={16}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="sm:ml-0.5 justify-center flex w-full">
                      <span className>Retour</span>
                    </span>
                  </span>
                </button>
                <span className>
                  <div>
                    <nav
                      className="text-sm breadcrumbs"
                      aria-label="breadcrumbs"
                    >
                      <ul>
                        <li>
                          <a
                            className="w-full border-none hover:text-gray-600 text-gray-500 text-2xs hover:!no-underline gap-x-1 flex items-center"
                            href="/fr/"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 512 512"
                              height={14}
                              width={14}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M258.5 104.1c-1.5-1.2-3.5-1.2-5 0l-156 124.8c-.9.8-1.5 1.9-1.5 3.1v230c0 1.1.9 2 2 2h108c1.1 0 2-.9 2-2V322c0-1.1.9-2 2-2h92c1.1 0 2 .9 2 2v140c0 1.1.9 2 2 2h108c1.1 0 2-.9 2-2V232c0-1.2-.6-2.4-1.5-3.1l-156-124.8z"></path>
                              <path d="M458.7 204.2l-189-151.4C265.9 49.7 261 48 256 48s-9.9 1.7-13.7 4.8L160 119.7V77.5c0-1.1-.9-2-2-2H98c-1.1 0-2 .9-2 2v92.2l-42.7 35.1c-3.1 2.5-5.1 6.2-5.3 10.2-.2 4 1.3 7.9 4.1 10.7 2.6 2.6 6.1 4.1 9.9 4.1 3.2 0 6.3-1.1 8.8-3.1l183.9-148c.5-.4.9-.4 1.3-.4s.8.1 1.3.4l183.9 147.4c2.5 2 5.6 3.1 8.8 3.1 3.7 0 7.2-1.4 9.9-4.1 2.9-2.8 4.4-6.7 4.2-10.7-.3-4-2.2-7.7-5.4-10.2z"></path>
                            </svg>
                            <span className="truncate max-w-[80px] md:max-w-[150px]">
                              Accueil
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            className="w-full border-none hover:text-gray-600 text-gray-500 text-2xs hover:!no-underline gap-x-1 flex items-center"
                            href="/fr/search/"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              height={14}
                              width={14}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617z"></path>
                              </g>
                            </svg>
                            <span className="truncate max-w-[80px] md:max-w-[150px]">
                              Résultats de recherche
                            </span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </span>
              </div>
              <div className="grow overflow-y-hidden ">
                <div className="w-full lg:w-[calc(100vw/4)] px-2 md:px-3 lg:px-4">
                  <div className="border py-4 px-4 mb-2 rounded-md shadow-sm border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center font-light text-gray-700 capitalize space-x-2">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 512 512"
                          height={20}
                          width={20}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm32 304h-64a16 16 0 010-32h64a16 16 0 010 32zm48-64H176a16 16 0 010-32h160a16 16 0 010 32zm32-64H144a16 16 0 010-32h224a16 16 0 010 32z"></path>
                        </svg>
                        <span>Filtre avancé</span>
                      </span>
                      <button
                        onClick={onResetHandler}
                        aria-label="Réinitialiser le filtre"
                        className="btn normal-case font-bold border-none rounded-lg
    undefined
    btn-ghost btn-xs hover:bg-transparent text-gray-600 hover:text-gray-800 font-light normal-case !gap-0"
                      >
                        <span className="flex h-full w-full items-center gap-x-1 gap-y-[2.5px] flex-row">
                          <span className="ml-0 mr-0">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 512 512"
                              height={12}
                              width={12}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M346.5 240h-181c-8.8 0-16 6-16 16s7.5 16 16 16h181c8.8 0 16-7.2 16-16s-7.2-16-16-16z"></path>
                              <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
                            </svg>
                          </span>
                          <span className="sm:ml-0.5 justify-center flex w-full">
                            Réinitialiser le filtre
                          </span>
                        </span>
                      </button>
                    </div>
                    <div className="my-1 flex flex-col lg:pb-14 relative">
                      <div className="w-full lg:h-[calc(100vh-240px)] lg:overflow-y-auto">
                        <div className="pt-4 mb-2">
                          <div className="relative md:max-w-4xl mx-auto transition-width duration-300 pr-3 ">
                            <form className="lg:max-w-[260px] xl:max-w-300px] 2xl:max-w-[400px] relative ">
                              <input
                                className="  text-base cursor-text input-md flex outline-offset-0 outline-1 
            placeholder:text-neutral-500/80 hover:outline-neutral-400
            focus:outline-offset-0 font-extrabold font-arabic transition-width duration-300
            focus:bg-neutral-600 pl-10 !outline-none placeholder:text-neutral-500 w-full
            focus:placeholder:text-neutral-100 rounded-lg h-10  focus:text-neutral-100 pr-3
            bg-neutral-200 text-neutral-600 
            undefined"
                                placeholder="Rechercher sur ExpertServices"
                              />
                              <span className="absolute inset-0 max-w-full flex items-center justify-between pointer-events-none pl-3">
                                <span>
                                  <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth={2}
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
                                </span>
                                <span className="relative pl-0" />
                              </span>
                            </form>
                          </div>
                        </div>
                        <div className="md:grid flex flex-col lg:grid-cols-2 gap-2 lg:gap-3">
                          <div className="col-span-2">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 font-bold my-2">
                                Prix (DT)
                              </span>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="relative w-full">
                                  <input
                                    placeholder="Minimum"
                                    type="number"
                                    className="input input-bordered w-full rounded-md bg-gray-50 focus:outline-none placeholder:text-gray-600 text-base border-gray-300 pl-4 "
                                    onChange={(e) => {
                                      handleInputChange(e);
                                    }}
                                    name="Minimum"
                                  />
                                  <div className="absolute inset-0 flex gap-2 pl-[1.1rem] pointer-events-none items-center justify-between w-full">
                                    <span>
                                      <p className="text-gray-600 transition-all text-xs"></p>
                                    </span>
                                  </div>
                                </div>
                                <div className="relative w-full">
                                  <input
                                    placeholder="Maximum"
                                    type="number"
                                    className="input input-bordered w-full rounded-md bg-gray-50 focus:outline-none placeholder:text-gray-600 text-base border-gray-300 pl-4 "
                                    onChange={(e) => {
                                      handleInputChange(e);
                                    }}
                                    name="Maximum"
                                  />
                                  <div className="absolute inset-0 flex gap-2 pl-[1.1rem] pointer-events-none items-center justify-between w-full">
                                    <span>
                                      <p className="text-gray-600 transition-all text-xs"></p>
                                    </span>
                                  </div>
                                </div>
                                <div className="relative w-full">
                                  <div className="absolute inset-0 flex gap-2 pl-[1.1rem] pointer-events-none items-center">
                                    <span className="flex text-gray-600">
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
                                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                    <span>
                                      <p className="text-gray-600 transition-all transfrom -translate-y-2 text-3xs">
                                        Ville
                                      </p>
                                    </span>
                                  </div>
                                  <select
                                    onChange={(e) => {
                                      handleInputChange(e);
                                    }}
                                    value={citySelected}
                                    name="city"
                                    className="select pl-11 pt-3 w-full rounded-md focus:outline-none bg-gray-200/70 text-xs  font-bold "
                                  >
                                    <option selected />
                                    <option value="ARIANA">Ariana</option>
                                    <option value="BEN AROUS">Ben Arous</option>
                                    <option value="BIZERTE">Bizerte</option>
                                    <option value="BEJA">Béja</option>
                                    <option value="GABES">Gabès</option>
                                    <option value="GAFSA">Gafsa</option>
                                    <option value="Jendouba">Jendouba</option>
                                    <option value="KAIROUAN">Kairouan</option>
                                    <option value="KASSERINE">Kasserine</option>
                                    <option value="KEBILI">Kébili</option>
                                    <option value="Manouba">La Manouba</option>
                                    <option value="KEF">Le Kef</option>
                                    <option value="MAHDIA">Mahdia</option>
                                    <option value="MONASTIR">Monastir</option>
                                    <option value="MANOUBA">Mannouba</option>
                                    <option value="MEDENINE">Médenine</option>
                                    <option value="NABEUL">Nabeul</option>
                                    <option value="SFAX">Sfax</option>
                                    <option value="SIDI BOUZID">
                                      Sidi Bouzid
                                    </option>
                                    <option value="SILIANA">Siliana</option>
                                    <option value="SOUSSE">Sousse</option>
                                    <option value="TATAOUINE">Tataouine</option>
                                    <option value="TOZEUR">Tozeur</option>
                                    <option value="TUNIS">Tunis</option>
                                    <option value="ZAGHOUAN">Zaghouan</option>
                                  </select>
                                </div>
                                <div className="relative w-full">
                                  <div className="absolute inset-0 flex gap-2 pl-[1.1rem] pointer-events-none items-center">
                                    <span className="flex text-gray-600">
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
                                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                    <span>
                                      <p className="text-gray-600 transition-all transfrom -translate-y-2 text-3xs">
                                        Délégation
                                      </p>
                                    </span>
                                  </div>
                                  <select className="select pl-11 pt-3 w-full rounded-md focus:outline-none bg-gray-200/70 text-xs  font-bold ">
                                    <option selected />

                                    {DelegationArray.map((delegation) => (
                                      <option value={delegation}>
                                        {delegation}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="relative w-full">
                                  <div className="absolute inset-0 flex gap-2 pl-[1.1rem] pointer-events-none items-center">
                                    <span className="flex text-gray-600">
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
                                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                    <span>
                                      <p className="text-gray-600 transition-all transfrom -translate-y-2 text-3xs">
                                        Categorie
                                      </p>
                                    </span>
                                  </div>
                                  <select
                                    onChange={(e) => {
                                      handleInputChange(e);
                                    }}
                                    value={listName}
                                    name="category"
                                    className="select pl-11 pt-3 w-full rounded-md focus:outline-none bg-gray-200/70 text-xs  font-bold "
                                  >
                                    <option selected />
                                    {categories.map((category) => (
                                      <option value={category.title}>
                                        {category.title}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="relative w-full">
                                  <div className="absolute inset-0 flex gap-2 pl-[1.1rem] pointer-events-none items-center">
                                    <span className="flex text-gray-600">
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
                                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                    <span>
                                      <p className="text-gray-600 transition-all transfrom -translate-y-2 text-3xs">
                                        sub-categorie
                                      </p>
                                    </span>
                                  </div>
                                  <select
                                    name="sub-categorie"
                                    className="select pl-11 pt-3 w-full rounded-md focus:outline-none bg-gray-200/70 text-xs  font-bold "
                                  >
                                    <option selected />

                                    {filteredSubCategories?.map(
                                      (subCategory) => (
                                        <option
                                          key={subCategory.name}
                                          value={subCategory.name}
                                        >
                                          {subCategory.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          aria-label="Filtrer"
                          className="btn normal-case font-bold border-none rounded-lg
    bg-blue-500 text-white hover:bg-blue-700 mt-16 hidden lg:block absolute w-full "
                        >
                          <span className="flex h-full w-full items-center gap-x-1 gap-y-[2.5px] flex-row">
                            <span className="ml-0 mr-0">
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
                                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="sm:ml-0.5 justify-center flex w-full">
                              <span className="tracking-widest uppercase font-light">
                                Filtrer
                              </span>
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div
            className="overflow-x-hidden mt-6 z-[1]   "
            style={{ width: "calc(100% - 384px)", marginLeft: "485px" }}
          >
            <main className=" mt-4 mr-8">
              <div className="mt-3 mx-2 lg:ml-0 lg:mr-4 lg:mt-12">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex lg:flex-row flex-col items-center gap-2">
                    <div>
                      <h1 className="text-2xl font-bold text-blue-700">
                        {!listName ? "Toutes les professionnels" : listName}
                      </h1>
                    </div>
                    <data className="block text-xs text-center md:text-start font-medium text-gray-700">
                      ({profiles.profiles.length} annonces)
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
                        {profiles.profiles.map((profile) => (
                          <Card
                            imagesrc={profile.profilePhoto.url}
                            value={profile.price}
                            name={profile.user.name}
                            category={profile.category}
                            Location={profile.city}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
