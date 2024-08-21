/**
 * @import {NormalTree} from '../types/data_type'
 */

/**
 * 一个普通的树
 *      a
 *   b     c
 * d e s  f g
 * @type {NormalTree<string>}
 */
const normal_tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        {
          val: "d",
          children: null,
        },
        {
          val: "e",
          children: null,
        },
        {
          val: "s",
          children: null,
        },
      ],
    },
    {
      val: "c",
      children: [
        {
          val: "f",
          children: null,
        },
        {
          val: "g",
          children: null,
        },
      ],
    },
  ],
};

/**
 * 深度优先遍历
 * 1. 访问根节点
 * 2. 访问对根节点的子节点
 * @param {NormalTree<string>} tree
 */
const dfs = (tree) => {
  const fn = (t) => {
    t.children &&
      t.children.forEach((e) => {
        console.log(e.val);
        fn(e);
      });
  };
  fn(tree);
  console.log(tree.val);
};

/**
 * 广度优先遍历
 * 1. 将根节点放入队列
 * 2. 进入循环
 * 3. 从队列中将根节点取出来访问, 然后将子节点全部放入队列
 * @param {NormalTree<string>} tree
 */
const bfs = (tree) => {
  const q = [tree];
  while (q.length > 0) {
    const n = q.shift();
    console.log(n.val);
    if (n.children) n.children.forEach((c) => q.push(c));
  }
};

// dfs(normal_tree);
bfs(normal_tree)
