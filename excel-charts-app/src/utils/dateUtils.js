export function isWithinDateRange(date, start, end) {
    if (!date) {
        return false;
    }

    const current = new Date(date);
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (startDate && current < startDate) {
        return false;
    }

    if (endDate && current > endDate) {
        return false;
    }

    return true;
}
