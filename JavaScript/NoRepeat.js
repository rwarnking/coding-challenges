// /**
//  *
//  * @param {String} str
//  */
// function permAlone(str) {
//     let letterCounts = [];

//     console.log(str);

//     for (let i = 0; i < str.length; i++) {
//         let charCode_a = 'a'.charCodeAt();
//         if (letterCounts[str.charCodeAt(i) - charCode_a])
//             letterCounts[str.charCodeAt(i) - charCode_a]++;
//         else
//             letterCounts[str.charCodeAt(i) - charCode_a] = 1;
//     }

//     console.log(letterCounts);

//     // String.fromCharCode(65)
//     let combinations = [];
//     return combinations.length;
// }

function pushInString(array, str, pos) {
    let count = 0;
    console.log(array[0] + " " + array[1] + " " + array[2] + "   " +pos);

    if (str.length > pos) {
      let charCode = str.charCodeAt(pos);
      for (let i = 0; i < str.length; i++) {
        if (((i - 1 < 0 || array[i-1] != charCode) &&
            (i + 1 > str.length || array[i+1] != charCode)) && array[i] == undefined) {
          array[i] = charCode;
          count += pushInString(array, str, pos+1);
          array[i] = undefined;
        }
      }
      return count;
    } else {
      return 1;
    }
  }

  /**
   *
   * @param {String} str
   */
  function permAlone(str) {
      let newString = [];
      for (let i = 0; i < str.length; i++) {
        newString[i] = undefined;
      }
      console.log(newString);

      let result = pushInString(newString, str, 0);

      return result;
  }

  console.log(permAlone('aab'));
