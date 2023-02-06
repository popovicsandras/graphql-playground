import { Company, Job } from "./db.js";

export const resolvers = {
    Query: {
        job: (_root, {id}) => Job.findById(id),
        jobs: () => Job.findAll(),
        company: (_root, {id}) => Company.findById(id)
    },

    Mutation: {
        createJob: (_root, {input}, context) => {
            if (!context.user) {
                throw new Error("Unauthorized");
            }
            
            return Job.create({...input, companyId: context.user.companyId});
        },
        deleteJob: (_root, {id}) => {
            return Job.delete(id);
        },
        updateJob: (_root, {input}) => {
            return Job.update(input);
        }
    },

    Job: {
        company: job => Company.findById(job.companyId)
    },

    Company: {
        jobs: company => Job.findAll((job) => job.companyId === company.id)
    }
}