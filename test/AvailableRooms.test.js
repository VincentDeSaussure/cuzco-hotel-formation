const assert = require('assert');
const AvailableRooms = require('../app/domain/AvailableRooms');
const roomsForTest = require('../app/infra/source/rooms');
const reservationsForTest = require('./db/reservationsTest');


describe('AvailableRooms', () => {
    describe('with good capacity', () => {
            it('should return good rooms for 2 guest', () => {
                // Given
                const reservations = []
                const availableRooms = new AvailableRooms(roomsForTest, reservations);

                const guestNumber = 2;
                const expectedRoom = 11;

                // When
                availableRooms.withGoodCapacity(guestNumber);

                // Then
                assert.deepEqual(availableRooms.rooms.length, expectedRoom);
            }),
            it('should return good rooms for 3 guest', () => {
                // Given
                const reservations = []
                const availableRooms = new AvailableRooms(roomsForTest, reservations);

                const guestNumber = 3;
                const expectedRoom = 4;

                // When
                availableRooms.withGoodCapacity(guestNumber);

                // Then
                assert.deepEqual(availableRooms.rooms.length, expectedRoom);
            }),
            it('should return room 203 for 5 guest', () => {
                // Given
                const reservations = []
                const availableRooms = new AvailableRooms(roomsForTest, reservations);

                const guestNumber = 5;
                const expectedRoom = 1;

                // When
                availableRooms.withGoodCapacity(guestNumber);

                // Then
                assert.deepEqual(availableRooms.rooms.length, expectedRoom);
            })
        }
    )

    describe('with disponibility', () => {
        it('should return empty when rooms have been reserved for this checkIn and checkOut', () => {
            // given
            const rooms = [{
                    floor: 2,
                    room: 204,
                    description: "1 single bed - Wi-Fi - shared bathroom",
                    capacity: 1
                }];
            const availableRooms = new AvailableRooms(rooms, reservationsForTest);
            const checkIn = "2019-06-20";
            const checkOut = "2019-06-27";
            const expected = [];

            // when
            availableRooms.withDateDisponibility(checkIn, checkOut);

            //then
            assert.deepEqual(availableRooms.rooms, expected)
        });

        it('should return room 202 when room 203 and 204 have been reserved for this checkIn and checkOut with no reservation on this room', () => {
            //given
            const rooms = [{
                    floor: 2,
                    room: 202,
                    description: "1 queen size bed - Wi-Fi - private bathroom",
                    capacity: 2
                },
                {
                    floor: 2,
                    room: 203,
                    description: "1 king size bed + 3 single beds - A/C - Wi-Fi - private bathroom",
                    capacity: 5
                },
                {
                    floor: 2,
                    room: 204,
                    description: "1 single bed - Wi-Fi - shared bathroom",
                    capacity: 1
                }];
            const availableRooms = new AvailableRooms(rooms, reservationsForTest);
            const checkIn = "2019-06-20";
            const checkOut = "2019-06-27";
            const expected = [{
                floor: 2,
                room: 202,
                description: "1 queen size bed - Wi-Fi - private bathroom",
                capacity: 2
            }];

            //when
            availableRooms.withDateDisponibility(checkIn, checkOut);

            //then
            assert.deepEqual(availableRooms.rooms, expected);
        });

        it('should return room 202, 205 when room 203 and 204 have been reserved for this checkIn and checkOut', () => {
            //given
            const rooms = [
                {
                    floor: 2,
                    room: 202,
                    description: "1 queen size bed - Wi-Fi - private bathroom",
                    capacity: 2
                },
                {
                    floor: 2,
                    room: 203,
                    description: "1 king size bed + 3 single beds - A/C - Wi-Fi - private bathroom",
                    capacity: 5
                },
                {
                    floor: 2,
                    room: 204,
                    description: "1 single bed - Wi-Fi - shared bathroom",
                    capacity: 1
                },
                {
                    floor: 2,
                    room: 205,
                    description: "2 single beds - A/C - Wi-Fi - shared bathroom",
                    capacity: 2
                }
            ]
            const availableRooms = new AvailableRooms(rooms, reservationsForTest);
            const checkIn = "20-06-2019";
            const checkOut = "27-06-2019";
            const expected = [
                {
                    floor: 2,
                    room: 202,
                    description: "1 queen size bed - Wi-Fi - private bathroom",
                    capacity: 2
                },
                {
                floor: 2,
                room: 205,
                description: "2 single beds - A/C - Wi-Fi - shared bathroom",
                capacity: 2
                }
            ];

            //when
            availableRooms.withDateDisponibility(checkIn, checkOut);

            //then
            assert.deepEqual(availableRooms.rooms, expected);
        });
    });
});
