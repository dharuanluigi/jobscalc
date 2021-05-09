const Profile = require('../models/Profile')

module.exports = {
    dataNormalizer(job_data) {
        return {
            name: job_data.name,
            daily_hours: Number(job_data['daily-hours']),
            total_hours: Number(job_data['total-hours']),
            dueDate: Number(job_data.dueDate),
            budget: Number(job_data.budget)
        }
    },
    calcDueDate(job_data) {
        return {
            ...job_data,
            dueDate: 2
        }
    },
    async calcBudget(job_data) {
        // get value hour and * for total hours
        const profile_data = await Profile.get()
        return {
            ...job_data,
            budget: Number(job_data['total-hours']) * profile_data.hour_value
        }
    },
}