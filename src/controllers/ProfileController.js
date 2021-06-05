require('dotenv').config()
const Profile = require('../models/Profile')
const ProfileUtils = require('../utils/ProfileUtils')
// functions that are used one more place, like check fields.
const GeneralUtils = require('../utils/Utils')
const nodemailer = require('nodemailer')
const passGen = require('password-generator')

module.exports = {
    async profilePage(req, res) {
        if(req.session.data) {
            const profile_data = await Profile.get(req.session.data.user_id)
            return res.render('profile', { profile: profile_data })
        }
        else {
            return res.redirect('/')
        }
    },
    resetPasswordPage(req, res) {
        return res.render('reset-password', { msg: '' })
    },
    async updateUserData(req, res) {
        // verify if fields had empty data
        if(!GeneralUtils.checkFields(req.body) && GeneralUtils.nameLengthVerif(req.body)) {
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
    },
    async resetPassword(req, res) {
        
        let pass = passGen(8, false)
        const mail = await Profile.resetPassword(req.body, pass)

        if(mail) {
            await module.exports.sendMailService(mail.email, pass).catch(console.error)
            return res.render('reset-password', { msg: 'Senha enviada ao e-mail cadastrado!' })
        }
        else {
            return res.render('reset-password', { msg: 'Falha ao processar pedido!' })
        }
    },
    async sendMailService(user_mail, pass) {
        
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'online.business.com.br@gmail.com',
                pass: process.env.MAIL_PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from: 'JobsCalc bot <online.business.com.br@gmail.com>',
            to: `${user_mail}`,
            subject:  'Nova senha de acesso',
            text: `Aqui está sua nova senha de acesso: ${pass}`
        })

        // clear pass ref
        pass = null
    },
}