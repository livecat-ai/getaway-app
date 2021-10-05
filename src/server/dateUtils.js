
function daysToTrip(tripDate) {
    const now = new Date(Date.now());
    const days = dateDeltaInDays(now, tripDate);
    console.log(days);
    return days;
}

function dateDeltaInDays(startDate, endDate) {
    const delta = endDate.getTime() - startDate.getTime();
    const minutes = Math.floor(delta / 60000);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24)+1;
    return days
};

module.exports = {
    daysToTrip,
    dateDeltaInDays
}