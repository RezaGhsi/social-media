import { LoginForm } from "..";

const LoginPage = () => {
  return (
    <div className="flex h-dvh w-dvw justify-between">
      <section className="flex h-full w-[50%] items-center justify-center">
        <LoginForm />
      </section>

      <img
        src="/images/bg.jpg"
        alt="bg-image"
        className="w-[50%]"
        loading="lazy"
      />
    </div>
  );
};

export default LoginPage;
