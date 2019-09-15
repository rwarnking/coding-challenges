/**
 * Iterates over all entrys in the first array - O(n)
 */
function searchElemPos(array, elem) {
    let index = -1;

    // TODO if smth was found break the loop
    array.forEach(function(e, i) {
        if (e[1].localeCompare(elem) == 0) {
            index = i;
        }
    });
    return index;
}

/**
 * For each entry in array2 every entry from array1 is looked at
 * atleast once - O(n*m)
 */
function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    let wasPushed = false;

    // O(n*m)
    arr2.forEach(function(elem, i) {
        // let pos = arr1.indexOf(elem);
        let pos = searchElemPos(arr1, elem[1]);

        if (pos != -1)
            arr1[pos][0]+=elem[0];
        else {
            // TODO push it directly at the right position?!
            arr1.push(elem);
            wasPushed = true;
        }
    });

    if (wasPushed) {
        // O((n+m) * log(n+m))
        arr1.sort(function(a, b) {
            var nameA = a[1].toUpperCase();
            var nameB = b[1].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // Entrys are identical
            return 0;
        });
    }

    return arr1;
}

// Example inventory lists
let curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

let newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

// console.log(Array.isArray(updateInventory(curInv, newInv)));
console.log(updateInventory(curInv, newInv));
// console.log(
//     updateInventory(
//     [],
//     [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]
// ));
