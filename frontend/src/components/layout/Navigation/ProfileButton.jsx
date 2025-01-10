import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function ProfileButton({isMobileMenuOpen}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
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
              src="https://images.unsplash.com/photo-1614502875832-77fe801288ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww"
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