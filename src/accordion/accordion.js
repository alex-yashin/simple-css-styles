let accordionElements = document.querySelectorAll(".accordion");
for (let i = 0; i < accordionElements.length; i++) {
    console.log(accordionElements[i]);
    accordionElements[i].addEventListener('click', function(event) {
        if (this.classList.contains('active')) {
            return;
        }
        event.preventDefault();

        document.querySelectorAll(".accordion.active").forEach(function(item) {
            if (item.classList) {
                item.classList.remove('active');
            }
        });

        this.classList.toggle('active');
    });
}