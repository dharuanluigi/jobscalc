const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')
// functions that use generally or much more a place// like check information fields are empty
const GeneralUtils = require('../utils/Utils')

module.exports = {
    addJobPage(req, res) {
        return res.render('job')
    },
    async editJobPage(req, res) {
        const job = await Job.get(req.params.id)
            return res.render('job-edit', { job })
    },
    async addNewJob(req, res) {
        if(!GeneralUtils.checkFields(req.body)) {
            const job = {
                ...req.body,
                created_at: Date.now()
            }
            await Job.add(JobUtils.dataNormalizerInsert(JobUtils.calcDueDate(await JobUtils.calcBudget(job, req.session.data.user_id))))
            
            return res.redirect('/')
        }
        else {
            return res.redirect('/job')
        }
    },
    async delJob(req, res) {
        await Job.delete(req.params.id)
        return res.redirect('/')
    },
    async editJob(req, res) {
        if(!GeneralUtils.checkFields(req.body)) {
            const old_job = await Job.get(req.params.id)

            const new_job = {
                ...req.body,
                created_at: old_job.created_at
            }
            
            await Job.edit(JobUtils.dataNormalizerUpdate(JobUtils.calcDueDate(await JobUtils.calcBudget(new_job, req.session.data.user_id))), req.params.id)

            return res.redirect(`/job/${req.params.id}`)
        }
        else {
            return res.redirect(`/job/${req.params.id}`)
        }
    },
    async getAllJobs() {
        return await Job.getAll()
    },
}