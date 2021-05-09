const DashboardUtils = require('../utils/DashboardUtils')
const ProfileController = require('../controllers/ProfileController')
const JobController = require('../controllers/JobController')

module.exports = {
    async index(req, res) {
        // get profile data
        const profile_data = await ProfileController.getProfileData()

        // get all jobs from DB
        const jobs = await JobController.getAllJobs()

        const status_panel = DashboardUtils.calcStatusPanel(jobs, profile_data)

        return res.render('index', { profile: profile_data, jobs, status_panel })
    },
}