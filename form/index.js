const formControls = document.querySelectorAll('.form-control');

for (const formControl of formControls) {
    const input = formControl.querySelector('input'),
        label = formControl.querySelector('label');
    input.addEventListener('blur', () => {
        if (!!input.value) {
            label.classList.add('form-control__label--focused');
        } else {
            label.classList.remove('form-control__label--focused');
        }
    })
}
