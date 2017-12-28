import { expect } from 'chai';
import supertest from 'supertest';
import app from './server/app.js';

const request = supertest(app);
const rootURL = '/api';
const centerUrl = `${rootURL}/v1/centers`;
const centerDetailUrl = `${rootURL}/v1/centers/1`;
const editCenterUrl = `${rootURL}/v1/centers/1`;
const addCenterUrl = `${rootURL}/v1/centers`;
const addEventUrl = `${rootURL}/v1/events`;
const editEventUrl = `${rootURL}/v1/events/1`;


describe('Test isSubset function, first array argument is subset of second array arggument', () => {
  const arr3 = [3, 2, 1];

  it('returns a boolean', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [3, 2, 1];
    assert.isBoolean(isSubset(arr1, arr2), 'returns true or false');
  });
  describe('Test arrays of unequal length, not subset', () => {
    it('first array longer than second array', () => {
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 2, 1];
      assert.equal(isSubset(arr1, arr2), false, 'should return false');
    });
    it('first array shorter than second array ', () => {
      const arr1 = [3, 2, 1];
      const arr2 = [1, 2, 4, 5];
      assert.equal(isSubset(arr1, arr2), false, 'should return false');
    });
  });
  describe('Test arrays of unequal length, but subset', () => {
    it('first array longer than second array', () => {
      const arr1 = [1, 3, 2, 3];
      const arr2 = [3, 2, 1];
      assert.equal(isSubset(arr1, arr2), true, 'should return true');
    });
    it('first array shorter than second array ', () => {
      const arr1 = [3, 2, 1];
      const arr2 = [1, 2, 3, 4];
      assert.equal(isSubset(arr1, arr2), true, 'should return true');
    });
  });
  describe('Test arrays of unequal length containing strings, but subset', () => {
    it('first array shorter than second array ', () => {
      const arr1 = ['name', 'cost', 'capacity', 'image', 'country', 'state', 'lga', 'amenities', 'eventType'];
      const arr2 = ['name', 'cost', 'capacity', 'image', 'country', 'state', 'lga', 'amenities', 'eventType'];
      assert.equal(isSubset(arr1, arr2), true, 'should return true');
    });
  });
});
