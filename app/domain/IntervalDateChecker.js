class IntervalDateChecker {

    validCheckIn(checkIn, interval) {
        const checkInDate = Date.parse(checkIn)
        const checkInIntervalDate = Date.parse(interval[0])
        const checkOutIntervalDate= Date.parse(interval[1])
        return checkInDate < checkInIntervalDate || checkInDate > checkOutIntervalDate
    }

    validCheckout(checkOut, interval) {
        const checkOutDate = Date.parse(checkOut)
        const checkInIntervalDate = Date.parse(interval[0])
        const checkOutIntervalDate= Date.parse(interval[1])
        return checkOutDate < checkInIntervalDate || checkOutDate > checkOutIntervalDate
    }
    validInterval(checkOut, checkIn, interval) {
        return this.validCheckout(checkOut, interval) & this.validCheckIn(checkIn, interval)
    }
}

module.exports = IntervalDateChecker;