import React from "react";
import { LoginForm } from "..";

const LoginPage = () => {
  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-between ">
      <section className="w-[50%] h-[100%] flex justify-center items-center ">
        <LoginForm />
      </section>

      <img
        src="/images/bg.jpg"
        alt="bg-image"
        className="w-[50%] "
        loading="lazy"
      />
    </div>
  );
};

export default LoginPage;
