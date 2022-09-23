let toggleActiveElements = document.querySelectorAll(".toggle-active");
for (let i = 0; i < toggleActiveElements.length; i++) {
    toggleActiveElements[i].addEventListener('click', function(event) {
        event.preventDefault();
        this.classList.toggle('active');
    });
}