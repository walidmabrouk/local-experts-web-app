import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../../components/check/AddressLink";
import BookingDates from "../../components/check/BookingDates";
import PlaceGallery from "../../components/check/PlaceGallery";
import AccountNav from "../../components/Account/AccountNav";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
console.log(id)



  return <div className="my-8 mt-64"><AccountNav/></div>;
}
