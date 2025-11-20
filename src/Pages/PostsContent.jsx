import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const PostsContent = () => {

    const [page,setPage] = useState(1)

    const fetchPosts = async() =>{
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        if(!response.ok) throw new Error("Could not fetch data")
        return response.json()
    }

    const { data, isError, isLoading, error } = useQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      staleTime: 10000000
    });
    
    const commentsPerPage = 5;
    const totalPages = Math.ceil(data?.length / commentsPerPage)

    const start = (page - 1) * commentsPerPage;
    const end = start + commentsPerPage;
    const dataSlice = data?.slice(start,end)


    if(isError) return <p>Error occured : {error.message}</p>
    if(isLoading) return <p>Loading Post Comments! Kindly have Paitence...</p>
  return (
    <div className="users-content-box">
      <div className="headings-box">
        <h2>Using React Query for Fetching Data</h2>
        <p className="sub-heading">
          Using the jsonplaceholder site , i just grabbed the link of comments
          from there and through that i am just practicing the fetching the data
          , handle isError , isLoading , error message
        </p>
      </div>
      {dataSlice.map((comment) => (
        <div key={comment.id} className="content-box">
          <h2>Email : {comment.email}</h2>
          <p>
            {comment.body} ~ by <strong>{comment.name}</strong>
          </p>
        </div>
      ))}
      <div className="pages-box">
        <button
          className={page === 1 ? "btn-disabled" : "btn-active"}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev Page
        </button>
        <h3>{page}</h3>
        <button
          className={page === totalPages ? "btn-disabled" : "btn-active"}
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next Page
        </button>
      </div>
    </div>

  );
}

export default PostsContent