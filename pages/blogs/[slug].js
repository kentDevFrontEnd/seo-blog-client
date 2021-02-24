import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

import { getOneBlog } from "../../actions/blog.action";
import { getInitialData } from "../../actions/initial.action";
import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import { API, APP_NAME, DOMAIN_NAME, FB_APP_ID } from "../../config";

dayjs.extend(relativeTime);

const SingleBlog = ({ data }) => {
  const router = useRouter();

  // const slug = router.query.slug;
  // console.log(blog);
  // console.log("data", data);
  const { blog, relatedBlogs } = data;
  const head = () => {
    return (
      <Head>
        <title>
          {" "}
          {blog.title} | {APP_NAME}{" "}
        </title>
        <meta name="description" content={blog.mdesc} />
        <link
          rel="canonical"
          href={`${DOMAIN_NAME}/blogs/${router.pathname}`}
        />
        <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
        <meta property="og:description" content={blog.mdesc} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN_NAME}/blogs/${router.pathname}`}
        />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta
          property="og:image"
          content={blog.photo.length > 0 && blog.photo[0].img}
        />
        <meta
          property="og:image:secure_url"
          content={blog.photo.length > 0 && blog.photo[0].img}
        />
        <meta
          property="og:image:type"
          content={blog.photo.length > 0 && blog.photo[0].img}
        />
        <meta
          property="og:image"
          content={blog.photo.length > 0 && blog.photo[0].img}
        />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  const showRelatedBlogs = () => {
    return (
      relatedBlogs &&
      relatedBlogs.map((item) => (
        <Col sm={6} lg={3} key={item._id}>
          <Card className="mb-3">
            {item.photo.length > 0 && (
              <CardImg top width="100%" src={item.photo[0]} alt={item.title} />
            )}
            <CardBody>
              <CardTitle tag="h5">{item.title}</CardTitle>
              <CardText>{item.mdesc}</CardText>
              <Link href={`/blogs/${item.slug}`}>
                <a className="btn btn-info">Read more</a>
              </Link>
            </CardBody>
          </Card>
        </Col>
      ))
    );
  };

  return (
    <>
      {head()}
      <Layout>
        <main>
          <article>
            {blog && (
              <Container>
                <Row>
                  {blog.photo.length > 0 && (
                    <img
                      src={blog.photo[0].img}
                      alt={blog.title}
                      className="img img-fluid mt-1 featured-image"
                    />
                  )}
                </Row>

                <Row>
                  <h1
                    style={{ textAlign: "center" }}
                    className="text-capitalize mt-3"
                  >
                    {blog.title}
                  </h1>
                </Row>

                <Row>
                  <p className="lead pt-2 pb-2">
                    Writen by {blog.postedBy.name} | Published{" "}
                    {dayjs(blog.updatedAt).fromNow()}
                  </p>
                </Row>

                <Row>
                  {blog.tag &&
                    blog.tag.map((tag) => (
                      <div key={tag._id} className="d-inline-block m-1">
                        <Link href={`/tag/${tag.slug}`}>
                          <a className="fs-6 btn btn-info ">{tag.name}</a>
                        </Link>
                      </div>
                    ))}
                </Row>

                <Row>
                  <p className="">{blog.mdesc}</p>
                </Row>

                <Row>
                  <Col sm={12}>
                    <h4 className="text-center pt-5 pb-5">Related blogs</h4>
                  </Col>
                  <Row>{showRelatedBlogs()}</Row>
                </Row>
              </Container>
            )}
          </article>
        </main>
      </Layout>
    </>
  );
};

// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   };
// };

// export async function getStaticProps(context) {
//   try {
//     // console.log(context.params);
//     const { slug } = context.params;

//     const res = await getOneBlog(slug);

//     // console.log(res);
//     return (
//       res && {
//         props: { data: res },
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }
SingleBlog.getInitialProps = async (ctx) => {
  try {
    console.log(ctx.query);
    const { slug } = ctx.query;
    const res = await getOneBlog(slug);

    return { data: res };
  } catch (error) {
    console.log(error);
  }
};

export default SingleBlog;
