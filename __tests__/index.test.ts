import { prettyPrint, Tree } from '..';

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
