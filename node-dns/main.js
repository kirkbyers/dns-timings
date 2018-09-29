const dns = require("dns");

const testHost = process.env.TEST_HOST;
const countDefault = 10;
let count = Number(process.env.TEST_LENGTH ? process.env.TEST_LENGTH : countDefault);

if (testHost === undefined) {
    console.log("TEST_HOST must be set.");
    return
}

if (count === NaN) {
    count = countDefault;
}

console.log(`Testing DNS res for ${testHost} ${count} times.`);

for (let counter = count; counter > 0; counter--) {
    const resolveTimerLabel = `${testHost}-${counter} resolves`;
    const lookupTimerLabel = `${testHost}-${counter} lookup`;
    console.time(resolveTimerLabel);
    console.time(lookupTimerLabel);
    dns.resolve4(testHost, function (err, res) {
        if (err) {
            console.log(`There was an error resolving ${testHost}:`, err)
        }
        console.timeEnd(resolveTimerLabel);
    });
    dns.lookup(testHost, function (err, res) {
        if (err) {
            console.log(`There was an error lookingup ${testHost}:`, err)
        }
        console.timeEnd(lookupTimerLabel);
    });
}
