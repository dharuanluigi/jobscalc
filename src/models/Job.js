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
    async delete(id) {
        const connector = await Database()

        await connector.run(`
            DELETE FROM Jobs
            WHERE id = ${Number(id)};
        `)

        await connector.close()
    },
    async edit(new_job_data, id) {
        const connector = await Database()

        await connector.run(`
            UPDATE Jobs SET
                name = "${new_job_data.name}",
                daily_hours = ${new_job_data.daily_hours},
                total_hours = ${new_job_data.total_hours},
                dueDate = ${new_job_data.dueDate},
                budget = ${new_job_data.budget},
                status = "${new_job_data.status}"
            WHERE id = ${Number(id)};
        `)

        await connector.close()
    },
    async getAll() {
        const connector = await Database()

        const jobs = await connector.all(`
            SELECT * FROM Jobs;
        `)

        await connector.close()

        return jobs
    },
}