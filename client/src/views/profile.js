import React from "react";
import AuthService from "../services/auth.service";
import Speakers from "../components/Speakers";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div>
      <header>
        <h3>
          <strong>{currentUser?.first_name}</strong> Profile
        </h3>
      </header>
      <p>
        {/* <strong>Token:</strong> {currentUser?.token.substring(0, 20)} ...{" "} */}
        {/* {currentUser?.token.substr(currentUser?.token.length - 20)} */}
      </p>
      <p>
        <strong>Id:</strong> {currentUser?._id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser?.email}
      </p>
      <Speakers email={currentUser?.email} />
    </div>
  );
};

export default Profile;
