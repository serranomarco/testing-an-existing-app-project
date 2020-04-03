const handlebars = require('handlebars');
function mergeCategories(template, categories, tagName) {
  const render = handlebars.compile(template);
  return render({ categories });
};

exports.mergeCategories = mergeCategories;

// let lis = '';

// for (let category of categories) {
//   lis += `<${tagName}>${category}</${tagName}>`;
// }

// return template.replace('<!-- Content here -->', lis);
