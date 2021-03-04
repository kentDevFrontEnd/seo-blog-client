import React, { useState } from "react";
import { getBlogsWithSearchTerm } from "../../actions/blog.action";

function Search({ handleSearch }) {
  const [term, setTerm] = useState(undefined);
  const [values, setValues] = useState({
    result: [],
    searched: false,
    message: "",
  });

  const { result, searched, message } = values;

  const handleChangeSearch = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const tempTerm = { q: term };

    handleSearch(tempTerm);
    // getBlogsWithSearchTerm(tempTerm).then((data) => {
    //   console.log(data);
    // });
    setTerm("");
  };

  const searchForm = () => {
    return (
      <form onSubmit={handleSubmitSearch}>
        <div className="">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeSearch}
            placeholder="Search ..."
          />
        </div>
      </form>
    );
  };

  return <>{searchForm()}</>;
}

export default Search;
