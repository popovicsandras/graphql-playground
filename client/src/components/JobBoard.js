import JobList from './JobList';
import { getJobs } from '../graphql.js';
import { useState, useEffect } from 'react';



function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const j = await getJobs();
      setJobs(j);
    }

    fetch();
  }, []);

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
