const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    addJobPage(req, res) {
        return res.render('job')
    },
    editJobPage(req, res) {
        return res.render('job-edit')
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
    }
}