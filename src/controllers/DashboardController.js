const Profile = require('../models/Profile')

module.exports = {
    async index(req, res) {

        const profile_data = await Profile.get()

        return res.render('index', { profile: profile_data })
    },
}