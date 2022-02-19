//accordion
const acc = document.getElementsByClassName('accordion');

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', () => {
        acc[i].classList.toggle('active');
        let preview =
            acc[i].parentElement.parentElement.firstElementChild
                .firstElementChild;
        preview.classList.toggle('max');
        let panel = acc[i].nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    });
}

acc[0].addEventListener('click', () => {
    document.querySelector('#expand').classList.add('hide');
});
