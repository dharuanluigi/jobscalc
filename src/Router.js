const Express = require('express')
const router = Express.Router()
const DashboardController = require('./controllers/DashboardController')
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

// GETS
router.get('/', DashboardController.index)
router.get('/profile', ProfileController.profilePage)
router.get('/job', JobController.addJobPage)
router.get('/job/:id', JobController.editJobPage)

// POST
router.post('/profile', ProfileController.updateUserData)
router.post('/job', JobController.addNewJob)
router.post('/job/delete/:id', JobController.delJob)

module.exports = router