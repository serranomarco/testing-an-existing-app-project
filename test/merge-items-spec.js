const { expect } = require('chai');
const { mergeItems } = require('../merge-items');
describe("The mergeItems function", () => {
  const template = `
    <table>
      <tbody>
        {{#each items}}
        <tr>
          <td>{{ add @index 1}}</td>
          <td>{{ title }}</td>
          <td>{{ category }}</td>
          <td>
            {{#if isComplete}}
            {{else}}
            <form method="POST" action="/items/{{ add @index 1 }}">
              <button class="pure-button">Complete</button>
            </form>
            {{/if}}
          </td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  `;
  it("should return no <tr>s and no <td>s for no items", () => {
    const items = [];
    const result = mergeItems(template, items);
    expect(result).to.contain('<table>');
    expect(result).to.contain('</table>')
    expect(result).to.contain('<tbody>')
    expect(result).to.contain('</tbody>')
    expect(result).to.not.contain('<tr>');
    expect(result).to.not.contain('</tr>')
    expect(result).to.not.contain('<td>')
    expect(result).to.not.contain('</td>')
    expect(result).to.not.contain('<!-- Content here -->')

  });

  it("should return a single <tr>, four <td>s, and a <form> for one uncompleted item", () => {
    const items = [{ title: 'title1', category: 'category1' }];
    const result = mergeItems(template, items);
    expect(result).to.contain('<table>');
    expect(result).to.contain('</table>')
    expect(result).to.contain('<tbody>')
    expect(result).to.contain('</tbody>')
    expect(result).to.contain('<tr>');
    expect(result).to.contain('</tr>')
    expect(result).to.contain('<td>title1</td>')
    expect(result).to.contain('<td>category1</td>')
    expect(result).to.contain('<form method="POST" action="/items/1">');
    expect(result).to.not.contain('<!-- Content here -->')
  });

  it("should return a single <tr>, four <td>s, and no <form> for one completed item", () => {
    const items = [{ title: 'title1', category: 'category1', isComplete: true }];
    const result = mergeItems(template, items);
    expect(result).to.contain('<table>');
    expect(result).to.contain('</table>')
    expect(result).to.contain('<tbody>')
    expect(result).to.contain('</tbody>')
    expect(result).to.contain('<tr>');
    expect(result).to.contain('</tr>')
    expect(result).to.contain('<td>title1</td>')
    expect(result).to.contain('<td>category1</td>')
    expect(result).to.not.contain('<form method="POST" action="/items/1">');
    expect(result).to.not.contain('<!-- Content here -->')
  });

  it("should return three <tr>s for three items", () => {
    const items = [{ title: 'title1', category: 'category1', isComplete: true },
    { title: 'title2', category: 'category2', isComplete: true },
    { title: 'title3', category: 'category3', isComplete: true }];
    const result = mergeItems(template, items);
    expect(result).to.contain('<table>');
    expect(result).to.contain('</table>')
    expect(result).to.contain('<tbody>')
    expect(result).to.contain('</tbody>')
    expect(result).to.contain('<tr>');
    expect(result).to.contain('</tr>');
    expect(result).to.contain('<td>title1</td>');
    expect(result).to.contain('<td>category1</td>');
    expect(result).to.contain('<td>title2</td>');
    expect(result).to.contain('<td>category2</td>');
    expect(result).to.contain('<td>title3</td>');
    expect(result).to.contain('<td>category3</td>');
    expect(result).to.not.contain('<form method="POST" action="/items/1">');
    expect(result).to.not.contain('<!-- Content here -->');
  });
});
