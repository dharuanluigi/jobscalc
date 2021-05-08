module.exports = {
    dataNormalizer(profile_data){
        return {
            name: profile_data.name,
            avatar: profile_data.avatar,
            monthly_budget: Number(profile_data['monthly-budget']),
            hours_per_day: Number(profile_data['hours-per-day']),
            days_per_week: Number(profile_data['days-per-week']),
            vacation_per_year: Number(profile_data['vacation-per-year']),
            hour_value: profile_data.hour_value
        }
    },
    calcHourValue(profile_data) {
        // weeks per year
        const weeks_per_year = 52

        // remove vactions weeks from year to get how many weeks have in a month
        const weeks_per_month = (weeks_per_year - Number(profile_data['vacation-per-year'])) / 12

        // total hours woks in a week
        const week_total_hours = Number(profile_data['hours-per-day']) * Number(profile_data['days-per-week'])

        // hours worked in a week
        const monthly_total_hours = week_total_hours * weeks_per_month

        // value of a worked hour
        const hour_value = Number(profile_data['monthly-budget']) / monthly_total_hours

        return {
            ...profile_data,
            hour_value
        }
    }
}