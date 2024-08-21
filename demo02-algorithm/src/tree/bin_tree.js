/**
 * @import {BinTree} from '../types/data_type'
 */

/**
 * @type {BinTree<string>}
 */
const bin_tree = {
  val: "a",
  left: {
    val: "b",
    left: {
      val: "d",
    },
    right: {
      val: "e",
    },
  },
  right: {
    val: "c",
    left: {
      val: "f",
    },
    right: {
      val: "g",
    },
  },
};

/**
 * 先序遍历 (递归)
 * 预期结果: a b d e c f g
 * @param {BinTree<string>} tree
 */
const pre_order_recursion = (tree) => {
  if (!tree) return;
  console.log(tree.val);
  pre_order_recursion(tree.left);
  pre_order_recursion(tree.right);
};

/**
 * 先序遍历 (迭代)
 * 预期结果: a b d e c f g
 * @param {BinTree<string>} tree
 */
const pre_order_iter = (tree) => {
  if (!tree) return;
  const stack = [tree];
  while (stack.length > 0) {
    const n = stack.pop();
    console.log(n.val);
    // 因为栈结构, 所以后入先出
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
};

/**
 * 中序遍历 (递归)
 * 预期结果 d b e a f c g
 * @param {BinTree<string>} tree
 */
const in_order_recursion = (tree) => {
  if (!tree) return;
  in_order_recursion(tree.left);
  console.log(tree.val);
  in_order_recursion(tree.right);
};

/**
 * 中序遍历 (迭代)
 * 预期结果 d b e a f c g
 * @param {BinTree<string>} tree
 */
const in_order_iter = (tree) => {
  if (!tree) return;
  const stack = [];
  let p = tree;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
};

/**
 * 后序遍历 (递归)
 * 预期结果 d e b f g c a
 * @param {BinTree<string>} tree
 */
const post_order_recursion = (tree) => {
  if (!tree) return;
  post_order_recursion(tree.left);
  post_order_recursion(tree.right);
  console.log(tree.val);
};

/**
 * 后序遍历 (迭代)
 * 预期结果 d e b f g c a
 * @param {BinTree<string>} tree
 */
const post_order_iter = (tree) => {
    if (!tree) return;
    const stack = [tree];
    const output_stack = [];
    while (stack.length) {
        const n = stack.pop();
        output_stack.push(n);
        if (n.left) stack.push(n.left);
        if (n.right) stack.push(n.right);
    }

    while (output_stack.length) {
        const n = output_stack.pop();
        console.log(n.val);
    }
}



/**
 * 二叉树的最大深度
 * 给一个二叉树, 要求找到它的最大深度, O(n)时间复杂度, O(n)空间复杂度。
 * 
 * @param {BinTree<string>} tree
 */
const max_depth = (tree) => {
    let depth = 0;
    /**
     * 如果左节点和右节点不为undefined, 比较当前深度, 取最大值
     * @param {BinTree<string>} n 
     * @param {number} l 
     * @returns 
     */
    const dfs = (n, l) => {
        if (!n) return;
        if (!n.left && !n.right) {
            depth = Math.max(depth, l);
        }
        dfs(n.left, l+1);
        dfs(n.right, l+1);
    }
    dfs(tree, 1);
    return depth;
}

/**
 * 二叉树的最小深度
 * 给一个二叉树, 找到它的最小深度
 * 
 * @param {BinTree<string>} tree
 */
const min_depth = (tree) => {
    if (!tree) return 0;

    /**
     * 广度优先遍历
     * @param {BinTree<string>} n 
     * @param {number} l 
     */
    const bfs = (n, l) => {
        /**
         * @type {[[BinTree<string>, number]]}
         */
        const q = [[n, l]];
        while (q.length > 0) {
            const [t, l] = q.shift();
            console.log(t.val);
            if (t.left === undefined && t.right === undefined) {
                return l;
            }
            if (t.left) q.push([t.left, l + 1]);
            if (t.right) q.push([t.right, l + 1]);
        }

    }
    const depth = bfs(tree, 1)
    console.log("min depth is ", depth);
    return depth;
}


/**
 * 二叉树的层序遍历
 * 给定一个二叉树, 想要返回[[a], [b, c], [d, e, f, g]]
 * @param {BinTree<string>} tree
 */
const level_order = (tree) => {
    if (!tree) return [];
    
    /**
     * 广度优先遍历的同时, 将每一层存入res里
     * @param {BinTree<string>} root
     */
    const bfs = (root) => {
        const q = [root];
        const res = [];
        while (q.length > 0) {
            let len = q.length;
            res.push([]);
            // 除了root节点, 每层两个节点, len的最大值为2
            while(len--) {
                const n = q.shift();
                res[res.length - 1].push(n.val);
                if (n.left) q.push(n.left);
                if (n.right) q.push(n.right);
            }
        }
        return res;
    }
    return bfs(tree);

}

console.log(level_order(bin_tree))

// min_depth(bin_tree);

// post_order_recursion(bin_tree);
// post_order_iter(bin_tree);

// in_order_iter(bin_tree);
// in_order_recursion(bin_tree);

// pre_order_recursion(bin_tree)
// pre_order_iter(bin_tree)