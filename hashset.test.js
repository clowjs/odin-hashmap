const HashSet = require('./hashset');

describe('HashSet', () => {
  let set;

  beforeEach(() => {
    set = new HashSet(10, 0.75);
  });

  afterEach(() => {
    set.clear();
  });

  test('should set and get values correctly', () => {
    set.set('value1');
    set.set('value2');
    set.set('value3');

    expect(set.get('value1')).toBe('value1');
    expect(set.get('value2')).toBe('value2');
    expect(set.get('value3')).toBe('value3');
  });

  test('should return null for non-existing values', () => {
    expect(set.get('nonExistingValue')).toBeNull();
  });

  test('should return true for existing values', () => {
    set.set('value1');
    set.set('value2');

    expect(set.has('value1')).toBe(true);
    expect(set.has('value2')).toBe(true);
  });

  test('should return false for non-existing values', () => {
    expect(set.has('nonExistingValue')).toBe(false);
  });

  test('should remove values correctly', () => {
    set.set('value1');
    set.set('value2');

    expect(set.remove('value1')).toBe(true);
    expect(set.remove('value2')).toBe(true);
    expect(set.remove('nonExistingValue')).toBe(false);
    expect(set.get('value1')).toBeNull();
    expect(set.get('value2')).toBeNull();
  });

  test('should return the correct length', () => {
    expect(set.length()).toBe(0);

    set.set('value1');
    set.set('value2');

    expect(set.length()).toBe(2);
  });

  test('should clear the set', () => {
    set.set('value1');
    set.set('value2');

    set.clear();

    expect(set.length()).toBe(0);
    expect(set.get('value1')).toBeNull();
    expect(set.get('value2')).toBeNull();
  });

  test('should return the entries', () => {
    set.set('value1');
    set.set('value2');

    expect(set.entries()).toEqual(['value1', 'value2']);
  });
});