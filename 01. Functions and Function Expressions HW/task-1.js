/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum(arr) {
    if (arr === undefined) {
        throw 'Error! Pass an array!';
    } else if (!arr.length) {
        return null;
    } else {
        if (!arr.every(function(item) {
                return !isNaN(item);
            })) {
            throw 'Error! All array elements must be convertible to numbers.';
        }
    }

    return arr.reduce(function(result, item) {
        return result += item * 1;
    }, 0);
}

module.exports = sum;
