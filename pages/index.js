import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <React.Fragment>
        <h2>Hello from next js</h2>

        <Link href="/signin">
          <a>Signin</a>
        </Link>
      </React.Fragment>
    </Layout>
  );
};

export default Index;
