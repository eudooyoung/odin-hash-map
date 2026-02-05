import HashMap from "./hash-map.js";

describe("hashMap test", () => {
  let map;
  const key1 = "Rama";
  const value1 = "value1";
  const key2 = "Sita";
  const value2 = "value2";

  beforeEach(() => {
    map = new HashMap();
  });

  it("class defined", () => {
    expect(HashMap).toBeDefined();
  });

  it("instance created", () => {
    expect(map).toBeInstanceOf(HashMap);
  });

  it("properties and initial state", () => {
    expect(map).toHaveProperty("loadFactor", 0.75);
    expect(map).toHaveProperty("capacity", 16);
    expect(map).toHaveProperty("buckets", new Array(16));
    expect(map.buckets.length).toBe(map.capacity);
  });

  // test for createing hash function from scratch isn't implemented,
  // as the code is provided in the assignment requirement.
  it("hash function", () => {
    expect(map.hash("abcde")).toBeLessThan(16);

    expect(() => map.hash(123)).toThrow(TypeError);
  });

  it("set & get basic behaviour", () => {
    expect(map.get(key1)).toBeNull();
    map.set(key1, value1);
    expect(map.get(key1)).toBe(value1);
    map.set(key2, value2);
    expect(map.get(key2)).toBe(value2);
  });

  it("set & get collision handling", () => {
    // force collsiion
    map.hash = () => 0;
    map.set(key1, value1);
    map.set(key2, value2);
    expect(map.get(key1)).toBe(value1);
    expect(map.get(key2)).toBe(value2);
  });

  it("has function", () => {
    expect(map.has(key1)).toBe(false);
    map.set(key1, value1);
    expect(map.has(key1)).toBe(true);
    expect(map.has(key2)).toBe(false);
    map.set(key2, value2);
    expect(map.has(key2)).toBe(true);
  });

  it("remove function", () => {
    expect(map.remove(key1)).toBe(false);
    map.set(key1, value1);
    map.set(key2, value2);
    expect(map.remove(key1)).toBe(true);
    expect(map.has(key1)).toBe(false);
    expect(map.length()).toBe(1);
  });

  it("length function", () => {
    expect(map.length()).toBe(0);
    map.set(key1, value1);
    expect(map.length()).toBe(1);
    map.set(key1, value2);
    expect(map.length()).toBe(1);
    map.set(key2, value2);
    expect(map.length()).toBe(2);
  });

  it("clear function", () => {
    map.set(key1, value1);
    map.set(key2, value2);
    map.clear();
    expect(map.length()).toBe(0);
    expect(map.get(key1)).toBeNull();
    expect(map.get(key2)).toBeNull();
  });

  it("keys function", () => {
    expect(map.keys()).toEqual([]);
    map.set(key1, value1);
    map.set(key2, value2);
    expect(map.keys()).toEqual([key1, key2]);
  });

  it("values function", () => {
    expect(map.values()).toEqual([]);
    map.set(key1, value1);
    map.set(key2, value2);
    expect(map.values()).toEqual([value1, value2]);
  });

  it("entries function", () => {
    expect(map.entries()).toEqual([]);
    map.set(key1, value1);
    map.set(key2, value2);
    expect(map.entries().sort()).toEqual([
      [key1, value1],
      [key2, value2],
    ]);
  });

  it("populate function", () => {
    expect(map.capacity).toBe(16);
    map.set(key1, value1);
    map.set(key2, value2);
    map.populate();
    expect(map.capacity).toBe(32);
    expect(map.get(key1)).toBe(value1);
    expect(map.get(key2)).toBe(value2);
  });

  it("populate triggered when loadLevel increases", () => {
    expect(map.loadLevel()).toBe(0);
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
    expect(map.loadLevel()).toBeCloseTo(0.75);
    map.set("moon", "silver");
    expect(map.loadLevel()).toBeLessThan(0.75);
    expect(map.capacity).toBe(32);
  });
});
