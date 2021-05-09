const ProfileController = require('../controllers/ProfileController')
const JobController = require('../controllers/JobController')

module.exports = {
    async index(req, res) {
        const profile_data = await ProfileController.getProfileData()

        const jobs = await JobController.getAllJobs()

        return res.render('index', { profile: profile_data, jobs })
    },
}