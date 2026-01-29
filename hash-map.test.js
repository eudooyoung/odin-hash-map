import assert from "node:assert/strict";
import test from "node:test";
import HashMap from "./hash-map.js";

/* ===== 공통 헬퍼 ===== */
function expectEqual(actual, expected, label) {
  assert.equal(
    actual,
    expected,
    `[${label}] expected=${expected}, actual=${actual}`,
  );
}

/* ===== 테스트 ===== */
test("empty map basics", () => {
  const map = new HashMap(0.75);

  expectEqual(map.length(), 0, "length(empty)");
  expectEqual(map.capacity, 16, "capacity(empty)");
  expectEqual(map.get("x"), null, "get(empty)");
  expectEqual(map.has("x"), false, "has(empty)");
  expectEqual(map.remove("x"), false, "remove(empty)");
  expectEqual(map.keys().length, 0, "keys(empty)");
  expectEqual(map.values().length, 0, "values(empty)");
  expectEqual(map.entries().length, 0, "entries(empty)");
});

test("set inserts and get retrieves", () => {
  const map = new HashMap(0.75);

  map.set("apple", "red");
  map.set("banana", "yellow");

  expectEqual(map.length(), 2, "length after set");
  expectEqual(map.get("apple"), "red", "get apple");
  expectEqual(map.get("banana"), "yellow", "get banana");
  expectEqual(map.get("carrot"), null, "get missing");
});

test("overwrite does not change length or capacity", () => {
  const map = new HashMap(0.75);

  map.set("apple", "red");
  map.set("apple", "green");

  expectEqual(map.length(), 1, "length after overwrite");
  expectEqual(map.get("apple"), "green", "value overwritten");
  expectEqual(map.capacity, 16, "capacity unchanged");
});

test("load factor 0.75 triggers resize on next insert", () => {
  const map = new HashMap(0.75);

  map.set("apple", "red");
  map.set("banana", "yellow");
  map.set("carrot", "orange");
  map.set("dog", "brown");
  map.set("elephant", "gray");
  map.set("frog", "green");
  map.set("grape", "purple");
  map.set("hat", "black");
  map.set("ice cream", "white");
  map.set("jacket", "blue");
  map.set("kite", "pink");
  map.set("lion", "golden");

  expectEqual(map.length(), 12, "length at load factor");
  expectEqual(map.capacity, 16, "capacity before resize");

  map.set("moon", "silver");

  expectEqual(map.length(), 13, "length after resize insert");
  expectEqual(map.capacity, 32, "capacity doubled");
  expectEqual(map.get("moon"), "silver", "get after resize");
  expectEqual(map.get("apple"), "red", "existing entry preserved");
});

test("has / remove behavior", () => {
  const map = new HashMap(0.75);

  map.set("dog", "brown");
  map.set("cat", "black");

  expectEqual(map.has("dog"), true, "has existing");
  expectEqual(map.has("fox"), false, "has missing");

  expectEqual(map.remove("dog"), true, "remove existing");
  expectEqual(map.length(), 1, "length after remove");
  expectEqual(map.get("dog"), null, "get removed");

  expectEqual(map.remove("dog"), false, "remove non-existing");
});

test("keys / values / entries return all items (order not guaranteed)", () => {
  const map = new HashMap(0.75);

  map.set("a", 1);
  map.set("b", 2);
  map.set("c", 3);

  const keys = map.keys();
  const values = map.values();
  const entries = map.entries();

  expectEqual(keys.length, 3, "keys length");
  expectEqual(values.length, 3, "values length");
  expectEqual(entries.length, 3, "entries length");

  assert.ok(keys.includes("a"), "[keys includes a]");
  assert.ok(values.includes(2), "[values includes 2]");
  assert.ok(
    entries.some(([k, v]) => k === "c" && v === 3),
    "[entries contains c,3]",
  );
});

test("clear removes all entries", () => {
  const map = new HashMap(0.75);

  map.set("x", 1);
  map.set("y", 2);

  map.clear();

  expectEqual(map.length(), 0, "length after clear");
  expectEqual(map.keys().length, 0, "keys after clear");
  expectEqual(map.get("x"), null, "get after clear");
});

test("non-string keys throw TypeError", () => {
  const map = new HashMap(0.75);

  assert.throws(
    () => map.set(123, "x"),
    (err) => (
      console.error("[set non-string]", err.message),
      err instanceof TypeError
    ),
  );

  assert.throws(
    () => map.get({}),
    (err) => (
      console.error("[get non-string]", err.message),
      err instanceof TypeError
    ),
  );
});
