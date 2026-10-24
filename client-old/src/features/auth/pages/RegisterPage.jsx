import { RegisterForm } from "./../index";

const RegisterPage = () => {
  return (
    <div className="flex h-[100dvh] w-[100dvw] justify-between">
      <section className="flex h-[100%] w-[50%] items-center justify-center">
        <RegisterForm />
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

export default RegisterPage;
