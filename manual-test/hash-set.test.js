// hash-set.test.js
import test from "node:test";
import assert from "node:assert/strict";
import HashSet from "./hash-set.js";

test("empty set basics", () => {
  const set = new HashSet();
  assert.equal(set.size(), 0);
  assert.equal(set.has("a"), false);
});

test("add and has", () => {
  const set = new HashSet();
  set.add("dog");
  set.add("cat");

  assert.equal(set.has("dog"), true);
  assert.equal(set.has("cat"), true);
  assert.equal(set.has("fox"), false);
  assert.equal(set.size(), 2);
});

test("duplicate add does not increase size", () => {
  const set = new HashSet();
  set.add("dog");
  set.add("dog");

  assert.equal(set.size(), 1);
});

test("remove existing and non-existing key", () => {
  const set = new HashSet();
  set.add("dog");

  assert.equal(set.remove("dog"), true);
  assert.equal(set.has("dog"), false);
  assert.equal(set.size(), 0);

  assert.equal(set.remove("dog"), false);
});

test("keys returns all keys", () => {
  const set = new HashSet();
  set.add("dog");
  set.add("cat");

  const keys = set.keys();
  assert.deepEqual(new Set(keys), new Set(["dog", "cat"]));
});

test("clear empties the set", () => {
  const set = new HashSet();
  set.add("dog");
  set.add("cat");

  set.clear();
  assert.equal(set.size(), 0);
  assert.equal(set.has("dog"), false);
});

test("non-string key throws", () => {
  const set = new HashSet();
  assert.throws(() => set.add(123), TypeError);
  assert.throws(() => set.has({}), TypeError);
  assert.throws(() => set.remove(null), TypeError);
});

test("collision handling: all keys collide when capacity=1", () => {
  const set = new HashSet(1, 0.75); // 모든 키가 같은 버킷으로 감(강제 충돌)

  set.add("dog");
  set.add("cat");
  set.add("fox");

  assert.equal(set.size(), 3);
  assert.equal(set.has("dog"), true);
  assert.equal(set.has("cat"), true);
  assert.equal(set.has("fox"), true);

  // 특정 키만 제거되어야 함
  assert.equal(set.remove("cat"), true);
  assert.equal(set.size(), 2);
  assert.equal(set.has("cat"), false);
  assert.equal(set.has("dog"), true);
  assert.equal(set.has("fox"), true);

  // 없는 키 제거는 false
  assert.equal(set.remove("cat"), false);
});
