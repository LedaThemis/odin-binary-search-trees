interface TreeNodeType<T> {
  data: T;
  left: TreeNodeType<T> | null;
  right: TreeNodeType<T> | null;
}

/**
 * Node factory function
 */
function TreeNode<T>(data: T) {
  let left: TreeNodeType<T>['left'] = null;
  let right: TreeNodeType<T>['right'] = null;

  return {
    get data() {
      return data;
    },
    get left() {
      return left;
    },
    set left(value) {
      left = value;
    },
    get right() {
      return right;
    },
    set right(value) {
      right = value;
    },
  };
}

/**
 * Tree factory function
 */
export function Tree(array: number[]) {
  if (array.length === 0) {
    throw new Error('Array should not be empty.');
  }

  const root = buildTree(array);

  const insert = (node: TreeNodeType<number> | null, value: number) => {
    if (node === null) {
      return TreeNode(value);
    }
    if (value < node.data) {
      node.left = insert(node.left, value);
    } else {
      node.right = insert(node.right, value);
    }

    return node;
  };

  return {
    get root() {
      return root;
    },
    insert: (value: number) => {
      insert(root, value);
    },
  };
}

/**
 * Turns an array of data into a balanced array
 */
function buildTree(array: number[]): TreeNodeType<number> {
  array.sort((a, b) => a - b);
  array = array.filter((v, i, a) => a.indexOf(v) === i);

  function constructTree(array: number[], start: number, end: number) {
    if (end <= start) {
      return null;
    } else {
      const middle = Math.floor((start + end) / 2);

      const root = TreeNode(array[middle]);
      root.left = constructTree(array, start, middle);
      root.right = constructTree(array, middle + 1, end);

      return root;
    }
  }

  return constructTree(array, 0, array.length)!;
}

export function prettyPrint<T>(node: TreeNodeType<T>, prefix = '', isLeft = true) {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const tree = Tree([1, 2, 3]);

tree.insert(0);
