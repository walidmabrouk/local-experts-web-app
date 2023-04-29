import React, { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import Classnames from "classnames";
import { AddProfile, GetProfile } from "../../redux/actions/profileActions";
import AccountNav from "../../components/Account/AccountNav";
function Profile() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const profiles = useSelector((state) => state.profiles);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(AddProfile(form, setShow, setMessage));
  };

  useEffect(async () => {
    await dispatch(GetProfile());
    setForm(profiles.profile);
  }, []);
  return (
    <div>
      <AccountNav />

      <div
        class="alert alert-success"
        role="alert"
        style={{ display: show ? "block" : "none" }}
      >
        {message}
      </div>

      <div className="row justify-content-evenly mt-4">
        <div className="col-lg-6 col-md-12 mt-4">
          <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Profile</h2>
          </div>
          <div
            className="p-6 shadow-lg mb-5 bg-body rounded"
            style={{ backgroundColor: "white" }}
          >
            <form onSubmit={onSubmit}>
              <Inputs
                name="category"
                label="category"
                value={form && form.category ? form.category : ""}
                type="text"
                onChangeHandler={onChangeHandler}
                errors={errors.category}
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
              <div className=" mb-3">
                <label className="form-label">Address</label>
                <div className="input-group">
                  <textarea
                    type="text"
                    className={Classnames("form-control", {
                      "is-invalid": errors.address,
                    })}
                    name="address"
                    onChange={onChangeHandler}
                    value={form && form.address ? form.address : ""}
                  ></textarea>
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary">
                  save <i className="fa-solid fa-floppy-disk"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
