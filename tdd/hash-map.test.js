import HashMap from "./hash-map.js";

describe("hashMap test", () => {
  let map;
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
    expect(map).toHaveProperty("buckets", []);
    expect(map.buckets.length).toBe(map.capacity);
  });

  // test for createing hash function from scratch isn't implemented,
  // as the code is provided in the assignment requirement.
  it("hash function", () => {
    expect(map.hash("abcde")).toBeLessThan(16);

    expect(() => map.hash(123)).toThrow(TypeError);
  });

  describe("set and get function", () => {
    it("basic behaviour", () => {
      const key = "key1";

      map.set(key, "value1");
      expect(map.get(key)).toBe("value1");
      map.set(key, "new value");
      expect(map.get(key)).toBe("new value");
    });

    it("collision handling", () => {
      const key1 = "Rama";
      const value1 = "value1";
      const key2 = "Sita";
      const value2 = "value2";
      map.set(key1, value1);
      map.set(key2, value2);
      expect(map.get(key1)).toBe(value1);
    });
  });
});
