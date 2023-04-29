import React from "react";
import Icon from "../../assets/media/Loader.jsx";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions/authActions.js";
import { Menu, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
function Header({ user }) {
  const dispatch = useDispatch();
  const LogoutHanlder = () => {
    dispatch(Logout());
  };
  const menu = (
    <Menu className=" z-9999 ">
      <Menu.Item>
        <Link to="#" onClick={LogoutHanlder}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div>
        <div className="shadow-sm z-50 h-16 py-2 fixed top-0 right-0 left-0  w-screen h-100 bg-white pointer-events-auto">
          {/*loader */}
          <div className=" pointer-events-none absolute w-full bottom-[-37.5px] border-t-[1px] border-t-primary transition-transform duration-300 scale-y-100">
            <Icon  />
          </div>
          <div className="grid grid-cols-12 px-2">
            <div className="col-span-2 flex items-center justify-center ">
              <Link to="/" className="flex items-center gap-1">
                <svg
                  className="w-8 h-8 -rotate-90 logo"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#4987f8"
                  width={48}
                  height={69}
                  id="TiTokenHistory"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </Link>
              <span className="flex items-center justify-center  ">
                <Link to="/">
                  <span className="font-bold text-xl">ExpertServices</span>{" "}
                </Link>
              </span>
              <ul className="flex items-center mr-16 ">
                {user.role === "ADMIN" ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/admin"
                    >
                      Admin
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <div className="col-span-7 flex items-center justify-center ">
              <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                <div>Rechercher sur ExpertServices</div>
                <div className="border-l border-gray-300"></div>
                <button className="bg-primary text-white p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="col-span-3 flex justify-end  items-center">
              <div className="mx-4">
                {!user.isConnected ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                ) : (
                  <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 ">
                    <Dropdown overlay={menu} placement="bottomCenter">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </Dropdown>
                    <Link to={user ? "/account" : "/login"}>
                      <div className="flex gap-2 bg-gray-500  rounded-full border border-gray-500 overflow-hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#1E90FF"
                          className="w-6 h-6 relative top-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {!!user && <div>{user.name}</div>}
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
