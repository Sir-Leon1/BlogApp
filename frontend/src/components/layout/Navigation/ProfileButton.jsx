import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {user} from "../../../services/userApi.js";

function ProfileButton({isMobileMenuOpen}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("./profilephoto.png");


  useEffect( () => {
    const userId = localStorage.getItem("userId");
    async function fetchUser()
    {
      const response = await user(userId);
      if (response.status === 200) {
        setUsername(response.data.username);
        setImage(response.data.image);
      }
    }
    fetchUser();
  }, []);

  const handleClick = () => {
    navigate("/profile");
  }
  return (
    <>
      <div className="relative">
        <button
          onClick={handleClick}
          className="px-4 py-2 w-full border border-white rounded-l-full  hover:bg-gray-500
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div className={`flex ${isMobileMenuOpen ? "py-2" : "flex-col"} items-center space-x-2 cursor-pointer`}>
            <img
              src={image}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-white">
                                {username}

                            </span>
          </div>

        </button>
      </div>
    </>
  );
};

export default ProfileButton;