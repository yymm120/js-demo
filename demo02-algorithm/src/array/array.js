
const arr1 = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

const arr2 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// 添加一个元素到末尾
arr1.push("0");
// 添加一个元素到开头
arr1.unshift("1");
// 添加一个元素在指定位置
arr1.splice(1, 0, "1");

// 删除末尾元素
arr1.pop()
// 删除开头元素
arr1.shift();
// 删除指定位置元素
arr1.splice(1, 1);

// 修改指定位置元素
arr1.splice(1, 1, "A");
