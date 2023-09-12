import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import noDp from "../../assets/blank.png";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="avatar tooltip tooltip-bottom" data-tip={user?.displayName}>
      <div className="relative w-16 rounded-full transition-transform">
        <img
          src={user?.photoURL || noDp}
          alt="User Profile"
          className="transform hover:scale-125 duration-500"
        />
      </div>
    </div>
  );
};

export default Profile;
