const IntervalDateChecker = require("./IntervalDateChecker");

class AvailableRooms {

    constructor(rooms, reservations) {
        this.rooms = rooms;
        this.reservations = reservations;
    }

    withGoodCapacity(numberOfGuest) {
        this.rooms = this.rooms.filter((room) => {
            if (room.capacity >= numberOfGuest) {
                return { roomNumber: room.room }
            }
        })
    }

    withDateDisponibility(checkIn, checkOut) {
        const intervalDateChecker = new IntervalDateChecker();
        const incompatableReservation = this.reservations.filter(reservation => {
            return !intervalDateChecker.validInterval(checkOut, checkIn, [reservation.checkIn, reservation.checkOut])
        });
        const unavailableRoomsNumber = incompatableReservation.map(reservation => {
            return reservation.room;
        })
        unavailableRoomsNumber.map(unavailableRoomNumber => {
            this.rooms = this.rooms.filter(room => {
                return room.room !== unavailableRoomNumber;
            })
        })
    }}

module.exports = AvailableRooms;