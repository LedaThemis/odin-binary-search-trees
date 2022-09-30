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

test('should insert item in correct place', () => {
  const tree = Tree([1, 2, 3]);

  tree.insert(0);

  expect(tree.root.left?.left?.data).toBe(0);
  expect(tree.root.left?.data).toBe(1);
  expect(tree.root.data).toBe(2);
  expect(tree.root.right?.data).toBe(3);
});
