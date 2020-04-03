const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    const items = [{ title: 'title1', category: 'category1' }];
    const newItems = { title: 'title2', category: 'category2' };

    const result = saveItems(items, newItems)

    expect(result).to.include(newItems);
  });

  it('makes sure the result and the original are different', () => {
    const items = [{ title: 'title1', category: 'category1' }];
    const newItems = { title: 'title2', category: 'category2' };

    const result = saveItems(items, newItems)

    expect(result).to.not.equal(items);
  });
});
