import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import noDp from "../../assets/blank.png";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="avatar tooltip tooltip-success" data-tip={user?.displayName}>
      <div className="relative w-16 rounded-full ring ring-green-600 ring-offset-base-100 ring-offset-2 hover:ring-offset-0 hover:ring-offset-transparent hover:ring-4 transition-transform">
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
