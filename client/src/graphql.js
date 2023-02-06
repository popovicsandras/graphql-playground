import { request, gql } from 'graphql-request'

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function getJobs() {
    const query = gql`
        query geyJobs{
            jobs {
                id
                title
                company {
                    id
                    name
                }
            }
        }    
    `;

    const { jobs } = await request(GRAPHQL_URL, query);
    return jobs;
}

export async function getJob(id) {
    const query = gql`
    query getJob($id: ID!){
        job(id: $id) {
            id
            title
            company {
                id
                name
            }
            description
        }
    }`;

    const variables = { id };
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export async function getCompany(id) {
    const query = gql`
    query getCompany($id: ID!){
        company(id: $id) {
            id
            name
            description,
            jobs {
                id
                title
            }
        }
    }`;

    const variables = { id };
    const { company } = await request(GRAPHQL_URL, query, variables);
    return company;
}

export async function createJob(title, companyId, description) {
    const query = gql`
    mutation CreateJob($input: CreateJobInput!) {
        job: createJob(input: $input) { id }
    }`;

    const variables = { input: {title, companyId, description} };
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}