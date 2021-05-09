module.exports = {
    calcStatusPanel(jobs, profile_data) {
        return {
            free_time: this.calcFreeTime(jobs, profile_data),
            total_projects: jobs.length,
            progress: this.calcProgressProjects(jobs),
            done: this.calcDoneProjects(jobs),
        }
    },
    calcFreeTime(jobs, profile_data) {
        // calc freeTime
        let freeTime = profile_data.hours_per_day
        jobs.forEach((job) => {
            freeTime -= job.daily_hours
        })

        return freeTime < 0 ? 0 : freeTime
    },
    calcProgressProjects(jobs) {
        let total = 0
        jobs.forEach((job) => {
            if(job.status === 'progress') {
                total++
            }
        })

        return total
    },
    calcDoneProjects(jobs) {
        let total = 0
        jobs.forEach((job) => {
            if(job.status === 'done') {
                total++
            }
        })

        return total
    },
}