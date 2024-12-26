import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

const placeholders = await fetchPlaceholders(getMetadata('locale'));
const { btnNxt, btnPre } = placeholders;

export default function decorate(block) {
  const rows = [...block.children];
  [...block.children].forEach((row, r) => {
    if (r === 0) {
      const nextbtn = document.createElement('button');
      nextbtn.classList.add('btn');
      nextbtn.classList.add('btn-next');
      const node = document.createTextNode(btnNxt);
      nextbtn.append(node);
      row.replaceWith(nextbtn);
    } else if (r === rows.length - 1) {
      const prebtn = document.createElement('button');
      prebtn.classList.add('btn');
      prebtn.classList.add('btn-prev');
      const node = document.createTextNode(btnPre);
      prebtn.append(node);
      row.replaceWith(prebtn);
    } else {
      row.classList.add('slide');
      [...row.children].forEach((col, c) => {
        if (c === 1) {
          col.classList.add('slide-text');
        }
      });
    }
  });

  const slides = document.querySelectorAll('.slide');

  // Loop through slides and set each slide's translateX
  slides.forEach((slide, indx) => {
    slide.style.transform = `translatex(${indx * 100}%)`;
  });

  // Select next slide button
  const nextSlide = document.querySelector('.btn-next');

  // Current slide counter
  let curSlide = 0;

  // Maximum number of slides
  const maxSlide = slides.length - 1;

  // Add event listener and navigation functionality
  nextSlide.addEventListener('click', () => {
    // Check if current slide is the last and reset current slide
    curSlide = curSlide === maxSlide ? 0 : curSlide + 1;

    // Move slide by -100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translatex(${100 * (indx - curSlide)}%)`;
    });
  });

  // Select previous slide button
  const prevSlide = document.querySelector('.btn-prev');

  // Add event listener and navigation functionality
  prevSlide.addEventListener('click', () => {
    // Check if current slide is the first and reset current slide to last
    curSlide = curSlide === 0 ? maxSlide : curSlide - 1;

    // Move slide by 100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translatex(${100 * (indx - curSlide)}%)`;
    });
  });
}
