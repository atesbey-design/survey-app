"use client";
import GenericInput from "@/components/LoginInput";
import LoginInput from "@/components/LoginInput";
import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setCookie } from "cookies-next";
import Backend from "@/data/Backend";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signin } from "@/data/BackendTypes";

const Auth: React.FC<any> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authData, setAuthData] = useState<Signin>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleFormSubmit = async (props: Signin) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    Backend.User.signin(props)
      .then(async (res: any) => {
        setCookie("survey::credentials", res.credentials, {
          path: "/",
        });
        toast("Giriş başarılı");
        router.replace("/");
      })
      .catch((err: any) => {
        console.log(err);
        toast("Giriş başarısız");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleAction = () => {
    if (isLogin) {
      if (username && password) {
        const signInData: Signin = {
          email: username,
          password: password,
        };

        handleFormSubmit(signInData);
      } else {
        alert("Lütfen kullanıcı adı ve şifreyi girin.");
      }
    } else {
      if (username && password && confirmPassword && isPasswordMatch) {
        const signUpData: any = {
          username: username,
          password: password,
          email: username,
        };

        Backend.User.signup(signUpData)
          .then((res: any) => {
            const signInData: Signin = {
              email: username,
              password: password,
            };
            handleFormSubmit(signInData);
          })
          .catch((err: any) => {
            console.log(err);
            toast("Kayıt başarısız");
          });
      } else {
        alert(
          "Lütfen geçerli bir kullanıcı adı, şifre ve şifre tekrarı girin."
        );
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "confirmPassword" && value !== undefined) {
      setConfirmPassword(value);
      setIsPasswordMatch(value === password);
    }

    setAuthData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-[400px]  items-center gap-10 w-full max-w-sm px-4 py-8  bg-slate-900 rounded-lg shadow-lg">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        hideProgressBar={false}
      />
      <h2>{isLogin ? "Giriş Formu" : "Kayıt Formu"}</h2>

      <div className="w-full">
        <GenericInput
          label="Your Email"
          id=""
          placeholder="E-mail"
          icon={<CiMail />}
          onChange={(value: string) => {
            setUsername(value);
            handleInputChange({
              target: { name: "email", value },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
        />
        <GenericInput
          label="Şifre"
          id=""
          inputType={isPasswordVisible ? "text" : "password"}
          placeholder="Şifre"
          onIconClick={togglePasswordVisibility}
          icon={
            isPasswordVisible ? (
              <FiEyeOff className="cursor-pointer" />
            ) : (
              <FiEye className="cursor-pointer" />
            )
          }
          onChange={(value: string) => {
            setPassword(value);
            handleInputChange({
              target: { name: "password", value },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
        />
        {!isLogin && (
          <GenericInput
            label="Şifre Tekrarı"
            id=""
            inputType={isPasswordVisible ? "text" : "password"}
            placeholder="Şifre Tekrarı"
            onIconClick={togglePasswordVisibility}
            icon={isPasswordVisible ? <FiEyeOff /> : <FiEye />}
            value={confirmPassword}
            onChange={(value: string) => {
              setConfirmPassword(value);
              handleInputChange({
                target: { name: "confirmPassword", value },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          />
        )}
      </div>

      <div className="flex flex-col w-full gap-5 items-center">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleAction}
        >
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </button>

        {isLogin ? (
          <p>
            Hesabınız yok mu?
            <span
              className="text-blue-500 px-1 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              Kayıt
            </span>
            olmak için tıklayın.
          </p>
        ) : (
          <p>
            Hesabınız var mı?
            <span
              className="text-blue-500 px-1 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              Giriş
            </span>
            yapmak için tıklayın.
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
