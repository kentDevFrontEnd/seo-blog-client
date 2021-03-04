import Link from "next/link";
import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Layout from "../../components/Layout";
import { Button, Col, Container, Row } from "reactstrap";
import { getAllBlogs, getBlogsWithSearchTerm } from "../../actions/blog.action";
import { getInitialData } from "../../actions/initial.action";
import Head from "next/head";
import { API, APP_NAME, DOMAIN_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import Search from "../../components/blog/Search";

dayjs.extend(relativeTime);

function Blogs({ data, router }) {
  const { message, result, blogs, categories, tags } = data;

  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const [error, setError] = useState("");
  const [searchedBlogs, setSearchBlogs] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const loadMore = () => {
    setLoading(true);
    getAllBlogs(page, 2).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setLoadedBlogs([...loadedBlogs, data.blogs]);
        setLoading(false);
        setError("");
        setPage(page + 1);
      }
    });
  };

  const handleSearch = (term) => {
    if (term.q) {
      setIsSearch(true);
      getBlogsWithSearchTerm(term).then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setSearchBlogs(data.blogs);
          setLoading(false);
          setError("");
        }
      });
    } else {
      setIsSearch(false);
      console.log("do not search");
      setError("");
      setLoading(false);
    }
  };

  const head = () => {
    return (
      <Head>
        <title> Programing Blogs | {APP_NAME} </title>
        <meta name="description" content="Programing and tutorials ..." />
        <link rel="canonical" href={`${DOMAIN_NAME}${router.pathname}`} />
        <meta
          property="og:title"
          content={`Lastest web delevelopment tutorials | ${APP_NAME}`}
        />
        <meta
          property="og:description"
          content="Programing and tutorials ..."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN_NAME}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta
          property="og:image"
          content={`${DOMAIN_NAME}/static/images/1.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN_NAME}/static/images/1.jpg`}
        />
        <meta
          property="og:image:type"
          content={`${DOMAIN_NAME}/static/images/1.jpg`}
        />
        <meta
          property="og:image"
          content={`${DOMAIN_NAME}/static/images/1.jpg`}
        />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  console.log(searchedBlogs);
  const createMarkup = (text) => {
    return { __html: text };
  };

  const showAllBlogs = (blogs) => {
    return (
      blogs &&
      blogs.map((blog) => (
        <article key={blog._id}>
          <div className="lead">
            <header>
              <Link href={`/blogs/${blog.slug}`}>
                <a>
                  <h2 className="display-6 text-capitalize">{blog.title}</h2>
                </a>
              </Link>
            </header>

            <section>
              <p className="mark ml-1 pt-2 pb-2">
                Writen by{" "}
                <Link href={`/user/${blog.postedBy.name}`}>
                  <a>{blog.postedBy.name}</a>
                </Link>
                | Published {dayjs(blog.updatedAt).fromNow()}
              </p>
            </section>

            <section>
              {blog.tag &&
                blog.tag.map((tag) => (
                  <div key={tag._id} className="d-inline-block m-1">
                    <Link href={`/tag/${tag.slug}`}>
                      <a className="fs-6 btn btn-info ">{tag.name}</a>
                    </Link>
                  </div>
                ))}
            </section>

            <section>
              <Row>
                <Col md={4}>
                  {blog.photo?.length && (
                    <img
                      className="img-fluid"
                      src={blog.photo[0].img}
                      alt={blog.slug}
                    />
                  )}
                </Col>
                <Col md={8}>
                  <div
                    className="mb-3"
                    dangerouslySetInnerHTML={createMarkup(blog.excerpt)}
                  ></div>
                  <Link href={`/blogs/${blog.slug}`}>
                    <a className="btn btn-outline-info ml-2">Read more</a>
                  </Link>
                </Col>
              </Row>
            </section>
          </div>
          <hr />
        </article>
      ))
    );
  };

  const showAllCategories = () => {
    return (
      categories &&
      categories.map((cate) => (
        <div>
          <Link key={cate._id} href={`/category/${cate.slug}`}>
            <a className="text-capitalize">{cate.name}</a>
          </Link>
        </div>
      ))
    );
  };

  const showAllTags = () => {
    return (
      tags &&
      tags.map((tag) => (
        <div>
          <Link
            key={tag._id}
            href={`/tag/${tag.slug}`}
            className="text-capitalize"
          >
            <a className="text-capitalize">{tag.name}</a>
          </Link>
        </div>
      ))
    );
  };

  const loadMoreBtn = () => {
    return (
      <Button outline color="primary" onClick={loadMore}>
        Load More
      </Button>
    );
  };

  const showError = () => {
    return error && <p className="alert alert-danger">{error}</p>;
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <Container className="mt-3">
          <header>
            <h1 className="display-5 text-center font-weight-bold ">
              Program blogs and tutorial
            </h1>
            <Search handleSearch={handleSearch} />
          </header>
          <main className="mt-3">
            {showError()}
            <Row>
              {isSearch ? (
                <Col md={9}>{showAllBlogs(searchedBlogs)}</Col>
              ) : (
                <Col md={9}>
                  {showAllBlogs(blogs)}
                  {loadedBlogs.map((item, index) => showAllBlogs(item))}
                  {/* //FIXME key for each item */}
                </Col>
              )}
              <Col md={3}>
                <h5>Categories: </h5>
                {showAllCategories()}
                <hr />
                {showAllTags()}
              </Col>
            </Row>
            <Row>
              <Col>{loadMoreBtn()}</Col>
            </Row>
          </main>
        </Container>
      </Layout>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const res = await getInitialData();
  // console.log(res.data);
  return {
    props: { data: res.data },
  };
}

export default withRouter(Blogs);
