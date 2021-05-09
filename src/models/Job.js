const Database = require('../db/configDB')

module.exports = {
    async add(job_data) {
        const connector = await Database()

        await connector.run(`
            INSERT INTO Jobs VALUES (
                NULL,
                "${job_data.name}",
                ${job_data.daily_hours},
                ${job_data.total_hours},
                ${Date.now()},
                ${job_data.dueDate},
                ${job_data.budget}
            );
        `)

        await connector.close()
    }
}