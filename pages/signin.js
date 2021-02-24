import Layout from "../components/Layout";
import Link from "next/link";
import SigninComponent from "../components/auth/SigninComponent";

const Signin = () => {
  return (
    <Layout>
      <h2 className="text-center mt-3">Sign In</h2>
      <SigninComponent />
    </Layout>
  );
};

export default Signin;
