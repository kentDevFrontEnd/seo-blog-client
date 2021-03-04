import Link from "next/link";
import { useState } from "react";
import { Container, Row, Table } from "reactstrap";
import { getAllBlogs, removeBlog } from "../../../actions/blog.action";
import Admin from "../../../components/auth/Admin";
import CustomModal from "../../../components/CustomModal";
import Layout from "../../../components/Layout";

const ManagerBlogs = ({ data }) => {
  const { blogs } = data;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const closeDeleteConfirm = () => {
    setIsOpen(false);
  };

  const deleteConfirm = (id) => {
    console.log(id);

    removeBlog(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // handle update data
        getAllBlogs(page, limit).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setLoadedBlogs([...loadedBlogs, data.blogs]);
          }
        });
      }
    });

    setDeleteItem(null);
  };

  const removeItem = (blog) => {
    setIsOpen(true);
    setDeleteItem(blog);
  };

  console.log(loadedBlogs);

  const showContentOfTableBlogs = (blogs) => {
    return (
      blogs &&
      blogs.length > 0 &&
      blogs.map((blog, index) => (
        <tr key={blog._id}>
          <td>{index + 1}</td>
          <td>
            {blog.photo && blog.photo.length > 0 && (
              <img
                style={{ width: "70px" }}
                src={blog.photo[0].img}
                alt={blog.title}
              />
            )}
          </td>
          <td>{blog.title}</td>
          <td>
            <Link href={`/admin/crud/${blog.slug}`}>
              <a className="btn btn-info mr-2"> Edit</a>
            </Link>

            <button className="btn btn-danger" onClick={() => removeItem(blog)}>
              {" "}
              Remove
            </button>
          </td>
        </tr>
      ))
    );
  };
  return (
    <Layout>
      <Admin>
        <Container>
          <Row className="mt-3">
            <h2>Manager Blogs</h2>
          </Row>
          <Row>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadedBlogs.length > 0
                  ? loadedBlogs.map((item) => showContentOfTableBlogs(item))
                  : showContentOfTableBlogs(blogs)}
              </tbody>
            </Table>
          </Row>
        </Container>
        <CustomModal
          isOpen={isOpen}
          handleClose={closeDeleteConfirm}
          handleConfirm={deleteConfirm}
          className=""
          type="delete"
          blog={deleteItem}
        />
      </Admin>
    </Layout>
  );
};

ManagerBlogs.getInitialProps = async (ctx) => {
  try {
    const page = 1;
    const limit = 10;
    const res = await getAllBlogs(page, limit);

    return { data: res };
  } catch (error) {
    console.log(error);
  }
};

export default ManagerBlogs;
