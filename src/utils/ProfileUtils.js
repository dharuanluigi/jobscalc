module.exports = {
    dataNormalizer(profile_data){
        return {
            name: profile_data.name,
            avatar: profile_data.avatar,
            monthly_budget: profile_data['monthly-budget'],
            hours_per_day: profile_data['hours-per-day'],
            days_per_week: profile_data['days-per-week'],
            vacation_per_year: profile_data['vacation-per-year'],
        }
    }
}