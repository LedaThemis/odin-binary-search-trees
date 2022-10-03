import { prettyPrint, Tree, TreeNode } from '..';

test('should render tree from provided array (two-levels)', () => {
  const tree = Tree([1, 2, 3]);

  expect(tree.root.data).toBe(2);
  expect(tree.root.left?.data).toBe(1);
  expect(tree.root.right?.data).toBe(3);
});

test('should render tree from provided array (three-levels)', () => {
  const tree = Tree([1, 2, 3, 4, 5]);

  expect(tree.root.left?.left?.data).toBe(1);
  expect(tree.root.left?.data).toBe(2);
  expect(tree.root.data).toBe(3);
  expect(tree.root.right?.data).toBe(5);
  expect(tree.root.right?.left?.data).toBe(4);
});

test('should insert value in correct place', () => {
  const tree = Tree([1, 2, 3]);

  tree.insert(0);

  expect(tree.root.left?.left?.data).toBe(0);
  expect(tree.root.left?.data).toBe(1);
  expect(tree.root.data).toBe(2);
  expect(tree.root.right?.data).toBe(3);
});

test('should delete node if it is a leaf node', () => {
  const tree = Tree([1, 2, 3]);

  tree.delete(1);

  expect(tree.root.data).toBe(2);
  expect(tree.root.right?.data).toBe(3);
});

test('should delete node if it has only one child (left)', () => {
  const tree = Tree([1, 2, 3]);

  tree.insert(0);

  tree.delete(1);

  expect(tree.root.data).toBe(2);
  expect(tree.root.left?.data).toBe(0);
  expect(tree.root.right?.data).toBe(3);
});

test('should delete node if it has only one child (right)', () => {
  const tree = Tree([1, 2, 3]);

  tree.insert(4);

  tree.delete(3);

  expect(tree.root.data).toBe(2);
  expect(tree.root.left?.data).toBe(1);
  expect(tree.root.right?.data).toBe(4);
});

test('should delete node if it has two children and inorder successor does not have children', () => {
  const tree = Tree([1, 2, 3]);

  tree.delete(2);

  expect(tree.root.data).toBe(3);
  expect(tree.root.left?.data).toBe(1);
  expect(tree.root.right).toBe(null);
});

test('should delete node if it has two children and inorder successor has children', () => {
  const tree = Tree([1, 2, 3]);

  tree.insert(4);

  tree.delete(2);

  expect(tree.root.data).toBe(3);
  expect(tree.root.left?.data).toBe(1);
  expect(tree.root.right?.data).toBe(4);
});

test('should return found node', () => {
  const tree = Tree([1, 2, 3]);

  const nodeValue = 3;

  const foundNode = tree.find(nodeValue);

  expect(foundNode?.data).toBe(nodeValue);
  expect(foundNode?.left).toBe(null);
  expect(foundNode?.right).toBe(null);
});

test('should return found node with left and right nodes', () => {
  const tree = Tree([1, 3, 5]);

  tree.insert(4);
  tree.insert(6);

  const nodeValue = 5;

  const foundNode = tree.find(nodeValue);

  expect(foundNode?.data).toBe(nodeValue);
  expect(foundNode?.left?.data).toBe(4);
  expect(foundNode?.right?.data).toBe(6);
});

test('should return null if node is not found', () => {
  const tree = Tree([1, 2, 3]);

  const nodeValue = 5;

  const foundNode = tree.find(nodeValue);

  expect(foundNode).toBe(null);
});

test('should traverse tree and return list of nodes if no function is provided (level order)', () => {
  const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

  const levelOrder = tree.levelOrder();

  expect(levelOrder.map((n) => n.data)).toStrictEqual([4, 2, 6, 1, 3, 5, 7]);
});

test('should traverse tree and return list of nodes with function applied if function is provided (level order)', () => {
  const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

  const levelOrder = tree.levelOrder((n) => n.data);

  expect(levelOrder).toStrictEqual([4, 2, 6, 1, 3, 5, 7]);
});

test('should traverse tree and return list of nodes if no function is provided (preorder)', () => {
  const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

  const preorder = tree.preorder();

  expect(preorder.map((n) => n.data)).toStrictEqual([4, 2, 1, 3, 6, 5, 7]);
});

test('should traverse tree and return list of nodes with function applied if function is provided (preorder)', () => {
  const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

  const preorder = tree.preorder((n) => n.data);

  expect(preorder).toStrictEqual([4, 2, 1, 3, 6, 5, 7]);
});

test('should traverse tree and return list of nodes if no function is provided (inorder)', () => {
  const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

  const preorder = tree.inorder();

  expect(preorder.map((n) => n.data)).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
});

test('should traverse tree and return list of nodes with function applied if function is provided (inorder)', () => {
  const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

  const preorder = tree.inorder((n) => n.data);

  expect(preorder).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
});

test('should traverse tree and return list of nodes if no function is provided (postorder)', () => {
  const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

  const preorder = tree.postorder();

  expect(preorder.map((n) => n.data)).toStrictEqual([1, 3, 2, 5, 7, 6, 4]);
});

test('should traverse tree and return list of nodes with function applied if function is provided (postorder)', () => {
  const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

  const preorder = tree.postorder((n) => n.data);

  expect(preorder).toStrictEqual([1, 3, 2, 5, 7, 6, 4]);
});

test('should return correct tree height is symmetric', () => {
  const tree = Tree([1, 2, 3]);

  const height = tree.height(tree.root);

  expect(height).toBe(2);
});

test('should return correct tree height of left nodes', () => {
  const tree = Tree([1, 2, 3]);

  const height = tree.height(tree.root.left);

  expect(height).toBe(1);
});

test('should return correct tree height of right nodes', () => {
  const tree = Tree([1, 2, 3]);

  const height = tree.height(tree.root.right);

  expect(height).toBe(1);
});

test('should return correct tree height if tree is not symmetric', () => {
  const tree = Tree([1, 2, 3]);

  tree.insert(0);

  const height = tree.height(tree.root);

  expect(height).toBe(3);
});

test('should return depth as zero if root is given', () => {
  const tree = Tree([1, 2, 3]);

  const depth = tree.depth(tree.root);

  expect(depth).toBe(0);
});

test('should return correct depth for node', () => {
  const tree = Tree([1, 3, 5, 7, 9]);

  tree.insert(2);

  const depth = tree.depth(TreeNode(2));

  expect(depth).toBe(3);
});

test('should throw if node does not exist in tree', () => {
  const tree = Tree([1, 2, 3]);

  expect(() => {
    tree.depth(TreeNode(99));
  }).toThrow('Node does not exist.');
});

test('should return true if tree is balanced', () => {
  const tree = Tree([1, 2, 3]);

  expect(tree.isBalanced()).toBe(true);
});

test('should return false if tree is not balanced', () => {
  const tree = Tree([1, 3, 5]);

  tree.insert(2);
  tree.insert(0);
  tree.insert(-1);

  expect(tree.isBalanced()).toBe(false);
});

test('should return false if child nodes of tree are not balanced', () => {
  const tree = Tree([1, 3, 5]);

  tree.insert(4);
  tree.insert(0);
  tree.insert(-1);

  expect(tree.isBalanced()).toBe(false);
});
