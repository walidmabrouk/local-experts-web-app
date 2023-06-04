import { useParams } from "react-router-dom";

import AccountNav from "../../components/Account/AccountNav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile, GetProfiles } from "../../redux/actions/profileActions";
import Card from "../../components/Card";
import "./Favorites.css";
export default function FavoritePage() {
    const dispatch = useDispatch();
 const responsive = {
   desktop: {
     breakpoint: { max: 3000, min: 1024 },
     items: 5,
     slidesToSlide: 2, // optional, default to 1.
   },
   tablet: {
     breakpoint: { max: 1024, min: 464 },
     items: 2,
     slidesToSlide: 2, // optional, default to 1.
   },
   mobile: {
     breakpoint: { max: 464, min: 0 },
     items: 1,
     slidesToSlide: 1, // optional, default to 1.
   },
 };
  const { id } = useParams();
useEffect(async() => {
      await dispatch(GetProfile());
}, []);
    const profile = useSelector((state) => state.profiles.profile);

  return (
    <div className="my-8 mt-64">
      <AccountNav />
      <div>
        <h1 id="titlfav">Liste des favorites</h1>
        <div className="flex favorie-box" id="favcontent" >
     
            {profile?.favorites?.map((profile) => (
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
  );
}
