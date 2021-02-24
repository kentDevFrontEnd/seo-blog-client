import React from "react";
import Private from "../../components/auth/Private";
import Layout from "../../components/Layout";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <h2>Hello User dashboard</h2>
      </Private>
    </Layout>
  );
};

export default UserIndex;
