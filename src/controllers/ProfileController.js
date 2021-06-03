const { Database } = require('sqlite3')
const Profile = require('../models/Profile')
const ProfileUtils = require('../utils/ProfileUtils')
// functions that are used one more place, like check fields.
const GeneralUtils = require('../utils/Utils')

module.exports = {
    async profilePage(req, res) {
        const profile_data = await Profile.get(req.session.data.user_id)
        return res.render('profile', { profile: profile_data })
    },
    async updateUserData(req, res) {
        // verify if fields had empty data
        if(!GeneralUtils.checkFields(req.body)) {
            await Profile.update(ProfileUtils.calcHourValue(req.body), req.session.data.user_id)
            return res.redirect('/profile')
        } 
        else {
            return res.redirect('/profile')
        }
    },
    async getProfileData(user_id) {
        return await Profile.get(user_id)
    },
    async login(login_data) {
        const login = await Profile.login(login_data)
        return login
    },
    async logon(logon_data) {
        
        const noHasProfile = await Profile.hasLogin(logon_data)

        if(noHasProfile) {
            await Profile.logon(logon_data)
            return true
        }
        else {
            return false
        }
    }
}