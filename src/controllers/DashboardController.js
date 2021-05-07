const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {

        const profile_data = await Profile.get()

        return res.render('index', { profile: profile_data })
    },
}