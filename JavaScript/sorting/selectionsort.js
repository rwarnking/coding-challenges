function selectionSort(array) {
    // change code below this line

    for (let pos = 0; pos < array.length; pos++) {
      let min_pos = pos;
      let min_value = array[min_pos];
      for (let i = pos; i < array.length; i++) {
        if (array[i] < min_value) {
          min_pos = i;
          min_value = array[i];
        }
      }
      [array[pos], array[min_pos]] = [array[min_pos], array[pos]];

    }
    // change code above this line
    return array;
  }

  // test array:
  // [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]
