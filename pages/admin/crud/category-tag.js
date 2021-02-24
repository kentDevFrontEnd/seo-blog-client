import Link from "next/link";
import React from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";
import Layout from "../../../components/Layout";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <Container>
          <Row>
            <Col sm={12}>
              <h2>Manager Categories and Tags</h2>
            </Col>

            <Col md={6} className="mt-3">
              <h3>Category</h3>
              <Category />
            </Col>

            <Col md={6} className="mt-3">
              <h3>Tags</h3>
              <Tag />
            </Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
