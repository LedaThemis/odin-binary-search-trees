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

  let root = buildTree(array);

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

  const isLeafNode = (node: TreeNodeType<number> | null) => node?.left === null && node?.right === null;

  const hasLeftNode = (node: TreeNodeType<number> | null) => node?.left !== null;
  const hasRightNode = (node: TreeNodeType<number> | null) => node?.right !== null;

  const findInOrderSuccessor = (node: TreeNodeType<number>): TreeNodeType<number> => {
    if (node.left !== null) {
      return findInOrderSuccessor(node.left);
    } else {
      return node;
    }
  };

  const deleteNode = (node: TreeNodeType<number>) => {
    if (isLeafNode(node)) {
      return null;
    } else if (hasLeftNode(node) && isLeafNode(node.left) && !hasRightNode(node)) {
      // Left node is leaf and is the only node
      return node.left;
    } else if (hasRightNode(node) && isLeafNode(node.right) && !hasLeftNode(node)) {
      // Right node is leaf and is the only node
      return node.right;
    } else {
      // Node has two children nodes

      // Find inorder successor
      const inOrderSuccessor = findInOrderSuccessor(node.right as TreeNodeType<number>);

      // Recursively delete it, so that its children will be attached to correct place
      deleteValue(root, inOrderSuccessor.data);

      // Replace node with new node that has in order successor data
      const newNode = TreeNode(inOrderSuccessor.data);
      newNode.left = node.left;
      newNode.right = node.right;

      return newNode;
    }
  };

  const deleteValue = (node: TreeNodeType<number> | null, value: number) => {
    if (node === null) {
      return null;
    }

    if (node.data === value) {
      return deleteNode(node);
    } else if (value < node.data) {
      node.left = deleteValue(node.left, value);
    } else if (value > node.data) {
      node.right = deleteValue(node.right, value);
    }

    return node;
  };

  const findValue = (node: TreeNodeType<number> | null, value: number): TreeNodeType<number> | null => {
    if (node === null) {
      return null;
    }

    if (node.data === value) {
      return node;
    } else if (value < node.data) {
      return findValue(node.left, value);
    } else {
      return findValue(node.right, value);
    }
  };

  const levelOrderTraversal = (node: TreeNodeType<number> | null) => {
    const queue: TreeNodeType<number>[] = [];
    const result: TreeNodeType<number>[] = [];

    if (node === null) {
      return queue;
    }

    queue.push(node);

    while (queue.length !== 0) {
      let current = queue[0];

      result.push(current);

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }

      queue.shift();
    }

    return result;
  };

  return {
    get root() {
      return root;
    },
    insert: (value: number) => {
      insert(root, value);
    },
    delete: (value: number) => {
      // Update root, necessary when deleting root node
      root = Object.assign({}, deleteValue(root, value));
    },
    find: (value: number) => {
      return findValue(root, value);
    },
    levelOrder: (fn?: (node: TreeNodeType<number>) => any) => {
      const result = levelOrderTraversal(root);

      if (fn) {
        return result.map(fn);
      } else {
        return result;
      }
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
