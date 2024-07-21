const array = [2, 4, [22, "test"], false, null, { a: 2 }, [22, "test"], null];

function hasDuplicates(arr) {
    const anotherArray = [];
    for (const item of arr) {
        const str = JSON.stringify(item);//convert each item to string.
        if (anotherArray.includes(str)) {
            return "Yes!, the array has duplicates.";
        } else { anotherArray.push(str); }
    }
    return "No!, the array has not duplicates.";
}
const x = hasDuplicates(array);
console.log(x);
