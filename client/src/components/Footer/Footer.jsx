import React from 'react'
import { useLocation } from "react-router-dom";

function Footer() {
    const { pathname } = useLocation();
  console.log(pathname);
  // you can check a more conditions here
  if (pathname === "/SearchPage") return null;
  return (
    <div>
      <div className="min-h-[200px] w-full bg-gray-100 py-8 mt-24  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-10 gap-y-12">
          <div className="flex flex-col gap-y-3"></div>
          <div className="space-y-3">
            <h4 className="font-extrabold text-gray-700 text-2xl">Aide</h4>
            <ul className="flex flex-col gap-y-1">
              <li>
                <a
                  className="text-sm text-gray-600"
                  target="_blank"
                  href="/fr/contact/"
                >
                  Contactez-nous
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600"
                  target="_blank"
                  href="/fr/shops/"
                >
                  Professionnels
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600"
                  target="_blank"
                  href="/fr/terms/"
                >
                  Conditions d 'utilisation
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-gray-600"
                  target="_blank"
                  href="/fr/terms/#Utilisation%20des%20cookies%20et%20autres%20technologies"
                >
                  Politiques relatives aux cookies
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-extrabold text-gray-700 text-2xl">
              Raccourcis
            </h4>
            <ul className="flex flex-col gap-y-1">
              <li>
                <a className="text-sm text-gray-600" href="/fr/post-listing/">
                  Publier une annonce
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600" href="/fr/shops/">
                  Visiter une boutique
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600" href="/fr/search/">
                  Filtres avancés
                </a>
              </li>
              <li>
                <a className="text-sm text-gray-600" href="/fr/search/">
                  Rchercher sur ExpertServices
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-gray-700 text-2xl">
              Contactez-nous
            </h4>
            <p className="text-sm text-gray-600 mt-2">
              Vous avez une question?
              <br />
              appelez ces numéros
            </p>
            <ul className="flex flex-col gap-y-1 mt-3 text-sm font-bold text-gray-600">
              <li className="flex gap-x-1 items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 20 20"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className="flex items-baseline gap-x-1">
                  <span className="text-2xs">+216</span>
                  51 012 308
                </span>
              </li>
              <li className="flex gap-x-1 items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 20 20"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className="flex items-baseline gap-x-1">
                  <span className="text-2xs">+216</span>
                  24 812 223
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-y-0.5"></div>
        </div>
        {/* dessous de footer */}
        <div className="px-10 py-16 flex">
          <div className="m-auto flex flex-col gap-y-8">
            <div className="col-span-2 flex items-center justify-center">
              <a href="/fr/" className="logo">
                <svg
                  className="py-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokewidth="1.5"
                  stroke="#4987f8"
                  classname="w-8 h-8"
                  height={80}
                  id="TiTokenHistory"
                  data-name="t-for-tayara"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </a>
              <span className="flex items-center justify-center">
                <a href="/fr/">
                  <span className="font-bold text-3xl">ExpertServices</span>
                </a>
              </span>
            </div>
            <div className="font-extrabold font-arabic text-3xl flex gap-x-2 items-center">
              <span>Tous les professionnels, au meilleur prix</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer