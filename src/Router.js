const Express = require('express')
const router = Express.Router()
const DashboardController = require('./controllers/DashboardController')
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

// GETS
router.get('/', DashboardController.loginPage)
router.get('/profile', ProfileController.profilePage)
router.get('/job', JobController.addJobPage)
router.get('/job/:id', JobController.editJobPage)
router.get('/logout', DashboardController.logoutUser)
router.get('/register', DashboardController.registerPage)
router.get('/*', DashboardController.pageNotFound)

// POST
router.post('/', DashboardController.index)
router.post('/profile', ProfileController.updateUserData)
router.post('/job', JobController.addNewJob)
router.post('/job/delete/:id', JobController.delJob)
router.post('/job/:id', JobController.editJob)
router.post('/register', DashboardController.registerUser)

module.exports = router