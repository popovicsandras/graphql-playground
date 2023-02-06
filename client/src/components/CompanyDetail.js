import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getCompany } from '../graphql';
import JobList from './JobList.js';

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, [companyId]);

  if (!company) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h3 className="title id-5">
        Current jobs
      </h3>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
