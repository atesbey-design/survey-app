"use client";
import Backend from "@/data/Backend";
import { Signin } from "@/data/BackendTypes";
import { getCookie, deleteCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [userId, setUserId] = useState<any>(null);
  const [user, setUser] = useState<Signin>();

  async function handleLogout() {
    try {
      const token = getCookie("survey::credentials") as any;
      if (!token) {
        return;
      }
      await Backend.User.signout(token);
      deleteCookie("survey::credentials");
      window.location.href = "/signin";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("survey::credentials") as any;
        if (!token) {
          return;
        }

        const userIdData = await Backend.User.session(token);
        setUserId(userIdData.data.id);

        if (userIdData.data.id) {
          const userData = await Backend.User.getUser(userIdData.data.id);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>header</div>
      <div>{userId}</div>
      <div>{user?.email}</div>
      <button
        className="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
      "
        onClick={handleLogout}
      >
        Signout
      </button>
    </div>
  );
};
export default Header;
