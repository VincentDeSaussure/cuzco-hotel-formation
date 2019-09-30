const AvailableRooms = require('../domain/AvailableRooms');

class MakeAResearch {
    constructor(rooms, reservations) {
        this.rooms = rooms;
        this.reservations = reservations;
    }

    execute(guestNumber, checkIn, checkOut) {
        let availableRooms = new AvailableRooms(this.rooms, this.reservations)
        availableRooms.withGoodCapacity(guestNumber)
        availableRooms.withDateDisponibility(checkIn, checkOut);
        return availableRooms.rooms;
    }

}

module.exports = MakeAResearch