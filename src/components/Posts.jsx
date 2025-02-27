import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchAndUpdateData(page) {
    setLoading(true);
    try {
      let res = await axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/posts?_limit=10&page=${page}`,
      });

      setTotalPages(Math.ceil(Number(res?.headers["x-total-count"]) / 10));
      /*Complete the missing code*/
      console.log(res.data);
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    /*Complete the missing code*/
    fetchAndUpdateData(page)
  }, [page]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <div id="pagination">
        {/* Button to go to the previous page, disabled if already on the first page */}
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          PREVIOUS
        </button>
        {/* Display the current page number */}
        <p>{page}</p>
        {/* Button to go to the next page, disabled if already on the last page */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </button>
      </div>
      <h1>List of Posts</h1>

      {posts?.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;