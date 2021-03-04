import Link from "next/link";
import Router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth.action";
import { getAllTags } from "../../actions/tag.action";
import { getAllCategories } from "../../actions/category.action";
import { createBlog, updateBlog } from "../../actions/blog.action";
import {
  Col,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const getContent = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("content")) {
      return JSON.parse(localStorage.getItem("content"));
    } else {
      return "";
    }
  } else {
    return "";
  }
};

const BlogCreateForm = (props) => {
  const router = useRouter();

  const [content, setContent] = useState(getContent());
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [tempCate, setTempCate] = useState([]);
  const [tempTag, setTempTag] = useState([]);

  const [checkedCate, setCheckedCate] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);
  const [photo, setPhoto] = useState([]);

  const token = getCookie("token");

  const [values, setValues] = useState({
    error: false,
    sizeError: "",
    success: false,
    hideCreateButton: false,
  });

  useEffect(() => {
    if (props.blog) {
      const { content, title, category, tag } = props.blog;
      setContent(content);
      setTitle(title);
      setCheckedCate(setInitialCate(category));
      setCheckedTag(setInitialTag(tag));
    }
  }, []);

  const setInitialCate = (category) => {
    return category.length > 0 ? category.map((item) => item._id) : [];
  };

  const setInitialTag = (tag) => {
    return tag.length > 0 ? tag.map((item) => item._id) : [];
  };

  const { error, success, sizeError, hideCreateButton } = values;

  const handleChangeQuill = (e) => {
    setContent(e);
    if (typeof window !== "undefined") {
      localStorage.setItem("content", JSON.stringify(e));
    }
  };

  useEffect(() => {
    getInitialCategory();
    getInitialTag();
  }, []);

  const getInitialCategory = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: date.error });
      }

      setCategories(data.category);
    });
  };

  const getInitialTag = () => {
    getAllTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: date.error });
      }
      setTags(data.tag);
    });
  };

  const handleToggleCate = (id) => (e) => {
    // console.log(e.target.checked);
    const indexClickedCate = checkedCate.indexOf(id);

    const allCheckedCate = [...checkedCate];

    if (indexClickedCate === -1) {
      allCheckedCate.push(id);
    } else {
      allCheckedCate.splice(indexClickedCate, 1);
    }

    setCheckedCate(allCheckedCate);
  };

  const handleToggleTag = (id) => (e) => {
    const indexClickedTag = checkedTag.indexOf(id);

    const allCheckedTag = [...checkedTag];

    if (indexClickedTag === -1) {
      allCheckedTag.push(id);
    } else {
      allCheckedTag.splice(indexClickedTag, 1);
    }

    setCheckedTag(allCheckedTag);
    console.log(allCheckedTag);
  };
  console.log(checkedCate);

  const getChecked = (id, array) => {
    const index = array.indexOf(id);

    if (index !== -1) return true;

    return false;
  };

  const handleUploadImage = (e) => {
    setPhoto([...photo, e.target.files[0]]);
  };

  const addNewBlog = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("title", title);
    form.append("content", content);

    for (let img of photo) {
      form.append("photo", img);
    }

    for (let cate of checkedCate) {
      form.append("category", cate);
    }

    for (let tag of checkedTag) {
      form.append("tag", tag);
    }

    if (props.blog) {
      updateBlog(form, props.blog._id).then((data) => {
        if (!data || data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            error: "",
            success: `A new blog ${title} id created`,
          });

          // if (isAuth() && isAuth().role === "admin") {
          //   router.replace(`/admin/crud/${title}`);
          // } else if (isAuth() && isAuth().role === "admin") {
          //   router.replace(`/user/crud/${title}`);
          // }

          setTitle("");
          setContent("");
          setPhoto([]);
          setCheckedTag([]);
          setCheckedCate([]);
          localStorage.removeItem("content");
        }
      });
    } else {
      createBlog(form, token).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            error: "",
            success: `A new blog ${title} id created`,
          });
          setTitle("");
          setContent("");
          setPhoto([]);
          setCheckedTag([]);
          setCheckedCate([]);
          localStorage.removeItem("content");
        }
      });
    }
  };

  const newBlogForm = () => (
    <form onSubmit={addNewBlog}>
      <FormGroup>
        <label className="h5">Title :</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          placeholder="Enter the Category name"
        />
      </FormGroup>

      <FormGroup>
        <label className="h5">Content : </label>
        <ReactQuill
          value={content}
          modules={BlogCreateForm.modules}
          formats={BlogCreateForm.formats}
          placeholder="Write something here"
          onChange={handleChangeQuill}
        />
      </FormGroup>
      <button type="submit" className="btn btn-info">
        {props.blog ? "Update" : "Create"}
      </button>
    </form>
  );

  const showCategories = (categories) => {
    return (
      <ListGroup style={{ maxHeight: "200px", overflowY: "auto" }}>
        {categories &&
          categories.map((cate) => (
            <ListGroupItem key={cate._id} className="pl-4">
              <Input
                onChange={handleToggleCate(cate._id)}
                id={`cate_${cate._id}`}
                type="checkbox"
                style={{ cursor: "pointer" }}
                checked={getChecked(cate._id, checkedCate)}
              />
              <label htmlFor={`cate_${cate._id}`} className="mx-2">
                {cate.name}
              </label>
            </ListGroupItem>
          ))}
      </ListGroup>
    );
  };

  const showTags = (tags) => {
    return (
      <ListGroup style={{ maxHeight: "200px", overflowY: "auto" }}>
        {tags &&
          tags.map((tag) => (
            <ListGroupItem key={tag._id} className="pl-4">
              <Input
                onChange={handleToggleTag(tag._id)}
                id={`tag_${tag._id}`}
                type="checkbox"
                style={{ cursor: "pointer" }}
                checked={getChecked(tag._id, checkedTag)}
              />
              <label htmlFor={`tag_${tag._id}`} className="mx-2">
                {tag.name}
              </label>
            </ListGroupItem>
          ))}
      </ListGroup>
    );
  };

  const showUploadImage = () => {
    return <Input onChange={handleUploadImage} type="file" accept="image/*" />;
  };

  //FIXME use alert or toast to repaire them
  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showSuccess = () =>
    success && <div className="alert alert-success">{success}</div>;

  return (
    <div>
      <Row>
        {showError()}
        {showSuccess()}
      </Row>
      <Row>
        <Col md={8}>{newBlogForm()}</Col>
        <Col md={4}>
          <h5>Upload Image</h5>
          <div>
            {photo.length > 0 &&
              photo.map((img, i) => (
                <p className="text-muted" key={i}>
                  {img.name}
                </p>
              ))}
          </div>
          {showUploadImage()}
          <h5 className="mt-3">Categories :</h5>
          {showCategories(categories)}
          <h5 className="mt-3">Tags :</h5>
          {showTags(tags)}
        </Col>
      </Row>
    </div>
  );
};

BlogCreateForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

BlogCreateForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(BlogCreateForm);
