function initCarrosselScroll(root) {
    var scope = root || document;
    scope.querySelectorAll('.carousel-track, .cat-visual-scroll').forEach(function (track) {
        if (track.dataset.carrosselInit) return;
        track.dataset.carrosselInit = '1';

        track.addEventListener('wheel', function (e) {
            if (track.scrollWidth <= track.clientWidth + 1) return;
            e.preventDefault();
            track.scrollLeft += e.deltaY !== 0 ? e.deltaY : e.deltaX;
        }, { passive: false });

        var isDown = false;
        var startX = 0;
        var scrollLeft = 0;

        track.addEventListener('mousedown', function (e) {
            if (e.button !== 0) return;
            if (e.target.closest('button, a, input, select, textarea')) return;
            isDown = true;
            track.classList.add('is-dragging');
            startX = e.pageX;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', function () {
            isDown = false;
            track.classList.remove('is-dragging');
        });

        track.addEventListener('mouseup', function () {
            isDown = false;
            track.classList.remove('is-dragging');
        });

        track.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            track.scrollLeft = scrollLeft - (e.pageX - startX);
        });

        track.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });
    });
}
