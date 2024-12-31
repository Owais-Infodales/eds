import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

async function createtableWithplaceholder(table) {
  const locale = getMetadata('locale');
  const placeholders = await fetchPlaceholders(locale);
  const { fnamekey, header, firstName } = placeholders;

  const authorRow = document.createElement('tr');
  const authorCol = document.createElement('th');
  authorCol.appendChild(document.createTextNode(header));
  authorCol.colSpan = 2;
  authorRow.append(authorCol);

  const firstnameRow = document.createElement('tr');
  const firstNameCol1 = document.createElement('td');
  firstNameCol1.appendChild(document.createTextNode(fnameKey));
  const firstNameCol2 = document.createElement('td');
  firstNameCol2.appendChild(document.createTextNode(firstName));
  firstnameRow.append(firstNameCol1);
  firstnameRow.append(firstNameCol2);

  table.append(authorRow);
  table.append(firstnameRow);
}

export default function decorate(block) {
  const table = document.createElement('table');
  createtableWithplaceholder(table);
  block.replaceWith(table);
}
