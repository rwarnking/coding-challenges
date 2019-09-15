function bubbleSort(array) {
    // change code below this line

    for (let i = 0; i < array.length; i++) {
      let swap = false;
      for (let index = 0; index < array.length - 1; index++) {
        if (array[index] > array[index+1]) {
            [array[index], array[index+1]] = [array[index+1], array[index]];
            swap = true;
        }
      }
      if (!swap)
        return array;
    }

    // change code above this line
    return array;
}

// test array:
console.log(bubbleSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));
