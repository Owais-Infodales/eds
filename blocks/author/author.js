import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

const placeholders = await fetchPlaceholders(getMetadata('locale'));
console.log(placeholders);

const {
  authorDetails,
  firstName,
  lastName,
  occupation,
  bio,
  topics,
} = placeholders;

export default function decorate(block) {
  const headingDiv = document.createElement('div');
  headingDiv.classList.add('table-heading');
  const htext = document.createTextNode(authorDetails);
  const headingH1 = document.createElement('h1');
  headingH1.append(htext);
  headingDiv.append(headingH1);

  const table = document.createElement('table');
  const tr = document.createElement('tr');

  const fn = document.createElement('th');
  fn.appendChild(document.createTextNode(firstName));
  tr.append(fn);

  const ln = document.createElement('th');
  ln.appendChild(document.createTextNode(lastName));
  tr.append(ln);

  const oc = document.createElement('th');
  oc.appendChild(document.createTextNode(occupation));
  tr.append(oc);

  const bi = document.createElement('th');
  bi.appendChild(document.createTextNode(bio));
  tr.append(bi);

  const to = document.createElement('th');
  to.appendChild(document.createTextNode(topics));
  tr.append(to);

  table.append(tr);

  [...block.children].forEach((row, r) => {
    const trow = document.createElement('tr');
    [...row.children].forEach((col, c) => {
      console.log('Row : Col', r, c);
      const tcol = document.createElement('td');
      tcol.appendChild(col);
      trow.append(tcol);
    });
    table.append(trow);
  });

  block.append(headingDiv);
  block.append(table);
}
