import Link from "next/link";
import SignupComponent from "../components/auth/SignupComponent";
import Layout from "../components/Layout";

const Signup = () => {
  return (
    <Layout>
      <h2 className="text-center mt-3">Sign Up</h2>
      <SignupComponent />
    </Layout>
  );
};

export default Signup;
