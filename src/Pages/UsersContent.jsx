import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const fetchUsers = async() =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if(!response.ok) throw new Error("Could not Fetch Data From Server")
    return response.json()
}

const UsersContent = () => {
    const [page,setPage] = useState(1)
    
    
    const {data , isLoading , error, isError} = useQuery({
        queryKey : ["users"],
        queryFn : fetchUsers,
        staleTime : 10000000
    })
    
    if(isError) return <p>Error Occured: {error.message}</p>
    if(isLoading) return <p>Loading...</p>

    const usersPerPage = 3;

    const totalPages = Math.ceil(data.length / usersPerPage);
    const start = (page - 1) * usersPerPage
    const end = start + usersPerPage;
    const userSlicer = data.slice(start,end);

    
  return (
    <div className="users-content-box">
      <div className="headings-box">
        <h2>Users</h2>
        <p className="sub-heading">Random Users Data From JsonPlaceHolder</p>
      </div>
      {userSlicer?.map((user) => (
        <div className="content-box" key={user.id}>
          <h2>{user.name}</h2>
          <p>Email Address : {user.email}</p>
          <span>
            Address : {user.street}, {user.address.city}
          </span>
          <p>Contact info : {user.phone}</p>
          <p>User Company : {user.company.name}</p>
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

export default UsersContent