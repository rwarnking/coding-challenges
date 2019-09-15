function insertionSort(array) {
  // change code below this line

  for (let pos = 1; pos < array.length; pos++) {
    let t_pos = pos;
    for (let f_pos = pos - 1; f_pos > 0; f_pos--) {
      if (array[t_pos] < array[f_pos]) {
        [array[t_pos], array[f_pos]] = [array[f_pos], array[t_pos]];
        t_pos--;
      }
    }
  }

  // change code above this line
  return array;
}

// test array:
// [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]
