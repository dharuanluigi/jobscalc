const DashboardUtils = require('../utils/DashboardUtils')
const ProfileController = require('../controllers/ProfileController')
const JobController = require('../controllers/JobController')

module.exports = {
    async getLogedProfileData(user_id) {
        // get profile data
        const profile_data = await ProfileController.getProfileData(user_id)

        // get all jobs from DB
        const jobs = await JobController.getAllJobs()

        const status_panel = DashboardUtils.calcStatusPanel(jobs, profile_data)

        return {
            profile_data,
            jobs,
            status_panel
        }
    },
    async index(req, res) {
        const user_data_login = await ProfileController.login(req.body)
        
        if(user_data_login) {
            // save login in a session
            req.session.data = {
                user_id: user_data_login.id
            }

            const data = await module.exports.getLogedProfileData(req.session.data.user_id)
           
           return res.render('index', { profile: data.profile_data, jobs: data.jobs, status_panel: data.status_panel })
        }
        else {
            // add frindly message return to user
            return res.render('login', { msg: 'Login/Senha incorretos!' })
        }
    },
    async loginPage(req, res) {
        if(req.session.data) {
            const data = await module.exports.getLogedProfileData(req.session.data.user_id)
            return res.render('index', { profile: data.profile_data, jobs: data.jobs, status_panel: data.status_panel })
        }
        else {
            // just start variable
           return res.render('login', { msg: '' })
        }
    },
    logoutUser(req, res) {
        req.session.destroy((e) => {
            return res.redirect('/')
        })
    },
    registerPage(req, res) {
        return res.render('register')
    },
    register(req, res) {
    }
}