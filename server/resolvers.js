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
        deleteJob: async (_root, {id}, context) => {
            if (!context.user) {
                throw new Error("Unauthorized");
            }

            const {companyId} = await Job.findById(id);
            if (companyId !== context.user.companyId) {
                throw new Error("Unauthorized");
            }

            return Job.delete(id);
        },
        updateJob: async (_root, {input}, context) => {
            if (!context.user) {
                throw new Error("Unauthorized");
            }

            const {companyId} = await Job.findById(input.id);
            if (companyId !== context.user.companyId) {
                throw new Error("Unauthorized");
            }

            return Job.update({...input, companyId: context.user.companyId});
        }
    },

    Job: {
        company: job => Company.findById(job.companyId)
    },

    Company: {
        jobs: company => Job.findAll((job) => job.companyId === company.id)
    }
}