const IntervalDateChecker = require('../app/domain/IntervalDateChecker');
const assert = require('assert');

describe('IntervalDateChecker', () => {
    describe('valid checkIn', () => {
        it('should return true when the date is out of interval', () => {
            // Given
            const interval = ["2019-06-21", "2019-06-27"]
            const checkIn = "2019-06-20";
            const intervalDateChecker = new IntervalDateChecker();

            // When
            const result = intervalDateChecker.validCheckIn(checkIn, interval);

            // Then
            assert.deepEqual(result, true);
        })
        it('should return false when the date is in of interval', () => {
            // Given
            const interval = ["2019-06-21", "2019-06-27"]
            const checkIn = "2019-06-22";
            const intervalDateChecker = new IntervalDateChecker();

            // When
            const result = intervalDateChecker.validCheckIn(checkIn, interval);

            // Then
            assert.deepEqual(result, false);
        })
    })
    describe('valid checkOut', () => {
        it('should return true when the date is out of interval', () => {
            // Given
            const interval = ["2019-06-21", "2019-06-27"]
            const checkOut = "2019-06-28";
            const intervalDateChecker = new IntervalDateChecker();

            // When
            const result = intervalDateChecker.validCheckout(checkOut, interval);

            // Then
            assert.deepEqual(result, true);
        })
        it('should return false when the date is out of interval', () => {
            // Given
            const interval = ["2019-06-21", "2019-06-27"]
            const checkOut = "2019-06-22";
            const intervalDateChecker = new IntervalDateChecker();

            // When
            const result = intervalDateChecker.validCheckout(checkOut, interval);

            // Then
            assert.deepEqual(result, false);
        })
    })
    describe('validInterval', () => {
        it('should return true when the interval is valid for received checkIn and checkOut', () => {
            // Given
            const interval = ["2019-06-21", "2019-06-27"];
            const checkIn = "2019-06-28";
            const checkOut = "2019-06-30";
            const intervalDateChecker = new IntervalDateChecker();

            // When
            const result = intervalDateChecker.validInterval(checkOut, checkIn, interval);

            // Then
            assert.deepEqual(result, true);
        })
    })
});
