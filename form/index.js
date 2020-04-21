const formControls = document.querySelectorAll('.form-control');

for (const formControl of formControls) {
    const input = formControl.querySelector('input'),
        label = formControl.querySelector('label');
    input.addEventListener('blur', () => {
        !!input.value
            ? label.classList.add('form-control__label--focused')
            : label.classList.remove('form-control__label--focused');

    });
}
