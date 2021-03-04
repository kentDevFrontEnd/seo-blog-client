import { Col, Container, Row } from "reactstrap";
import { getOneBlog } from "../../../actions/blog.action";
import Admin from "../../../components/auth/Admin";
import BlogCreateForm from "../../../components/crud/BlogCreateForm";
import Layout from "../../../components/Layout";

const EditBlog = ({ data }) => {
  const { blog } = data;

  return (
    <Layout>
      <Admin>
        <Container>
          <Row>
            <Col className="mt-3">
              <h2>Edit a Blog</h2>
              <BlogCreateForm blog={blog} />
            </Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

EditBlog.getInitialProps = async (ctx) => {
  try {
    console.log(ctx.query);
    const { editSlug } = ctx.query;
    const res = await getOneBlog(editSlug);

    // console.log(res);
    return { data: res };
  } catch (error) {
    console.log(error);
  }
};

export default EditBlog;
