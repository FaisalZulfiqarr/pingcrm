import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff1f2] px-4 text-center">
      <img
        src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7903.jpg"
        alt="404 Not Found"
        className="w-80 mb-6"
      />
      <h1 className="text-5xl font-bold text-[#be185d] mb-2">Page Not Found</h1>
      <p className="text-[#6b7280] text-lg mb-6">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/organizations")}
          className="px-6 py-2 rounded-full bg-[#ec4899] text-white hover:bg-[#db2777] transition"
        >
          Go to Organizatons
        </button>
        <button
          onClick={() => navigate("/contacts")}
          className="px-9 py-2 rounded-full bg-[#ec4899] text-white hover:bg-[#db2777] transition"
        >
          Go to Contacts
        </button>
      </div>
    </div>
  );
};

export default NotFound;
