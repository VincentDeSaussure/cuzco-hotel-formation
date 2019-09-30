const assert = require('assert');
const MakeAResearch = require('../app/usecase/MakeAResearch');
describe('make a research', () => {

    const roomsForTest = [
        {
            floor: 2,
            room: 201,
            description: "1 king size bed - A/C - Wi-Fi - private bathroom",
            capacity: 2
        },
        {
            floor: 2,
            room: 202,
            description: "3 king size bed - A/C - Wi-Fi - private bathroom",
            capacity: 5
        }
    ];

    const reservationForTest = [
        {
            checkIn: "2019-06-20",
            checkOut: "2019-06-22",
            room: 202
        }
    ]

    describe('execute', () => {
        it('should return no room for capacity 5, checkIn 2019-06-20 and checkOut 2019-06-22', () => {
            // given
            const makeAResearch = new MakeAResearch(roomsForTest, reservationForTest);
            const guestNumber = 5;
            const checkIn = "2019-06-20";
            const checkOut = "2019-06-22";
            const expected = [];

            const result = makeAResearch.execute(guestNumber, checkIn, checkOut);

            assert.deepEqual(result, expected);
        });
        it('should return room 202 for capacity 5, checkIn 2019-06-15 and checkOut 2019-06-18', () => {
            // given
            const makeAResearch = new MakeAResearch(roomsForTest, reservationForTest);
            const guestNumber = 5;
            const checkIn = "2019-06-15";
            const checkOut = "2019-06-18";
            const expected = [{
                floor: 2,
                room: 202,
                description: "3 king size bed - A/C - Wi-Fi - private bathroom",
                capacity: 5
            }];

            const result = makeAResearch.execute(guestNumber, checkIn, checkOut);

            assert.deepEqual(result, expected);
        });
    });
});