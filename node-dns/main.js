const dns = require("dns");
const { promisify } = require("util");
const dnsResolve = promisify(dns.resolve4);
const dnsLookup = promisify(dns.lookup);

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

async function loopResolve(resolveRetry) {
    const resolveTimerLabel = `${testHost}-${resolveRetry} resolves`;
    console.time(resolveTimerLabel);
    return dnsResolve(testHost).then(async (res) => {
        console.log(`Resolved ${testHost} to`, res);
        console.timeEnd(resolveTimerLabel);
        if (resolveRetry > 0) {
            await loopResolve(resolveRetry - 1);
            return
        }
    }).catch((err) => {
        console.log(`There was an error resolving ${testHost}:`, err);
    });
}

async function loopLookup(lookupRetry) {
    const lookupTimerLabel = `${testHost}-${lookupRetry} lookups`;
    console.time(lookupTimerLabel);
    return dnsLookup(testHost).then(async (res) => {
        console.log(`Lookupd ${testHost} to`, res);
        console.timeEnd(lookupTimerLabel);
        if (lookupRetry > 0) {
            await loopLookup(lookupRetry - 1);
            return
        }
    }).catch(err => {
        console.log(`There was an error resolving ${testHost}:`, err)
    });
}

const mode = process.env.MODE;

if (mode === "resolve" || mode === undefined) {
    loopResolve(count);
} else if (mode === "lookup") {
    loopLookup(count);
} else {
    console.log(`MODE "${mode}" unsupported.`)
}
