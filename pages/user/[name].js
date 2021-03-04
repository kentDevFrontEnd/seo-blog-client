import React from "react";

function BlogsWithName({ user, blogs }) {
  return <div>hello from {user}</div>;
}

BlogsWithName.getInitialProps = async (ctx) => {
  console.log(ctx.query.name);
  return { user: ctx.query.name, blogs: 1 };
};

export default BlogsWithName;
