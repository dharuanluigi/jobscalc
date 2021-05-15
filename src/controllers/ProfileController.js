const Profile = require('../models/Profile')
const ProfileUtils = require('../utils/ProfileUtils')

module.exports = {
    async profilePage(req, res) {
        const profile_data = await Profile.get()
        return res.render('profile', { profile: profile_data })
    },
    async updateUserData(req, res) {
        
        if(!ProfileUtils.checkFields(req.body)) {
            await Profile.update(ProfileUtils.calcHourValue(req.body))
            return res.redirect('/profile')
        } 
        else {
            return res.redirect('/profile')
        }
    },
    async getProfileData() {
        return await Profile.get()
    }
}