
function sequential_search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

function binary_search(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}


function bubble_sort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return arr;
  for (let i = 0; i < arr.length - 1; i++) {
    let done = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {// 两两比较， 大的放在后面， 因此每一次都可以将最大的数放在末尾. arr.length - i - 1
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        done = false;
      }
    //   console.log(i, j, arr);
    }
    if (done) {
      break;
    }
  }
  return arr;
}

console.log(bubble_sort([2, 1, 3, 5, 4, 0]));

function bubble_sort1(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;

    for (let i = 0 ; i < arr.length - 1; i++) {
        let done = true;
        for (let j = 0; j < arr.length - i - 1; j++ ) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                done = false;
            }
        }
        if (done) break;
    }
    return arr;
}

// console.log(bubble_sort([2, 1, 3, 5, 4, 0, 2, 8, 0, 2, 1, 6, 3, 7]));


function selection_sort(arr) {
    const {length } = arr;
    if (!Array.isArray(arr) || length <= 1) return arr;
    for (let i = 0; i < length  - 1; i++) {
        let min_index = i;
        for (let j = i + 1; j < length; j++) {
            if (arr[min_index] > arr[j]) {
                min_index = j;
            }
        }
        [arr[min_index], arr[i]] = [arr[i], arr[min_index]];
    }
    return arr;
}


console.log(selection_sort([2, 1, 3, 5, 4, 0, 2, 8, 0, 2, 1, 6, 3, 7]));




















