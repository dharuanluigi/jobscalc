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

        await Job.add(JobUtils.dataNormalizerInsert(JobUtils.calcDueDate(await JobUtils.calcBudget(job))))
        
        return res.redirect('/')
    },
    async delJob(req, res) {
        await Job.delete(req.params.id)
        return res.redirect('/')
    },
    async editJob(req, res) {
        
        const old_job = await Job.get(req.params.id)

        const new_job = {
            ...req.body,
            created_at: old_job.created_at
        }

        await Job.edit(JobUtils.dataNormalizerUpdate(JobUtils.calcDueDate(await JobUtils.calcBudget(new_job))), req.params.id)

        return res.redirect(`/job/${req.params.id}`)
    },
    async getAllJobs() {
        return await Job.getAll()
    },
}