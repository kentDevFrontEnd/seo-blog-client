import React, { useEffect, useState } from "react";
import { Alert, Button, FormGroup, Table } from "reactstrap";
import { getCookie } from "../../actions/auth.action";
import { createTag, deleteOneTag, getAllTags } from "../../actions/tag.action";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
  });

  const [isEdit, setIsEdit] = useState(false);

  const { name, error, success, tags, removed } = values;

  const token = getCookie("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("crete Tag", name);

    createTag({ name }, token)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            removed: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            error: false,
            tags: [],
            success: true,
            removed: false,
          });
        }
      })
      .then(getTags());
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  // FIXME how life cycle of next => do not appear once
  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    getAllTags().then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          tags: [],
          success: false,
          removed: false,
        });
      }

      setValues({
        ...values,
        error: false,
        tags: data.tag,
        success: true,
        removed: false,
      });
    });
  };

  const handleEdit = (id) => {
    setIsEdit(true);

    let cate = tags.find((cate) => cate._id == id);
    setValues({ ...values, name: cate.name, removed: false });
  };

  const handleDelete = (id) => {
    let answer = window.confirm("Are you want to delete this Tag?");
    if (answer) {
      deleteOneTag(id, token)
        .then((data) => {
          if (data.error) {
            setValues({
              ...values,
              error: data.error,
              success: false,
              name: "",
            });
          } else {
            setValues({
              ...values,
              error: false,
              success: false,
              name: "",
              removed: true,
            });
          }
        })
        .then(getTags());
    }
  };

  const viewTag = (id) => {};

  console.log(values);

  const newTagForm = () => (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <input
          className="form-control"
          type="text"
          onChange={handleChange}
          value={name}
          required
          placeholder="Enter the Tag name"
        />
      </FormGroup>
      <button type="submit" className="btn btn-success">
        Create
      </button>
    </form>
  );

  const showError = () => {
    return error && <div className="alert alert-warning">{error}</div>;
  };

  // const showMessage = () => {
  //   return message && <div className="alert alert-info">{message}</div>;
  // };

  const showTag = (tags) => {
    return (
      <Table hover striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Tag Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tags &&
            tags.map((tag, index) => (
              <tr key={tag._id}>
                <td>{index + 1}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => viewTag(tag._id)}
                >
                  {tag.name}
                </td>
                <td>
                  <Button color="info" onClick={() => handleEdit(tag._id)}>
                    Edit
                  </Button>
                  <Button
                    className="ml-2"
                    color="danger"
                    onClick={() => handleDelete(tag._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {newTagForm()}
      {showTag(tags)}
    </React.Fragment>
  );
};

export default Tag;
