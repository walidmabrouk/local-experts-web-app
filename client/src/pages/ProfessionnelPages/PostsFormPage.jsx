import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../../components/Account/AccountNav.jsx";
import {Navigate, useParams} from "react-router-dom";
import PhotosUploader from "../../components/check/PhotosUploader.jsx";

export default function PostsFormPage({props}) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  //* lorsque il y a un id
  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/posts/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
console.log(props.user.id)
  async function savePost(ev) {
    ev.preventDefault();
    const postData = {
      title,
      address,
      addedPhotos,
      description,
      extraInfo,
      price,
    };
    if (id) {
      // update
      await axios.put("/posts", {
        id,
        ...postData,
      });
      setRedirect(true);
    } else {
      // new post
      await axios.post("/posts", postData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/posts"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePost}>
        {preInput("Titre", "Titre de votre site doit être court.")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Titre, for example: Je cherche un .."
        />
        {preInput("Localisation", "Votre localisation")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Mahdia,Tunisie"
        />
        {preInput("Photos", "")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "La description du service")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Extra info", "disponibilité, les règles, etc")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput("Prix", "")}
        <h3 className="mt-2 -mb-1">prix par jour</h3>
        <input
          type="number"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}