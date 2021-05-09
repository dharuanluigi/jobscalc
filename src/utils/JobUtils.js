const ProfileController = require('../controllers/ProfileController')

module.exports = {
    dataNormalizerInsert(job_data) {
        return {
            name: job_data.name,
            daily_hours: Number(job_data['daily-hours']),
            total_hours: Number(job_data['total-hours']),
            created_at: Number(job_data.created_at),
            dueDate: Number(job_data.dueDate),
            budget: Number(job_data.budget),
            status: job_data.status
        }
    },
    dataNormalizerUpdate(job_data) {
        return {
            name: job_data.name,
            daily_hours: Number(job_data['daily-hours']),
            total_hours: Number(job_data['total-hours']),
            dueDate: Number(job_data.dueDate),
            budget: Number(job_data.budget),
            status: job_data.status
        }
    },
    calcDueDate(job_data) {
        // how many days that work will finished: 5::
        const total_days = Math.ceil(Number(job_data['total-hours']) / Number(job_data['daily-hours']))
        
        // just for plus days
        const created_date = new Date(job_data.created_at)

        // get day to create and plus with total days to delivery
        const due_day = created_date.getDate() + total_days

        
        // calc due day from create date
        const due_date_ms = created_date.setDate(due_day)
        
        // diff btw right now and due date
        const diff_dates = Math.ceil(due_date_ms - Date.now())
        
        // a day in ms: 86400000
        const day_ms = 1000*60*60*24

        // discovering how many days, transform diff days ms in commum days
        const delivery_day = Math.ceil(diff_dates / day_ms)

        return {
            ...job_data,
            dueDate: delivery_day,
            status: delivery_day > 0 ? 'progress' : 'done'
        }
    },
    async calcBudget(job_data) {
        // get value hour and * for total hours
        const profile_data = await ProfileController.getProfileData()
        return {
            ...job_data,
            budget: Number(job_data['total-hours']) * profile_data.hour_value
        }
    },
}