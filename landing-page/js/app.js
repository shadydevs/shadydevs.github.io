/**
 *
 * Manipulating the DOM.
 * programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

const nav = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const navFrag = document.createDocumentFragment();
let sectionBound = [];
let activeSection = 0;

//takes element and child to append to it
function addNavItem(element, child) {
    const newChild = document.createElement('li');
    const childContent = document.createElement('a');

    childContent.classList.add('menu__link');
    childContent.textContent = child.getAttribute('data-nav');

    newChild.appendChild(childContent);

    //Event listener for scrolling to corresponding section. section is found using its id
    newChild.addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector(`#${child.getAttribute('id')}`).scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    });

    element.appendChild(newChild);
}

// build the nav
for (const section of sections) {
    addNavItem(navFrag, section);
    sectionBound.push(section.getBoundingClientRect());
}

nav.appendChild(navFrag);
const navItems = document.querySelectorAll('.menu__link');

// Add class 'active' to section and nav when near top of viewport to highlight them
navItems[activeSection].classList.add('your-active-class');
document.addEventListener('scroll', () => {
    const count = sectionBound.length - 1;
    for (let i = 0; i < count; i++) {
        if (
            window.visualViewport.pageTop >= sectionBound[i].y - 427 &&
            window.visualViewport.pageTop < sectionBound[i + 1].y
        ) {
            navItems[activeSection].classList.remove('your-active-class');
            sections[activeSection].classList.remove('your-active-class');

            sections[i].classList.add('your-active-class');
            navItems[i].classList.add('your-active-class');
            activeSection = i;
        }
    }
    if (window.visualViewport.pageTop >= sectionBound[count].y - 427) {
        navItems[activeSection].classList.remove('your-active-class');
        sections[activeSection].classList.remove('your-active-class');

        sections[count].classList.add('your-active-class');
        navItems[count].classList.add('your-active-class');

        activeSection = count;
    }
});
