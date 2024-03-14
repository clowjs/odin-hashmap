const HashMap = require('./hashmap');

describe('HashMap', () => {
  let map;

  beforeEach(() => {
    map = new HashMap(10, 0.75);
  });

  afterEach(() => {
    map.clear();
  });

  test('should set and get values correctly', () => {
    map.set('key1', 'value1');
    map.set('key2', 'value2');
    map.set('key3', 'value3');

    expect(map.get('key1')).toBe('value1');
    expect(map.get('key2')).toBe('value2');
    expect(map.get('key3')).toBe('value3');
  });

  test('should return null for non-existing keys', () => {
    expect(map.get('nonExistingKey')).toBeNull();
  });

  test('should return true for existing keys', () => {
    map.set('key1', 'value1');
    map.set('key2', 'value2');

    expect(map.has('key1')).toBe(true);
    expect(map.has('key2')).toBe(true);
  });

  test('should return false for non-existing keys', () => {
    expect(map.has('nonExistingKey')).toBe(false);
  });

  test('should remove values correctly', () => {
    map.set('key1', 'value1');
    map.set('key2', 'value2');

    expect(map.remove('key1')).toBe(true);
    expect(map.remove('key2')).toBe(true);
    expect(map.remove('nonExistingKey')).toBe(false);
    expect(map.get('key1')).toBeNull();
    expect(map.get('key2')).toBeNull();
  });

  test('should return the correct length', () => {
    expect(map.length()).toBe(0);

    map.set('key1', 'value1');
    map.set('key2', 'value2');

    expect(map.length()).toBe(2);
  });

  test('should clear the map', () => {
    map.set('key1', 'value1');
    map.set('key2', 'value2');

    map.clear();

    expect(map.length()).toBe(0);
    expect(map.get('key1')).toBeNull();
    expect(map.get('key2')).toBeNull();
  });

  test('should return the keys', () => {
    map.set('key1', 'value1');
    map.set('key2', 'value2');

    expect(map.keys()).toEqual(['key1', 'key2']);
  });

  test('should return the values', () => {
    map.set('key1', 'value1');
    map.set('key2', 'value2');

    expect(map.values()).toEqual(['value1', 'value2']);
  });

  test('should return the entries', () => {
    map.set('key1', 'value1');
    map.set('key2', 'value2');

    expect(map.entries()).toEqual([['key1', 'value1'], ['key2', 'value2']]);
  });
});