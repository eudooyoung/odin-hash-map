import HashSet from "./hash-set.js";

describe("HashSet test", () => {
  let set;
  const key1 = "key1";
  const key2 = "key2";
  const dupKey1 = "key1";

  beforeEach(() => {
    set = new HashSet();
  });

  it("class defined", () => {
    expect(HashSet).toBeDefined();
  });

  it("instance initial state", () => {
    expect(set).toBeInstanceOf(HashSet);
    expect(set.loadFactor).toBe(0.75);
    expect(set.capacity).toBe(16);
    expect(Array.isArray(set.buckets)).toBe(true);
    expect(set.buckets.length).toBe(set.capacity);
  });

  it("hash function", () => {
    expect(set.hash("abcd")).toBeLessThan(16);

    expect(() => set.hash(1234)).toThrow(TypeError);
  });

  it("add & has basic behaviour", () => {
    set.add(key1);
    expect(set.has(key1)).toBe(true);
  });

  it("remove function", () => {
    expect(set.remove(key1)).toBe(false);
    set.add(key1);
    expect(set.remove(key1)).toBe(true);
    expect(set.has(key1)).toBe(false);
  });

  it("size function", () => {
    expect(set.size()).toBe(0);

    set.add(key1);
    expect(set.size()).toBe(1);
    set.add(dupKey1);
    expect(set.size()).toBe(1);

    set.remove(key1);
    expect(set.size()).toBe(0);
    set.remove(key1);
    expect(set.size()).toBe(0);
  });

  it("clear function", () => {
    set.add(key1);
    set.add(key2);
    set.clear();
    expect(set.has(key1)).toBe(false);
    expect(set.has(key2)).toBe(false);
    expect(set.size()).toBe(0);
  });

  it("keys function", () => {
    expect(set.keys()).toEqual([]);
    set.add(key1);
    set.add(key2);
    expect(set.keys().sort()).toEqual([key1, key2]);
  });

  describe("collision handling", () => {
    beforeEach(() => {
      set.hash = () => 0;
    });

    it("has & remove function", () => {
      set.add(key1);
      set.add(key2);
      set.remove(key1);
      expect(set.has(key1)).toBe(false);
      expect(set.has(key2)).toBe(true);
    });

    it("keys function", () => {
      set.add(key1);
      set.add(key2);
      expect(set.keys().sort()).toEqual([key1, key2]);
    });
  });

  describe("grow capacity test", () => {
    beforeEach(() => {
      set.hash = () => 0;
    });

    it("populate function", () => {
      for (let i = 0; i < 13; i++) {
        set.add(`key${i}`);
      }
      expect(set.capacity).toBe(32);
      
      for (let i = 0; i < 13; i++) {
        expect(set.has(`key${i}`)).toBe(true);
      }
    });
  });
});
