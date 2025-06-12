// solution 1: Using the Mathematical Formula
var sum_to_n_1 = function(n) {
    return n * (n + 1) / 2;
};

// solution 2: Using a For Loop
var sum_to_n_2 = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// solution 3: Using Recursion
var sum_to_n_3 = function(n) {
    if (n <= 1) return n;
    return n + sum_to_n_3(n - 1);
};

console.log(sum_to_n_1(5)); // 15
console.log(sum_to_n_2(5)); // 15
console.log(sum_to_n_3(5)); // 15