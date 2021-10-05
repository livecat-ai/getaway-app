function isDateValid(date) {
    // Check that the date is not in the past
    const now = Date.now();
    if ((date - now) >= 0) {
        return true;
    }
    else {
        return false;
    }
};

export {
    isDateValid
};