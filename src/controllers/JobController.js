const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    addJobPage(req, res) {
        return res.render('job')
    },
    async editJobPage(req, res) {

        const job = await Job.get(req.params.id)

        return res.render('job-edit', { job })
    },
    async addNewJob(req, res) {

        const job = {
            ...req.body,
            created_at: Date.now()
        }

        await Job.add(JobUtils.dataNormalizer(JobUtils.calcDueDate(await JobUtils.calcBudget(job))))
        
        return res.redirect('/')
    },
    async getAllJobs() {
        return await Job.getAll()
    },
    async delJob(req, res) {
        await Job.delete(req.params.id)
        return res.redirect('/')
    }
}