/*
Write a function which receives 4 digits and returns the latest time of day that can be built with those digits.

The time should be in HH:MM format.

Examples:
```
digits: 1, 9, 8, 3 => result: "19:38"
digits: 9, 1, 2, 5 => result: "21:59" ("19:25" is also a valid time, but 21:59 is later)
```
Notes
Result should be a valid 24-hour time, between 00:00 and 23:59.
Only inputs which have valid answers are tested.
*/

function generatePermutations(array: TimeTuple, start: number): TimeTuple[] {
    const arr = array.slice() as TimeTuple;

    if (start === arr.length - 1) {
        return [arr];
    }

    return arr.map((_, i) => {
        [arr[start], arr[i]] = [arr[i], arr[start]];
        return generatePermutations(arr, start + 1);
    }).flat();
}

function isValidTime([hTens, hOnes, mTens, mOnes]: TimeTuple): boolean {
    return (hTens * 10 + hOnes) < 24 && (mTens * 10 + mOnes) < 60;
}

function ascending(a: TimeTuple, b: TimeTuple): 1 | -1 {
    const [aHTens, aHOnes, aMTens, aMOnes] = a;
    const [bHTens, bHOnes, bMTens, bMOnes] = b;
    const timeA = aHTens * 1000 + aHOnes * 100 + aMTens * 10 + aMOnes;
    const timeB = bHTens * 1000 + bHOnes * 100 + bMTens * 10 + bMOnes;
    return timeA > timeB ? 1 : -1;
}

function formatTime([hTens, hOnes, mTens, mOnes]: TimeTuple): string {
    return `${hTens}${hOnes}:${mTens}${mOnes}`;
}

function latestClock(a: number, b: number, c: number, d: number): string {
    // generate permutations
    // -> filter out invalid times
    // -> sort times ascending (latest time last)
    // -> get last which will be latest
    // format time (if no time then return "00:00")
    const time = generatePermutations([a,b,c,d], 0)
        .filter(isValidTime)
        .sort(ascending)
        .pop();
    return time ? formatTime(time) : "00:00";
}

type TimeTuple = [number, number, number, number];

it("Basic tests", () => {
    doTest(1, 9, 8, 3, "19:38");
    doTest(9, 1, 2, 5, "21:59");
    doTest(1, 2, 8, 9, "19:28");
    doTest(0, 0, 0, 0, "00:00");
    doTest(2, 4, 0, 0, "20:40");
});

function it(description: string, fn: () => void) {
    console.log(description);
    fn();
}

function doTest(a: number, b: number, c: number, d: number, expected: string) {
    expect(latestClock(a, b, c, d)).toBe(expected);
}

function expect(actual: any) {
    return {
        toBe(expected: any) {
            if (actual === expected) {
                console.log("passed!");
                return;
            }
            console.error(`failed: expected ${expected}, but got ${actual}`);
        },
    };
}
