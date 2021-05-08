const Profile = require('../model/Profile')

module.exports = {
    async profilePage(req, res) {
        const profile_data = await Profile.get()
        return res.render('profile', { profile: profile_data })
    },
    updateUserData(req, res) {
        
        console.log(req.body)

        return res.send('ok')
    }
}