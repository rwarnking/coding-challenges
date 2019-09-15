/////////////////////////
// HELPER FUNCTIONS
/////////////////////////
/**
 * Merge (SortedConcat)
 * Complexity O(n1+n2)
 * Iterate over the elements of both arrays and select the smaller one each time
 */
function merge(array1, array2, removeDoubles=false) {
  let result = [];
  for (let it1 = 0, it2 = 0; it1 < array1.length || it2 < array2.length;) {
    if (array1[it1] < array2[it2] || !array2[it2]) {
      result.push(array1[it1++]);
    }
    else if (array1[it1] > array2[it2] || !array1[it1]) {
      result.push(array2[it2++]);
    }
    else {
      if (removeDoubles) {
        result.push(array1[it1++]);
        it2++;
      } else {
        result.push(array1[it1++]);
        result.push(array2[it2++]);
      }
    }
  }
  return result;
}

function generateArray(elementCount=5, maxNumber=100, minNumber=1) {
  let randomIntArray = [];
  for (let i = 0; i < elementCount; i++) {
    randomIntArray.push(Math.round(Math.random()*maxNumber));
  }
  return randomIntArray;
}

/**
 * This function does not work without problems on the website, since same for-loop are
 * canceled before the limit is reached. Therefore the timed results are wrong.
 * for example iterationcount > 50
 * @param {*} functionArgument
 */
function measureTime(functionArgument) {
  let iterationCount = 5;
  let arrayCount = 5;
  let elementCount = 5;

  let timeSum = 0;
  for (let i = 0; i < iterationCount; i++) {
    // let argumentArrays = [
    //   [76,83,54,45,54],
    //   [2,65,3,81,95],
    //   [11,72,4,61,45],
    //   [96,37,63,24,6],
    //   [55,20,8,87,8]
    // ];
    let argumentArrays = [];
    for (let j = 0; j < arrayCount; j++) {
      argumentArrays.push(generateArray(elementCount));
    }
    let t0 = performance.now();

    // Debug
    // console.log("Input 1: " + argumentArrays[0]);
    // console.log("Input 2: " + argumentArrays[1]);
    // console.log("Iteration: " + i + " | result: " + functionArgument(argumentArrays));
    functionArgument(argumentArrays);

    let t1 = performance.now();
    timeSum += (t1 - t0);
    // console.log("diff: ", t1-t0, timeSum)
  }

  return timeSum/iterationCount;
}

/////////////////////////
// FUNCTIONS FOR Symmetric Diff
/////////////////////////

function symForAll(args) {
  let result = args[0];

  // Iterate over all arrays that are given
  // and call the symForTwo-function such that the operator is always applied to two arrays - O(m)
  for (let arrayIt = 0; arrayIt < args.length - 1; ++arrayIt) {
    result = symForTwo(result, args[arrayIt+1]);
  }

  // Should it be sorted?
  // result.sort(function(a, b) {
  //   return a - b;
  // });

  return result;
}

/**
 * Should be O(n^2) ???
 */
function symForTwo(array1, array2) {
  let result = [];

  // O(l_i^2)
  // Loop over all elements from the first array - O(l_i)
  for (let arg2 = 0; arg2 < array1.length; ++arg2) {
    let flag = true;

    // Loop over all elements of the secound array - O(l_i)
    for (let arg3 = 0; arg3 < array2.length; ++arg3) {

      // Delete entrys that are in both arrays
      if (array1[arg2] == array2[arg3]) {
        flag = false;
        // TODO is the original changed?
        delete array2[arg3];
      }
    }
    if (flag) {
      result.push(array1[arg2]);
    }
  }

  // O(l_i)
  for (let arg3 = 0; arg3 < array2.length; ++arg3) {
    if (array2[arg3])
      result.push(array2[arg3]);
  }

  // TODO O(?)
  // Remove doubles from the final array
  // Happens when array one contains one number multiple times
  return result.filter((e, i) => result.indexOf(e) >= i);
}

/**
 * complexity abreviations
 * n = elementcount (sum over all elements in all arrays)
 * l = elements per group
 * g = arraycount (groups)
 */
function symToOneArray(args, isSorted=false) {
  let result = [];
  // let result = Array.from(arguments); // does not result in one Array but multiple
  // let result = [...args]; // does not result in one Array but multiple
  // does result in one Array but it is not possible to get rid of doublicates on the fly
  // Array.from(args).forEach(function(elem, i) {
  //   result.push(...elem);
  // });

  // for (let array in args) {} // does not improve anything since it returns the array-indices

  // Concat all arrays to one large array - O(g * l) + O(n*log(n)) = O(n) + O(n*log(n)) => O(n*log(n))
  // Iterate over all arrays that are given - O(g)
  for (let arrayIt = 0; arrayIt < args.length; ++arrayIt) {
    // If not already sorted, sort each small array
    // TODO which complexity is this? O(n*log(n))?
    // TODO isSorted test as function
    if (!isSorted) {
      args[arrayIt].sort(function(a, b) {
        return a - b;
      });
    }

    // Iterate over all elements in the array now whatched
    // to lose the doublicates in one specific array
    // given that the arrays are ordered from the beginning - O(l)
    let tmp = [];
    for (let elemIt = 0; elemIt < args[arrayIt].length; ++elemIt) {
      if (elemIt+1 == args[arrayIt].length ||
        args[arrayIt][elemIt] != args[arrayIt][elemIt+1]
      ) {
        tmp.push(args[arrayIt][elemIt]);
      }
    }

    if (true) {
      result = result.concat(tmp);
    }
    else {
      // Since we iterate each time over all elements in the result array it is O(n*g)
      // TODO merge two neighbouring groups to improve complexity
      result = merge(tmp, result);
    }
  }

  // Hopfully n*log(n)
  result.sort(function(a, b) {
    return a - b;
  });

  // Count how often an element is inside the array to decide whether it should be pushed. - O(n)
  let finalResult = [];
  for (let elemIt = 0; elemIt < result.length; ++elemIt) {
    // Iterate over the array an look at the next x-fields,
    // if the content is the same then increase the doubleIterator.
    let doubIt = elemIt+1;
    for (; doubIt < result.length && result[elemIt] == result[doubIt]; ++doubIt) {}
    // Take the difference to get the amount.
    // Push all Items that have an odd count of entries
    if ((doubIt - elemIt) % 2 == 1) {

      finalResult.push(result[elemIt]);
    }
    elemIt = doubIt-1;
  }

  return finalResult;
}

function symAllInOne(args, isSorted=false) {
  let iters = new Array(args.length);
  iters.fill(0, 0, args.length);
  console.log(iters);

  // Iterate all arrays at the same time and merge them
  // till this point i dont have a solution that is really better then the other ones are

  for (let arrayIt = 0; arrayIt < args.length; ++arrayIt) {
    // If not already sorted, sort each small array
    // TODO which complexity is this? O(n*log(n))?
    // TODO isSorted test as function
    if (!isSorted) {
      args[arrayIt].sort(function(a, b) {
        return a - b;
      });
    }
  }
}

/**
 * OBACHT: This function supports only positive integer Numbers in the arrays!
 */
function symCountingElements(args) {
  // TODO use a map ?!
  let counts = [];
  let result = [];

  for (let arrayIt = 0; arrayIt < args.length; ++arrayIt) {
    for (let elemIt = 0; elemIt < args[arrayIt].length; ++elemIt) {
      let elem = args[arrayIt][elemIt];

      if (counts[elem] && Math.sign(counts[elem]) != Math.sign(-1)) {
        counts[elem]++;
        counts[elem]*=-1;
      }
      else if (!counts[elem] || Math.sign(counts[elem]) != Math.sign(-1)) {
        counts[elem] = 1;
        counts[elem]*=-1;
      }
    }
    for (let elemIt = 0; elemIt < args[arrayIt].length; ++elemIt) {
      let elem = args[arrayIt][elemIt];
      counts[elem]=Math.abs(counts[elem]);
    }
  }

  counts.forEach(function(elem, i) {
    if (Math.abs(elem) % 2 == 1)
      result.push(i);
  });

  return result;
}

/////////////////////////
// SWITCH FUNCTION
/////////////////////////
function sym(args) {

  let functionSelector = 0;
  // Decide if the argument-arrays are sorted from the beginning, that allows for optimizations.
  let isSorted = false;

  switch (functionSelector) {
    case 0: {
      return symForAll(arguments);
    }
    case 1: {
      return symToOneArray(arguments, isSorted);
    }
    case 2: {
      return symCountingElements(arguments);
    }
    default: {
      return symAllInOne(arguments, isSorted);
    }
  }

}

console.log("Calculating the symmetric difference took " +
  measureTime(symForAll) +
  " milliseconds.");

console.log("Calculating the symmetric difference took " +
  measureTime(symToOneArray) +
  " milliseconds.");

console.log("Calculating the symmetric difference took " +
  measureTime(symCountingElements) +
  " milliseconds.");

// console.log(
//   sym(
//     [76,83,54,45,54],
//     [2,65,3,81,95],
//     [11,72,4,61,45],
//     [96,37,63,24,6],
//     [55,20,8,87,8]
//   )
// );
// console.log(sym([1, 2, 3], [5, 2, 1, 4, 5]));
// console.log(sym([1, 2, 3, 3], [5, 2, 1, 4]));
// console.log(sym([1, 2, 5], [2, 3, 5]));
// console.log(sym([1, 3],  [3, 4, 5]));
// console.log(sym([1, 2, 5], [2, 3, 5], [3, 4, 5]));
// console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]));
