function genAccountNumber() {
    let nums = "012345678"
    let acc = nums.split("").sort(() => Math.random() - 0.5).join("")
    return acc
}

module.exports = { genAccountNumber };