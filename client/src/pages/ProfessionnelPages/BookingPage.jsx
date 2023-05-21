import { useParams } from "react-router-dom";
import AccountNav from "../../components/Account/AccountNav";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "moment/locale/fr";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../redux/actions/profileActions";
const localizer = momentLocalizer(moment);
moment.locale("fr"); 
export default function BookingPage() {
  const { id } = useParams();
  const dispatch = useDispatch()
  useEffect(async() => {
    await dispatch(await GetProfile());
  }, [])
    const profile = useSelector((state) => state.profiles.profile);
      const [reservationData, setReservationData] = useState({
        start: "",
        end: "",
        title: "",
        professionalId: id,
        clientId:profile._id
      });

     const handleInputChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
     };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
   axios.post("/api/reservations", reservationData);
  };
  const [booking, setBooking] = useState(null);
  
  const events = profile.reservations.map((event) => {
    // new Date(Y, M, D, H, MIN)
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
    };
  });
  return (
    <div className="my-8 mt-64">
      <AccountNav />
      <div className="App" style={{ padding: "14px" }}>
        <Calendar
          localizer={localizer}
          startAccessor={"start"}
          events={events}
          endAccessor={"end"}
          style={{
            height: "500px",
            width: "1000px",
          }}
          eventPropGetter={(event) => {
            return {
              style: {
                backgroundColor: event.color,
              },
            };
          }}
          onSelectEvent={(event) => alert(event.title)}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        />
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          value={reservationData.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="start"
          value={reservationData.start}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="end"
          value={reservationData.end}
          onChange={handleInputChange}
        />
        <button type="submit">Réserver</button>
      </form>
    </div>
  );
}
