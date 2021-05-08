const Database = require('../db/configDB')
const ProfileUtils = require('../utils/ProfileUtils')

module.exports = {
    async get() {
        const connector = await Database()

        const profile_data = await connector.get(`
            SELECT * FROM Profile
            WHERE id = 1;
        `)

        await connector.close()

        return profile_data
    },
    async update(profile_data) {

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
            WHERE id = 1;
        `)

        await connector.close()
    },
}