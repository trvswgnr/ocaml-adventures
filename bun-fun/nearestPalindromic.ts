/*
Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.

The closest is defined as the absolute difference minimized between two integers.

Example 1:

Input: n = "123"
Output: "121"
Example 2:

Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.
 

Constraints:

1 <= n.length <= 18
n consists of only digits.
n does not have leading zeros.
n is representing an integer in the range [1, 10^18 - 1].
*/
function nearestPalindromic(n: string): string {
    if (n === "1") return "0";
    const len = n.length;
    let candidate1 = mirror(n)
    let diff1 = absDiff(BigInt(candidate1), BigInt(n));
    if (diff1 === BigInt(0)) {
        diff1 = BigInt(Number.MAX_SAFE_INTEGER);
    }
    let arr = n.split("");
    let i = Math.floor((len-1) / 2);
    while (i >= 0 && arr[i] === '0') {
        arr[i] = '9';
        i--;
    }
    if (i === 0 && arr[i] === '1') {
        arr.shift();
        let mid = Math.floor((arr.length - 1) / 2);
        arr[mid] = '9'
    } else {
        arr[i] = String(Number(arr[i]) - 1);
    }

    let candidate2 = mirror(arr.join(""));
    let diff2 = absDiff(BigInt(candidate2), BigInt(n));

    arr = n.split("")
    i = Math.floor((len-1) / 2);
    while (i >= 0 && arr[i] === '9') {
        arr[i] = '0';
        i--;
    }
    if (i < 0) {
        arr.unshift('1');
    } else {
        arr[i] = String(Number(arr[i]) + 1);
    }

    let candidate3 = mirror(arr.join(""))
    let diff3 = absDiff(BigInt(candidate3), BigInt(n));

    if (diff2 <= diff1 && diff2 <= diff3) {
        return candidate2;
    }

    if (diff1 <= diff3 && diff1 <= diff2) {
        return candidate1;
    }

    return candidate3;
};

function mirror(s: string): string {
    const arr = s.split("");
    let i = 0;
    let j = arr.length - 1;
    while (i < j) {
        arr[j] = arr[i];
        i++;
        j--;
    }
    return arr.join("");
}

function absDiff(a: bigint, b: bigint): bigint {
    return a > b ? a - b : b - a;
}