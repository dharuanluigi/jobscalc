const Database = require('../db/configDB')
const ProfileUtils = require('../utils/ProfileUtils')

module.exports = {
    async get(user_id) {
        const connector = await Database()

        const profile_data = await connector.get(`
            SELECT * FROM Profile
            WHERE id = ${user_id};
        `)

        await connector.close()

        return profile_data
    },
    async hasLogin(logon_data) {
        // validated if login is already exist
        const connector = await Database()

        const profile = await connector.get(`
            SELECT * FROM Profile
            WHERE login = "${logon_data.login}";
        `)
        
        await connector.close()

        return profile === undefined
    },
    async update(profile_data, user_id) {

        let profile_data_normalized = ProfileUtils.dataNormalizer(profile_data)

        const connector = await Database()

        await connector.run(`
            UPDATE Profile SET
            name = "${profile_data_normalized.name}",
            avatar = "${profile_data_normalized.avatar}",
            monthy_budget = ${profile_data_normalized.monthly_budget},
            hours_per_day = ${profile_data_normalized.hours_per_day},
            days_per_week = ${profile_data_normalized.days_per_week},
            vacation_per_year = ${profile_data_normalized.vacation_per_year},
            hour_value = ${profile_data_normalized.hour_value}
            WHERE id = ${user_id};
        `)

        await connector.close()
    },
    async login(login_data) {
        const connector = await Database()

        const profile = await connector.get(`
            SELECT id, name FROM Profile
            WHERE login = "${login_data.login}"
            AND password = "${login_data.password}"
        `)

        await connector.close()

        return profile
    },
    async logon(logon_data) {
        const connector = await Database()

        await connector.run(`
            INSERT INTO Profile VALUES (
                NULL,
                "${logon_data.login}",
                "https://source.unsplash.com/random/800x600",
                0,
                1,
                1,
                0,
                0,
                "${logon_data.login}",
                "${logon_data.mail}",
                "${logon_data.password}"
            );
        `)

        await connector.close()
    }
}