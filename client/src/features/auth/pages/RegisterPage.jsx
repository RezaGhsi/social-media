import Layout from "../components/Layout";
import { RegisterForm } from "../index";
import WelcomeCard from "../components/WelcomeCard";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center h-dvh">
      <Layout>
        <WelcomeCard title1={"Your world."} title2={"A little closer."} className="lg:h-200" />
        <RegisterForm />
      </Layout>
    </div>
  );
};

export default RegisterPage;
