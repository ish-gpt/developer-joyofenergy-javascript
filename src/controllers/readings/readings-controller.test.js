const { getReadingsFromMeterId, setMeterReadings } = require("./readings-controller");
const { readingsData } = require("./readings.data");
const { readings } = require("./readings");
const { meters } = require("../../constants/meters/meters");

describe("readings", () => {
    it("should get readings with meter id", () => {
        const readingsForMeter = getReadingsFromMeterId({
            smartMeterId: meters.METER0,
        });

        expect(readingsForMeter).toEqual(readingsData[meters.METER0]);
    });

    it("should store readings in respective meter with meter id", () => {
        const { getReadings } = readings(readingsData);

        const originalLength = getReadings(meters.METER0).length;

        const fixture = {
            smartMeterId: meters.METER0,
            electricityReadings: [
                {
                    time: 981438113,
                    reading: 0.0503,
                },
                {
                    time: 982087047,
                    reading: 0.0213,
                },
            ],
        };

        setMeterReadings(fixture);

        const newLength = getReadings(meters.METER0).length;

        expect(originalLength + 2).toEqual(newLength);
    });
});
