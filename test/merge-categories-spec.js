const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
      <div>
        <ul>
          {{#each categories}}
            <li>{{ this}}</li>
          {{/each}}
        </ul>
      </div>
    `;

    it("should return no <li>s for no categories", () => {
      //Arrange
      const categories = [];
      //Act
      const value = mergeCategories(template, categories, 'li');
      //Assert
      expect(value).to.contain('<div>');
      expect(value).to.contain('</div>');
      expect(value).to.contain('<ul>');
      expect(value).to.contain('</ul>');
      expect(value).to.not.contain('<li>')
      expect(value).to.not.contain('</li>')
      expect(value).to.not.contain('<!-- Content here -->')
    });

    it("should return a single <li> for one category", () => {
      //Arrange
      const categories = ['fun'];
      //Act
      const value = mergeCategories(template, categories, 'li');
      //Assert
      expect(value).to.contain('<div>');
      expect(value).to.contain('</div>');
      expect(value).to.contain('<ul>');
      expect(value).to.contain('</ul>');
      expect(value).to.contain('<li>fun</li>');
      expect(value).to.not.contain('<!-- Content here -->')
    });

    it("should return an <li> for each category", () => {
      const categories = ['fun', 'work'];
      //Act
      const value = mergeCategories(template, categories, 'li');
      //Assert
      expect(value).to.contain('<div>');
      expect(value).to.contain('</div>');
      expect(value).to.contain('<ul>');
      expect(value).to.contain('</ul>');
      expect(value).to.contain('<li>fun</li>');
      expect(value).to.contain('<li>work</li>');
      expect(value).to.not.contain('<!-- Content here -->')
    });
  });

  context("using <option> tags", () => {
    const template = `
      <div>
        <select>
          {{#each categories}}
           <option>{{ this }}</option>
           {{/each}}
        </select>
      </div>
    `;

    it("should return no <option>s for no categories", () => {
      //Arrange
      const categories = [];
      const value = mergeCategories(template, categories, 'option');
      //Assert
      expect(value).to.contain('<div>');
      expect(value).to.contain('</div>');
      expect(value).to.contain('<select>');
      expect(value).to.contain('</select>');
      expect(value).to.not.contain('<option>')
      expect(value).to.not.contain('</option>')
      expect(value).to.not.contain('<!-- Content here -->')
    });

    it("should return a single <option> for one category", () => {
      const categories = ['fun'];
      const value = mergeCategories(template, categories, 'option');
      //Assert
      expect(value).to.contain('<div>');
      expect(value).to.contain('</div>');
      expect(value).to.contain('<select>');
      expect(value).to.contain('</select>');
      expect(value).to.contain('<option>fun</option>');
      expect(value).to.not.contain('<!-- Content here -->');
    });

    it("should return an <option> for each category", () => {
      const categories = ['fun', 'work'];
      const value = mergeCategories(template, categories, 'option');
      //Assert
      expect(value).to.contain('<div>');
      expect(value).to.contain('</div>');
      expect(value).to.contain('<select>');
      expect(value).to.contain('</select>');
      expect(value).to.contain('<option>fun</option>');
      expect(value).to.contain('<option>work</option>');
      expect(value).to.not.contain('<!-- Content here -->');
    });
  });
});
