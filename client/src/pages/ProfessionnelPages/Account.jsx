import React, { useEffect, useState } from "react";
import AccountNav from "../../components/Account/AccountNav";
import Carrousel from "../../components/Account/Carrousel";
import Example from "../../components/Account/Example";
import SimpleMap from "../../components/SimpleMap";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProfile, GetProfile, GetProfiles } from "../../redux/actions/profileActions";
import AVATARIMG from "../../assets/media/User-avatar.svg.png";
import { Link, useParams } from "react-router-dom";
import { fetchPosts } from "../../redux/actions/postActions";
import { Logout } from "../../redux/actions/authActions";
import RatingStars from "../../components/Account/RatingStars";
import axios from "axios";
function Account() {
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(await GetProfile());
    await dispatch(await GetProfiles());
    await dispatch(await fetchPosts());
  }, []);
 
  const userProfile = useSelector((state) => state.profiles.profile);
  const profile = useSelector((state) =>
    state.profiles.profiles.filter( (profile) => id === profile._id)
  )[0];
  const posts = useSelector((state) => state.posts.posts);
  const profilePosts = posts?.filter((post) => post.user._id === profile.user._id)
  const SlicedProfilePosts = profilePosts.slice(0,2)
  const deleteProfileHandle = () => {
    dispatch(DeleteProfile(profile._id) )
    dispatch( Logout() )
  }

  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmitRating = () => {
    console.log(rating)
     axios.put(`/api/professionals/${id}/rating`,  {rating} );
  };
  return (
    <div className="h-fit w-full mt-72 lg:mt-32">
      <AccountNav />
      <RatingStars initialValue={rating} onRatingChange={handleRatingChange} />
      <button onClick={handleSubmitRating}>Soumettre la notation</button>
      <div className="div-img-profile">
        <Link to={"/"}>
          <img
            alt="publisher profile picture"
            src={profile ? profile.profilePhoto?.url : AVATARIMG}
            decoding="async"
            data-nimg={1}
            loading="lazy"
            style={{ color: "transparent" }}
            className="img-profile"
          />
        </Link>
      </div>

      <div className="scrolling-nav">
        <nav class="main-navbarr">
          <div class="container">
            <ul class="main-nav__list">
              <li class="main__item ">
                <a href="#PHOTOS" class="main__link active">
                  PHOTOS
                </a>
              </li>
              <li class="main__item">
                <a href="#DESCRIPTION" class="main__link ">
                  DESCRIPTION
                </a>
              </li>
              <li class="main-__item">
                <a href="#CALENDRIER" class="main__link">
                  CALENDRIER
                </a>
              </li>
              <li class="main-__item">
                <a href="#POSTS" class="main__link">
                  POSTS
                </a>
              </li>
              <li class="main-__item">
                <a href="#MAP" class="main__link">
                  MAP
                </a>
              </li>
              <li class="main-__item">
                <a href="#AVIS" class="main__link">
                  AVIS
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="profile">
        <div
          className="grid grid-cols-4 gap-x-2 mt-10 pr-12 md:pr-16"
          tabIndex={0}
        >
          <div className="col-span-6 pl-32 md:pl-32 pr-6 lg:pl-6 ">
            <div>
              <h1 className=" font-bold text-2xl font-arabic title">
                {profile?.user?.name}
              </h1>
              <Link to="/modifyaccount">
                <button class="btn btn-white Favorite gap-2 ">
                  Modifier votre compte
                </button>
              </Link>
              <div className="mt-4">
                <data
                  value={0}
                  className="text-red-600 font-bold font-arabic text-2xl"
                />
              </div>
              <div className="flex justify-between items-center mt-5 mb-8">
                <span className="text-2xs font-light text-gray-700">
                  <div className="flex items-center  mb-4">
                    <button class="btn btn-white Favorite gap-2 ">
                      <svg
                        class="w-6 h-6"
                        viewBox="0 0 512 512"
                        stroke-width="1.5"
                        width="48"
                        height="69"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />{" "}
                      </svg>
                      <span class="btn-text">Ajouter aux favourites</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 20 20"
                      height={12}
                      width={12}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span className>{profile?.category}</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-1">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 20 20"
                      height={12}
                      width={12}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className>{profile?.city}</span>
                  </div>
                </span>
              </div>
            </div>
            <div className="h-[1px] w-full bg-gray-300 mt-7 mb-4 undefined" />
            <section id="DESCRIPTION">
              <h2 className="text-gray-700 font-medium text-xl mb-4">
                DESCRIPTION
              </h2>
              <p
                dir="auto"
                className="text-sm text-gray-700 font-arabic whitespace-pre-wrap line-clamp-3"
              >
                {profile?.bio}
              </p>
            </section>
            <section id="PHOTOS">
              <div className="h-[1px] w-full bg-gray-300 mt-7 mb-4 undefined" />
              <h2 className="text-gray-700 font-medium text-xl mb-4">PHOTOS</h2>
              <Carrousel />
            </section>

            <section id="CALENDRIER">
              <div className="h-[1px] w-full bg-gray-300 mt-7 mb-4 undefined" />
              <h2 className="text-gray-700 font-medium text-xl mb-4">
                CALENDRIER
              </h2>
              <Example />
            </section>
            <section id="POSTS">
              <div className="h-[1px] w-full bg-gray-300 mt-7 mb-4 undefined" />
              <h2 className="text-gray-700 font-medium text-xl mb-4">POSTS</h2>
              <div className=" pl-32 md:pl-32 pr-6 lg:pl-6 post-item-profile">
                {SlicedProfilePosts.map((post) => (
                  <div>
                    <div className="post-item-image-wrapper">
                      <img
                        src={post?.image.url}
                        alt=""
                        className="post-itme-image"
                      />
                    </div>
                    <div className="post-item-info-wrapper">
                      <div className="post-item-info">
                        <div className="post-item-author">
                          <strong>Author: </strong>
                          <Link to="/profile/1">
                            <span>{post?.user.name}</span>
                          </Link>
                        </div>
                        <div className="post-itme-date">
                          {new Date(post?.createdAt).toDateString()}
                        </div>
                      </div>
                      <div className="post-item-details">
                        <h4 className="post-item-title">{post?.title}</h4>
                        <Link
                          className="post-item-category"
                          to={`/posts/categories/${post?.category}`}
                        ></Link>
                      </div>
                      <p className="post-item-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quaerat natus delectus blanditiis accusamus. Fugit vitae
                        odit accusamus, error nobis debitis, rerum ex saepe
                        quisquam rem qui sint deserunt
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {profile?.Localisation?.longitude &&
            profile?.Localisation?.latitude ? (
              <section id="MAP">
                <div className="h-[1px] w-full bg-gray-300 mt-7 mb-4 undefined" />
                <h2 className="text-gray-700 font-medium text-xl mb-4">MAP</h2>
                <div style={{ padding: "36px", "padding-left": "20%" }}>
                  <SimpleMap
                    longitude={
                      profile?.Localisation?.longitude
                        ? profile?.Localisation?.longitude
                        : 0
                    }
                    latitude={
                      profile?.Localisation?.latitude
                        ? profile?.Localisation?.latitude
                        : 0
                    }
                  />
                </div>
              </section>
            ) : null}

            <section id="AVIS">
              <div className="h-[1px] w-full bg-gray-300 mt-7 mb-4 undefined" />
              <h2 className="text-gray-700 font-medium text-xl mb-4">AVIS</h2>
            </section>
            <section id="testimonials">
              <div class="testimonial-box-container block">
                <div class="testimonial-box">
                  <div class="box-top">
                    <div class="profile-review">
                      <div class="profile-img">
                        <img src="images/c-1.jpg" />
                      </div>
                      <div class="name-user">
                        <strong>Touseeq Ijaz</strong>
                        <span>@touseeqijazweb</span>
                      </div>
                    </div>
                    <div class="reviews">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </div>
                  </div>
                  <div class="client-comment">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem, quaerat quis? Provident temporibus
                      architecto asperiores nobis maiores nisi a. Quae doloribus
                      ipsum aliquam tenetur voluptates incidunt blanditiis sed
                      atque cumque.
                    </p>
                  </div>
                </div>{" "}
                <div class="testimonial-box">
                  <div class="box-top">
                    <div class="profile-review">
                      <div class="profile-img">
                        <img src="images/c-1.jpg" />
                      </div>
                      <div class="name-user">
                        <strong>Touseeq Ijaz</strong>
                        <span>@touseeqijazweb</span>
                      </div>
                    </div>
                    <div class="reviews">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </div>
                  </div>
                  <div class="client-comment">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem, quaerat quis? Provident temporibus
                      architecto asperiores nobis maiores nisi a. Quae doloribus
                      ipsum aliquam tenetur voluptates incidunt blanditiis sed
                      atque cumque.
                    </p>
                  </div>
                </div>{" "}
                <div class="testimonial-box">
                  <div class="box-top">
                    <div class="profile-review">
                      <div class="profile-img">
                        <img src="images/c-1.jpg" />
                      </div>
                      <div class="name-user">
                        <strong>Touseeq Ijaz</strong>
                        <span>@touseeqijazweb</span>
                      </div>
                    </div>
                    <div class="reviews">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </div>
                  </div>
                  <div class="client-comment">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem, quaerat quis? Provident temporibus
                      architecto asperiores nobis maiores nisi a. Quae doloribus
                      ipsum aliquam tenetur voluptates incidunt blanditiis sed
                      atque cumque.
                    </p>
                  </div>
                </div>{" "}
                <div class="testimonial-box">
                  <div class="box-top">
                    <div class="profile-review">
                      <div class="profile-img">
                        <img src="images/c-1.jpg" />
                      </div>
                      <div class="name-user">
                        <strong>Touseeq Ijaz</strong>
                        <span>@touseeqijazweb</span>
                      </div>
                    </div>
                    <div class="reviews">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </div>
                  </div>
                  <div class="client-comment">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem, quaerat quis? Provident temporibus
                      architecto asperiores nobis maiores nisi a. Quae doloribus
                      ipsum aliquam tenetur voluptates incidunt blanditiis sed
                      atque cumque.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="flex flex-col col-span-6 md:col-[none] gap-y-6 pt-3">
            <div style={{ position: "sticky", top: "139px" }}>
              <a href="/fr/user/18d48d42-5aa0-4bc6-9350-e16127edf731/">
                <div className="max-w-full md:max-w-2xs card w-full rounded-md flex flex-row md:flex-col py-3 md:py-6  md:px-4 bg-gradient-to-b from-gray-200 to-gray-100 border-gray-200 border">
                  <div className="flex flex-col justify-between min-h-[100px]">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-center mx-auto transition-transform active:scale-90">
                        <div className="avatar relative">
                          <div className="mask mask-squircle absolute left-[-1px] top-[-1px] w-[92px] bg-white" />
                          <div className="mask mask-squircle w-[90px]">
                            <img
                              alt="publisher profile picture"
                              src={
                                profile ? profile?.profilePhoto?.url : AVATARIMG
                              }
                              width={90}
                              height={90}
                              decoding="async"
                              data-nimg={1}
                              className="w-full"
                              loading="lazy"
                              style={{ color: "transparent" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-col hidden md:flex mt-3 items-center">
                      <div>
                        <span className="text-sm font-semibold capitalize text-gray-700">
                          {profile?.user?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-gray-300 mt-7 mb-4 hidden md:block" />
                  <div className="w-[1px] h-[30px] max-h-full bg-neutral-300 mx-4 block md:hidden h-[120px]" />
                  <span className="text-2xs font-light text-gray-500">
                    <div className="flex-col flex md:hidden mb-3">
                      <span className="text-sm font-semibold text-gray-700 capitalize">
                        king of phones tunis
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mb-1 text-gray-600">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 20 20"
                        height={12}
                        width={12}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                      <span className>3 annonce(s)</span>
                    </div>
                  </span>
                </div>{" "}
              </a>
              <div className="flex flex-col gap-y-2">
                <button
                  aria-label="Chat avec vendeur"
                  className="btn normal-case font-bold border-none rounded-lg bg-blue-100 text-blue-500 font-medium border-none hover:bg-blue-100 w-max !w-full"
                >
                  <span className="flex h-full w-full items-center justify-center gap-x-2 gap-y-[2.5px] flex-row">
                    <span className="ml-0 mr-0">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M144 464a16 16 0 01-16-16v-64h-24a72.08 72.08 0 01-72-72V120a72.08 72.08 0 0172-72h304a72.08 72.08 0 0172 72v192a72.08 72.08 0 01-72 72H245.74l-91.49 76.29A16.05 16.05 0 01144 464z" />
                      </svg>
                    </span>
                    <span className="flex align-middle">
                      Chat avec le professionnel
                    </span>
                  </span>
                </button>
                <span className="lg:block">
                  <button
                    aria-label="Afficher numéro"
                    className="btn normal-case font-bold border-none rounded-lg bg-blue-100 text-blue-500 font-medium border-none hover:bg-blue-100 w-max !w-full"
                  >
                    <span className="flex h-full w-full items-center justify-center gap-x-2 gap-y-[2.5px] flex-row">
                      <span className="ml-0 mr-0">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                          />
                        </svg>
                      </span>
                      <span className="flex align-middle">
                        Afficher le numéro
                      </span>
                    </span>
                  </button>
                </span>
              </div>
              <button
                aria-label="Signaler l'annonce"
                className="btn normal-case font-bold border-none rounded-lg bg-blue-100 text-blue-500 font-medium border-none hover:bg-blue-100 w-max !w-full !text-red-400 !bg-red-50 hover:!text-error mt-2"
              >
                <span className="flex h-full w-full items-center justify-center gap-x-2 gap-y-[2.5px] flex-row">
                  <span className="ml-0 mr-0">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      version="1.2"
                      baseProfile="tiny"
                      viewBox="0 0 24 24"
                      height={18}
                      width={18}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21.171 15.398l-5.912-9.854c-.776-1.293-1.963-2.033-3.259-2.033s-2.483.74-3.259 2.031l-5.912 9.856c-.786 1.309-.872 2.705-.235 3.83.636 1.126 1.878 1.772 3.406 1.772h12c1.528 0 2.77-.646 3.406-1.771.637-1.125.551-2.521-.235-3.831zm-9.171 2.151c-.854 0-1.55-.695-1.55-1.549 0-.855.695-1.551 1.55-1.551s1.55.696 1.55 1.551c0 .854-.696 1.549-1.55 1.549zm1.633-7.424c-.011.031-1.401 3.468-1.401 3.468-.038.094-.13.156-.231.156s-.193-.062-.231-.156l-1.391-3.438c-.09-.233-.129-.443-.129-.655 0-.965.785-1.75 1.75-1.75s1.75.785 1.75 1.75c0 .212-.039.422-.117.625z" />
                    </svg>
                  </span>
                  <span className="flex align-middle">Signaler ce profile</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="text-right mt-8 mr-8 " style={{ marginRight: "3%" }}>
          <button
            onClick={deleteProfileHandle}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            delete profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
