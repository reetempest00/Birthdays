(function () {
    // nodes
    const sceneError = document.getElementById('scene-error');
    const sceneGift = document.getElementById('scene-gift');
    const sceneSlide = document.getElementById('scene-slideshow');

    const triggerBtn = document.getElementById('triggerBtn');
    const notice = document.getElementById('notice');

    const gift = document.getElementById('gift');
    const dialog = document.getElementById('dialog');
    const giftCard = document.getElementById('giftCard');

    const emoji = document.getElementById('emoji');
    const emojiBubble = document.getElementById('emojiBubble');

    const slidesWrap = document.getElementById('slides');
    const dotsContainer = document.getElementById('dots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPause = document.getElementById('playPause');
    const confettiLayer = document.getElementById('confettiLayer');

    const bgm = document.getElementById('bgm');
    const boom = document.getElementById('boom');


    // state
    let errorCount = 0;
    const maxError = 1; // tampil error 3x
    let dialogStep = 0;
    let autoPlay = true;
    let slideTimer = null;
    const slides = Array.from(document.querySelectorAll('.slide'));
    let current = 0;

    // helper: show temporary error with shake, then hide
    function showErrorNotice(next) {
        notice.textContent = "Error: 0xE001 — Something went wrong...";
        notice.classList.add('show');
        notice.style.animation = 'shake 700ms';
        // after short while change text to friendly, then hide and callback
        setTimeout(() => {
            notice.style.animation = '';
            notice.textContent = "Coba lagi";
        }, 700);
        setTimeout(() => {
            notice.classList.remove('show');
            if (typeof next === 'function') next();
        }, 1000);
    }

    // scene switch helpers
    function showScene(from, to) {
        from.classList.add('hidden'); from.classList.remove('visible');
        from.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            to.classList.remove('hidden'); to.classList.add('visible');
            to.setAttribute('aria-hidden', 'false');
        }, 220); // small gap for nicer transition
    }

    // =========================

    // FLOW: click -> error repeat -> gift scene -> dialogs -> emoji -> explosion -> slideshow
    triggerBtn.addEventListener('click', () => {
        //tampil motivasi
        document.getElementById('motivasi').style.display = 'block';

        // disable quickly to avoid spam; re-enable only if still in error phase
        triggerBtn.disabled = true;
        errorCount++;
        if (errorCount <= maxError) {
            showErrorNotice(() => {
                // re-enable button only if still in error-phase
                if (errorCount < maxError) {
                    triggerBtn.disabled = false;
                } else {
                    // after final error, proceed to gift scene automatically
                    startGiftFlow();
                }
            });
            return;
        }
    });

    function startGiftFlow() {
        // pindah dari scene error → scene gift
        showScene(sceneError, sceneGift);

        // reset dulu biar bersih
        dialog.classList.remove('show');
        dialog.textContent = '';

        gift.className = 'gift'; // reset semua step
        giftCard.querySelector('.lid').classList.remove('open-lid');

        emoji.classList.remove('show', 'bounce');
        emojiBubble.classList.remove('show');
        emojiBubble.textContent = '';

        // --- STEP 1 : muncul sedikit dari kiri ---
        setTimeout(() => {
            gift.classList.add('step-2');
            dialog.textContent = "Punten 👋😅";
            dialog.classList.add('show');
        }, 200);

        // --- STEP 2 : dialog hilang → maju lagi ---
        setTimeout(() => {
            dialog.classList.remove('show');
            setTimeout(() => {
                gift.classList.remove('step-2');
                gift.classList.add('step-3');
            }, 220);
        }, 1500);

        // --- STEP 3 : bubble kedua ---
        setTimeout(() => {
            dialog.textContent = "Pakeett,..";
            dialog.classList.add('show');
        }, 2500);

        // --- STEP 4 : gerak ke tengah ---
        setTimeout(() => {
            dialog.classList.remove('show');
            gift.classList.remove('step-3');
            gift.classList.add('in-place');
        }, 4800);

        // --- STEP 5 : bubble final ---
        setTimeout(() => {
            dialog.textContent = "Mangga di TOUCH 😎";
            dialog.classList.add('show');
        }, 5200);

        // --- STEP 6 : emoji interrupt ---
        setTimeout(() => {
            emoji.classList.add('show', 'bounce');
            emojiBubble.textContent = "Cotto Kedap, Awas 🔊";
            emojiBubble.classList.add('show');

            // wiggle kecil
            gift.classList.add('wiggle');
            setTimeout(() => gift.classList.remove('wiggle'), 400);

        }, 5500);
    }
    // --- STEP 7 : open box & explosion ---

    // open lid, confetti, then go to slideshow
    function openBoxAndExplode() {
        boom.currentTime = 0;
        boom.volume = 0.8;
        boom.play().catch(() => { });

        // open lid
        const lid = giftCard.querySelector('.lid');
        lid.classList.add('open-lid');

        spawnConfetti(40);

        // small delay then switch to slideshow scene
        setTimeout(() => {
            showScene(sceneGift, sceneSlide);
            // init slideshow
            initSlideshow();
        }, 900);
    }

    // =========================
    // CONFETTI (simple)
    function spawnConfetti(n = 20) {
        confettiLayer.innerHTML = '';
        confettiLayer.setAttribute('aria-hidden', 'false');
        for (let i = 0; i < n; i++) {
            const el = document.createElement('div');
            el.className = 'confetti';
            const size = (Math.random() * 10) + 6;
            el.style.position = 'absolute';
            el.style.left = (Math.random() * 100) + '%';
            el.style.top = '-8%';
            el.style.width = size + 'px';
            el.style.height = (size * 0.6) + 'px';
            el.style.background = randColor();
            el.style.opacity = 0.95;
            el.style.borderRadius = '2px';
            el.style.pointerEvents = 'none';
            el.style.transition = 'transform 1400ms cubic-bezier(.15,.8,.3,1), top 1400ms linear, opacity 900ms';
            confettiLayer.appendChild(el);
            requestAnimationFrame(() => {
                const tx = (Math.random() * 80 - 40);
                el.style.top = (60 + Math.random() * 40) + '%';
                el.style.transform = `translateX(${tx}px) rotate(${Math.random() * 720}deg)`;
                el.style.opacity = 0.95;
            });
            setTimeout(() => el.remove(), 1600);
        }
    }
    function randColor() {
        const p = ['#00f0ff', '#00c4ff', '#00d6e6', '#00ffa8', '#66fffb'];
        return p[Math.floor(Math.random() * p.length)];
    }

    // =========================
    // SLIDESHOW
    function initSlideshow() {
        // guard
        if (!slides.length) return;
        // set first active
        slides.forEach((s, i) => s.classList.toggle('active', i === 0));
        current = 0;
        makeDots();
        startAuto();
        playPause.textContent = 'Pause';
    }
    function makeDots() {
        dotsContainer.innerHTML = '';
        slides.forEach((s, i) => {
            const btn = document.createElement('button');
            btn.dataset.idx = i;
            if (i === 0) btn.classList.add('active');
            btn.addEventListener('click', () => {
                goTo(i); resetAuto();
            });
            dotsContainer.appendChild(btn);
        });
    }
    function goTo(i) {
        if (i < 0) i = slides.length - 1;
        if (i >= slides.length) i = 0;
        slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
        Array.from(dotsContainer.children).forEach((d, idx) => d.classList.toggle('active', idx === i));
        current = i;
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function startAuto() { stopAuto(); slideTimer = setInterval(() => next(), 3000); }
    function stopAuto() { if (slideTimer) clearInterval(slideTimer); slideTimer = null; }
    function resetAuto() { stopAuto(); startAuto(); }

    // controls
    prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
    nextBtn.addEventListener('click', () => { next(); resetAuto(); });
    playPause.addEventListener('click', () => {
        autoPlay = !autoPlay;
        if (autoPlay) { startAuto(); playPause.textContent = 'Pause'; } else { stopAuto(); playPause.textContent = 'Play'; }
    });

    // keyboard support
    document.addEventListener('keydown', (e) => {
        if (sceneSlide.classList.contains('visible')) {
            if (e.key === 'ArrowRight') { next(); resetAuto(); }
            if (e.key === 'ArrowLeft') { prev(); resetAuto(); }
            if (e.key === ' ') { e.preventDefault(); playPause.click(); }
        }
    });

    // clicking gift box also opens
    giftCard.addEventListener('click', () => {
        // if lid not yet open, open immediately
        if (!giftCard.querySelector('.lid').classList.contains('open-lid')) {
            openBoxAndExplode();
        }
    });

    //sound
    document.getElementById('gift').addEventListener('click', () => {
        bgm.volume = 0.45;   // volume enak, tidak terlalu kencang
        bgm.play().catch(() => { });
    });

    // preload slides images (optional)
    window.addEventListener('load', () => {
        slides.forEach(img => {
            const src = img.getAttribute('src');
            const p = new Image(); p.src = src;
        });
    });

})();