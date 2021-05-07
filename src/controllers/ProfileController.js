const Profile = require('../model/Profile')

module.exports = {
    async profilePage(req, res) {
        const profile_data = await Profile.get()
        return res.render('profile', { profile: profile_data })
    },
    async update(req, res) {
        
    }
}