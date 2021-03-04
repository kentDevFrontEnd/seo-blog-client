import Link from "next/link";
import React from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import Admin from "../../components/auth/Admin";
import Layout from "../../components/Layout";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <Container className="mt-3">
          <Row>
            <Col sm={12}>
              <h2>Admin Dashboard</h2>
            </Col>

            <Col md={4}>
              <ListGroup>
                <ListGroupItem>
                  <Link href="/admin/crud/category-tag">
                    <a>Manager Categories and Tags</a>
                  </Link>
                </ListGroupItem>

                <ListGroupItem>
                  <Link href="/admin/crud/create-blog">
                    <a>Create a Blog</a>
                  </Link>
                </ListGroupItem>

                <ListGroupItem>
                  <Link href="/admin/crud/blogs">
                    <a>Manager blogs</a>
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={8}></Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
