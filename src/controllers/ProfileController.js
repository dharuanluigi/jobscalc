const Profile = require('../models/Profile')

module.exports = {
    async profilePage(req, res) {
        const profile_data = await Profile.get()
        return res.render('profile', { profile: profile_data })
    },
    async updateUserData(req, res) {

        await Profile.update(req.body)

        return res.send('ok')
    }
}