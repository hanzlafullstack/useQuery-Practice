import React from 'react'
import "./PagesStyling/pageStyling.css";
import { useQuery } from '@tanstack/react-query';


const HomeContent = () => {
const fetchTopics = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/hanzlafullstack/useQuery-Practice/main/data/Topics.json"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json(); 
};

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
    staleTime: 100000,
  });
  const dataTopics = data?.topics || []
  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>Error occured : {error.message}</p>
  return (
    <div className="home-content">
      <div className="headings-box">
        <h2>React Query Learning Dashboard</h2>
        <p className="sub-heading">
          Explore my progress while learning React Query. This page highlights
          the concepts I've covered so far and organizes them into
          easy-to-understand learning cards.
        </p>
      </div>
      {dataTopics.map((topic) => (
        <div
          className={
            topic.status === "completed"
              ? "content-box completed"
              : "content-box"
          }
          key={topic.id}
        >
          <h2>• {topic.title}</h2>
          <p>{topic.description}</p>
        </div>
      ))}
    </div>
  );
}

export default HomeContent