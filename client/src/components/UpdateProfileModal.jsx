import "./Update-profile-modal.css";
import { useDispatch, useSelector } from "react-redux";
import Classnames from "classnames";
import { AddProfile, GetProfile } from "../redux/actions/profileActions";

import { Switch } from "antd";

import React, { useEffect, useState } from "react";
import Inputs from "./Inputs";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfileModal = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [localisation, setLocalisation] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const profiles = useSelector((state) => state.profiles);
  const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
      const [updateProfile, setUpdateProfile] = useState(false);
    const [file, setFile] = useState(null);
      const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!file) return toast.warning("there is no file!");

        console.log("image uploaded");
      };
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(AddProfile(form, setShow, setMessage));
    setTimeout(() => {
      navigate("/account");
    }, 2500);
    
  };
  function onChange(checked, e) {
    if (`${checked}` === "true") {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocalisation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      setLocalisation({
        latitude: null,
        longitude: null,
      });
    }
    setForm({
      ...form,
      Localisation: localisation,
    });
    console.log(form);
    }
    
    function uploadProfilePhoto(newPhoto) {
        return async () => {
            try {
                const { data } = await axios.post(
                  "/api/profile/Profile-photo-upload",
                  newPhoto
                );
            } catch (error) {
                
            }
        }
    }

  useEffect(async () => {
    await dispatch(GetProfile());
    setForm(profiles.profile);
  }, []);

  return (
    <div className="update-profile">
      <div
        class="alert alert-success"
        role="alert"
        style={{ display: show ? "block" : "none" }}
      >
        {message}
      </div>
      <div>
        <form className="update-profile-form " onSubmit={onSubmit}>
          <Inputs
            name="category"
            label="category"
            value={form && form.category ? form.category : ""}
            type="text"
            onChangeHandler={onChangeHandler}
            errors={errors.category}
          />
          <label>Localisation </label>
          <Switch
            name="Localisation"
            defaultChecked={false}
            onChange={onChange}
            style={{ width: "0px" }}
          />
          <Inputs
            name="tel"
            label="tel"
            value={form && form.tel ? form.tel : ""}
            type="text"
            onChangeHandler={onChangeHandler}
            errors={errors.tel}
          />
          <Inputs
            name="price"
            label="price"
            value={form && form.price ? form.price : ""}
            type="number"
            onChangeHandler={onChangeHandler}
            errors={errors.price}
          />
          <Inputs
            name="city"
            label="City"
            value={form && form.city ? form.city : ""}
            type="text"
            onChangeHandler={onChangeHandler}
            errors={errors.city}
          />
          <Inputs
            name="bio"
            label="bio"
            type="text"
            value={form && form.bio ? form.bio : ""}
            onChangeHandler={onChangeHandler}
            errors={errors.bio}
          />
          <Inputs
            name="postalcode"
            label="PostalCode"
            value={form && form.postalcode ? form.postalcode : ""}
            type="text"
            onChangeHandler={onChangeHandler}
            errors={errors.postalcode}
          />
          <Inputs
            name="extraInfo"
            label="extraInfo"
            value={form && form.extraInfo ? form.extraInfo : ""}
            type="text"
            onChangeHandler={onChangeHandler}
            errors={errors.extraInfo}
          />
          <Inputs
            name="address"
            label="Address"
            value={form && form.address ? form.address : ""}
            type="text"
            onChangeHandler={onChangeHandler}
            errors={errors.address}
          />
          <div
            className="flex "
            style={{ "padding-left": "65%", "margin-top": "30px" }}
          >
            <button className="Annuler">Annuler</button>
            <button type="submit" className="submit">
              Update profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
