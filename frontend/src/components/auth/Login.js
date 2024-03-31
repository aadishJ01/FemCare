import React from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
function Login() {
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        window.location.href="/home";
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <body>
      <div className="loginContainer">
        <div className="login_top"></div>
        <div className="login_bottom"></div>
        <div className="login_center">
          <img className="femcare_login_logo" src='/FemCare.png' alt="FemCare logo" />
          <button onClick={handleSubmit} className="login_btn">
            <img src='/googleLogo.gif' alt="Google" />
            Continue with Google
          </button>
        </div>
      </div>
    </body>
  );
}

export default Login;
