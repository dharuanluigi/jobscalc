const Database = require('../db/configDB')

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
    async update() {
        
    }
}