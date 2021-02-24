import React, { useEffect, useState } from "react";
import { Alert, Button, FormGroup, Table } from "reactstrap";
import { getCookie } from "../../actions/auth.action";
import {
  createCategory,
  deleteOneCategory,
  getAllCategories,
} from "../../actions/category.action";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
  });

  const [isEdit, setIsEdit] = useState(false);

  const { name, error, success, categories, removed } = values;

  const token = getCookie("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("crete category", name);

    createCategory({ name }, token)
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
            categories: [],
            success: true,
            removed: false,
          });
        }
      })
      .then(getCategories());
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
    getCategories();
  }, []);

  const getCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          categories: [],
          success: false,
          removed: false,
        });
      }

      setValues({
        ...values,
        error: false,
        categories: data.category,
        success: true,
        removed: false,
      });
    });
  };

  const handleEdit = (id) => {
    setIsEdit(true);

    let cate = categories.find((cate) => cate._id == id);
    setValues({ ...values, name: cate.name, removed: false });
  };

  const handleDelete = (id) => {
    let answer = window.confirm("Are you want to delete this category?");
    if (answer) {
      deleteOneCategory(id, token)
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
        .then(getCategories());
    }
  };

  const viewCategory = (id) => {};

  console.log(values);

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <input
          className="form-control"
          type="text"
          onChange={handleChange}
          value={name}
          required
          placeholder="Enter the Category name"
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

  const showCategory = (categories) => {
    return (
      <Table hover striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((cate, index) => (
              <tr key={cate._id}>
                <td>{index + 1}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => viewCategory(cate._id)}
                >
                  {cate.name}
                </td>
                <td>
                  <Button color="info" onClick={() => handleEdit(cate._id)}>
                    Edit
                  </Button>
                  <Button
                    className="ml-2"
                    color="danger"
                    onClick={() => handleDelete(cate._id)}
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
      {newCategoryForm()}
      {showCategory(categories)}
    </React.Fragment>
  );
};

export default Category;
