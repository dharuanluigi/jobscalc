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
                ${job_data.created_at},
                ${job_data.dueDate},
                ${job_data.budget},
                "${job_data.status}"
            );
        `)

        await connector.close()
    },
    async get(id) {
        const connector = await Database()

        const job = await connector.get(`
            SELECT * FROM Jobs
            WHERE id = ${Number(id)};
        `)

        await connector.close()

        return job
    },
    async getAll() {
        const connector = await Database()

        const jobs = await connector.all(`
            SELECT * FROM Jobs;
        `)

        await connector.close()

        return jobs
    },
    async delete(id) {
        const connector = await Database()

        await connector.run(`
            DELETE FROM Jobs
            WHERE id = ${Number(id)};
        `)

        await connector.close()
    }
}