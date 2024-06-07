import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import noDp from "../../assets/blank.png";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="avatar tooltip tooltip-bottom" data-tip={user?.name}>
      <div className="relative w-16 rounded-full transition-transform">
        <img
          src={user?.photoURL || noDp}
          alt="User Profile"
          className="transform hover:scale-110 duration-500 ring ring-red-500 ring-offset-white ring-offset-2"
        />


      </div>
    </div>
  );
};

export default Profile;
