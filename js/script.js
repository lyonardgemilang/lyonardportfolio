document.addEventListener('DOMContentLoaded', () => {
    const skillsSliderContainer = document.querySelector('.skills-container');
    if (skillsSliderContainer) {
        const slider = skillsSliderContainer.querySelector('.skills-slider');
        const viewport = skillsSliderContainer.querySelector('.skills-viewport');
        const btnPrev = skillsSliderContainer.querySelector('.arrow.prev');
        const btnNext = skillsSliderContainer.querySelector('.arrow.next');

        const originals = Array.from(slider.querySelectorAll('.skill-item'));
        const visibleCnt = 3; // Show 3 items at once
        const originalCnt = originals.length;

        if (originalCnt > 0) {
            // --- CLONING ---
            for (let i = 0; i < visibleCnt; i++) {
                slider.prepend(originals[originalCnt - 1 - i].cloneNode(true));
                slider.appendChild(originals[i].cloneNode(true));
            }

            const allItems = slider.querySelectorAll('.skill-item');
            let curIndex = visibleCnt;

            // --- POSITIONING UTILITY ---
            const setPosition = () => {
                const itemW = originals[0].offsetWidth;
                const centreX = (viewport.offsetWidth / 2) - (itemW / 2);
                slider.style.transform = `translateX(${centreX - curIndex * itemW}px)`;
                allItems.forEach((el, i) => el.classList.toggle('active', i === curIndex));
            };

            // --- INITIALIZATION ---
            const init = () => {
                slider.style.transition = 'none';
                setPosition();
                void slider.offsetWidth; // Force reflow
                slider.style.transition = 'transform .5s ease-in-out';
            };
            init();
            window.addEventListener('resize', init);

            // --- CLICK HANDLERS ---
            const move = (dir) => {
                if (slider.classList.contains('is-moving')) return;
                slider.classList.add('is-moving');
                curIndex += dir;
                setPosition();
            };
            btnNext.addEventListener('click', () => move(1));
            btnPrev.addEventListener('click', () => move(-1));

            // --- TRANSITION END (for seamless loop) ---
            slider.addEventListener('transitionend', () => {
                slider.classList.remove('is-moving');
                const needsJump = curIndex <= visibleCnt - 1 || curIndex >= originalCnt + visibleCnt;
                if (needsJump) {
                    if (curIndex <= visibleCnt - 1) {
                        curIndex = originalCnt + curIndex;
                    } else if (curIndex >= originalCnt + visibleCnt) {
                        curIndex = curIndex - originalCnt;
                    }
                    slider.style.transition = 'none';
                    setPosition();
                    void slider.offsetWidth; // Force reflow
                    slider.style.transition = 'transform .5s ease-in-out';
                }
            });
        }
    }

    const basicSliderContainer = document.querySelector('.testimonial-container');
    if (basicSliderContainer) {
        const slider = basicSliderContainer.querySelector('.testi-slider');
        const items = basicSliderContainer.querySelectorAll('.testi-item');
        const btnPrev = basicSliderContainer.querySelector('.arrow.prev');
        const btnNext = basicSliderContainer.querySelector('.arrow.next');
        let currentIndex = 0;

        if (items.length > 0) {
            function showSlide(index) {
                // Loop the index
                if (index >= items.length) {
                    currentIndex = 0;
                } else if (index < 0) {
                    currentIndex = items.length - 1;
                } else {
                    currentIndex = index;
                }
                const offset = -currentIndex * 100;
                slider.style.transform = `translateX(${offset}%)`;
            }

            btnNext.addEventListener('click', () => {
                showSlide(currentIndex + 1);
            });
            btnPrev.addEventListener('click', () => {
                showSlide(currentIndex - 1);
            });

            // Initialize the slider
            showSlide(0);
        }
    }
});