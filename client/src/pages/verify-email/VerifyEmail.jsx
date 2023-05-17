import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../../redux/actions/authActions";
function VerifyEmail() {
  const dispatch = useDispatch();

  const { isEmailVerified } = useSelector((state) => state.auth);
const {userId , token} = useParams()
    useEffect(() => {
      dispatch(verifyEmail(userId, token));
    }, [userId, token]);

  return (
    <div style={{ margin: "15%" }}>
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon "></i>
          <h1 className="verify-email-title">
            Your email address has been succesfully verified
          </h1>
          <Link to="/login"> Go to Login Page</Link>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">Not Found</h1>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
