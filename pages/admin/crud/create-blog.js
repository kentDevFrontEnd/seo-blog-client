import React from "react";
import { Col, Container, Row } from "reactstrap";
import Admin from "../../../components/auth/Admin";
import BlogCreateForm from "../../../components/crud/BlogCreateForm";
import Layout from "../../../components/Layout";

const CreateBlog = () => {
  return (
    <Layout>
      <Admin>
        <Container>
          <Row>
            <Col className="mt-3">
              <h2> Create a Blog</h2>
              <BlogCreateForm />
            </Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

export default CreateBlog;
