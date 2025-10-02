pn.click('.accordion', function(event) {
    if (this.classList.contains('active')) {
        return;
    }
    event.preventDefault();

    pn.each('.accordion.active', (e) => e.classList.remove('active'));
    this.classList.toggle('active');
});
