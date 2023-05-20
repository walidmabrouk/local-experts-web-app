import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/AdminPage/Admin";
import NotFound from "./pages/Auth/NotFound";
import NoAccess from "./pages/Auth/NoAccess";
import PrivateRouter from "./components/PrivateRouter";
import AdminRouter from "./components/AdminRouter";
//* AdminRouter : il faut faire le login (redirection to login)
import ForceRedirect from "./components/ForceRedirect";
//* ForceRedirect : celui connecté n'a pas accées au page login et registr
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import { Logout, setUser } from "./redux/actions/authActions";
import { useSelector } from "react-redux";
import { setAuth } from "./util/setAuth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/ProfessionnelPages/Home";
import SearchPage from "./pages/ProfessionnelPages/SearchPage";
import Profile from "./pages/ProfessionnelPages/Profile";
import AccountPostPage from "./pages/ProfessionnelPages/AccountPostPage";
import BookingPage from "./pages/ProfessionnelPages/BookingPage";
import PostsFormPage from "./pages/ProfessionnelPages/PostsFormPage";
import "react-multi-carousel/lib/styles.css";
import Account from "./pages/ProfessionnelPages/Account";
import UpdateProfileModal from "./components/UpdateProfileModal";
import Posts from "./pages/ProfessionnelPages/Posts";
import Category from "./components/Posts/Category";
import CreatePost from "./pages/ProfessionnelPages/CreatePost";
import PostDetails from "./pages/ProfessionnelPages/PostDetails";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import NotificationPage from "./pages/ProfessionnelPages/NotificationPage";
import FavoritePage from "./pages/ProfessionnelPages/FavoritePage";
import Test from "./pages/Test";


if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
  const currentDate = Date.now / 1000;

  if (decode.exp > currentDate) {
    store.dispatch(Logout());
  }
}

function App() {

  const [socket, setSocket] = useState(null);


  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);


  const auth = useSelector((state) => state.auth);
  const user = {
    //* auth.isConnected and auth.user.role from database
    //* test sur connection et le role
    isConnected: auth.isConnected,
    role: auth.user.role,
    name: auth.user.name,
    id: auth.user.name
  };
  console.log(user.name)
    useEffect(() => {
      socket?.emit("newUser", user.name);
    }, [socket, user]);
  
  
  return (
    <BrowserRouter>
      <Header socket={socket} user={user} />
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <ForceRedirect user={user}>
                <Login />
              </ForceRedirect>
            }
          />
          <Route
            path="/register"
            element={
              <ForceRedirect user={user}>
                <Register />
              </ForceRedirect>
            }
          />
          <Route
            path="/users/:userId/verify/:token"
            element={user ? <VerifyEmail /> : <Navigate to="/" />}
          />
          <Route
            path="/admin"
            element={
              <AdminRouter user={user}>
                <Admin />
              </AdminRouter>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRouter user={user}>
                <Home />
              </PrivateRouter>
            }
          />
          <Route
            path="/Posts"
            element={
              <PrivateRouter user={user}>
                <Posts socket={socket} user={user} />
              </PrivateRouter>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRouter user={user}>
                <NotificationPage socket={socket} user={user} />
              </PrivateRouter>
            }
          />
          <Route
            path="/createpost"
            element={
              <PrivateRouter user={user}>
                <CreatePost />
              </PrivateRouter>
            }
          />
          <Route
            path="/posts/details/:id"
            element={
              <PrivateRouter user={user}>
                <PostDetails socket={socket} user={user} />
              </PrivateRouter>
            }
          />
          <Route
            path="/posts/category/:category"
            element={
              <PrivateRouter user={user}>
                <Category />
              </PrivateRouter>
            }
          />
          <Route
            path="/SearchPage/:category"
            element={
              <PrivateRouter user={user}>
                <SearchPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/SearchPage"
            element={
              <PrivateRouter user={user}>
                <SearchPage />
              </PrivateRouter>
            }
          />
          <Route path="/profile/:id">
            <Route
              index
              element={
                <PrivateRouter user={user}>
                  <Account />
                </PrivateRouter>
              }
            />

            <Route
              path="bookings"
              element={
                <PrivateRouter user={user}>
                  <BookingPage />
                </PrivateRouter>
              }
            />
            <Route
              path="Favorites"
              element={
                <PrivateRouter user={user}>
                  <FavoritePage />
                </PrivateRouter>
              }
            />
          </Route>

          <Route
            path="/profile/bookings/:id"
            element={
              <PrivateRouter user={user}>
                <BookingPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/modifyaccount"
            element={
              <PrivateRouter user={user}>
                <UpdateProfileModal />
              </PrivateRouter>
            }
          />
          <Route
            path="/account/posts"
            element={
              <AdminRouter user={user}>
                <AccountPostPage />
              </AdminRouter>
            }
          />
          <Route
            path="/account/posts/new"
            element={
              <PrivateRouter user={user}>
                <PostsFormPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/account/posts/:id"
            element={
              <PrivateRouter user={user}>
                <PostsFormPage user={user} />
              </PrivateRouter>
            }
          />
          <Route
            path="/account/reservation"
            element={
              <PrivateRouter user={user}>
                <BookingPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/test"
            element={
              <PrivateRouter user={user}>
                <Test />
              </PrivateRouter>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/noaccess" element={<NoAccess />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
