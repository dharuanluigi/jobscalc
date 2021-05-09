const JobUtils = require('../utils/JobUtils')
const Job = require('../models/Job')

module.exports = {
    addJobPage(req, res) {
        return res.render('job')
    },
    editJobPage(req, res) {
        return res.render('job-edit')
    },
    async addNewJob(req, res) {

        await Job.add(JobUtils.dataNormalizer(JobUtils.calcDueDate(await JobUtils.calcBudget(req.body))))
        
        return res.redirect('/')
    }
}