import Layout from "../components/Layout";
import WelcomeCard from "../components/WelcomeCard";
import LoginForm from './../components/LoginForm'

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center h-dvh">
      <Layout>
        <WelcomeCard title1={"Less scrolling."} title2={"More belonging."} />
        <LoginForm />
      </Layout>
    </div>
  );
};

export default LoginPage;
