const d = document;
const $header = d.querySelector("header");
const $homeIntro = d.querySelector(".home-intro");
const $heroText = d.querySelector(".hero__text");
const $heroImage = d.querySelector(".hero__img");
const path = location.pathname;

/* Preloader */

if(d.querySelector('.preload')) {
    window.addEventListener('load', function preloader() {
        const $preload = d.querySelector('.preload');
        const $video = d.querySelector('.video-intro');
        $video.playbackRate = 1.4;
        
        setTimeout(() => {
            $preload.classList.add('preloaded');
            setTimeout(() => {
                $preload.remove();
            }, 1000);
        }, 2800);

        window.removeEventListener('load', preloader);
    });
}

/* Intersection Observer */

function headerObserver() {
    const cb = (entries) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                $header.classList.add("nav-scrolled");
            } else {
                $header.classList.remove("nav-scrolled");
            }
        });
    }

    const observer = new IntersectionObserver(cb, {
        rootMargin: "-320px 0px 0px 0px"
    });

    if(path === "/") {
        observer.observe($heroText);
    } else {
        observer.observe($heroImage);
    }

    const $scale = d.querySelectorAll('.scale-in');
    const $fadeIn = d.querySelectorAll('.fade-in');

    const appearOptions = {
        rootMargin: "-320px 0px 0px 0px"
    };

    const scaleOnScroll = new IntersectionObserver(function(
        entries, scaleOnScroll
    ) {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("is-active");
                scaleOnScroll.unobserve(entry.target);
            }
        })
    }, appearOptions);

    const appearOnScroll = new IntersectionObserver(function(
        entries, appearOnScroll
    ) {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("is-active");
                appearOnScroll.unobserve(entry.target);
            }
        })
    }, appearOptions);

    $scale.forEach(scale => {
        scaleOnScroll.observe(scale);
    });

    $fadeIn.forEach(fade => {
        appearOnScroll.observe(fade);
    });
}



/* Banner Changer */

if(path !== "/") {
    function heroUpdate() {
        if(path === "/somos") {
            $heroImage.src = "assets/img/about.jpg";
            $heroImage.alt = "Altea Historia";
            $heroText.style.display = "none";
            $heroImage.style.height = "50vh";
            $heroImage.style.objectPosition = "50%";
            $heroImage.style.padding = "0";
            $homeIntro.style.height = "auto";
        } else if(path === "/contacto") {
            $heroImage.src = "assets/img/contact.jpg";
            $heroImage.alt = "Altea Contacto";
            $heroText.style.display = "none";
            $heroImage.style.height = "50vh";
            $heroImage.style.objectPosition = "80%";
            $heroImage.style.padding = "0";
            $homeIntro.style.height = "auto";
        } else {
            return
        }
    }
    heroUpdate();
}

/* Contact Form */

if(d.querySelectorAll(".input")) {
    const $inputs = d.querySelectorAll(".input");
    function focusInput() {
        $inputs.forEach(input => {
            input.addEventListener("focus", e => {
                // console.log(e);
                const parentEl = e.target.offsetParent;
                if(e.target.value === "") {
                    parentEl.classList.add("focus");
                } else {
                    parentEl.classList.remove("focus");
                }
            });

            input.addEventListener("blur", e => {
                const parentEl = e.target.offsetParent;
                if(e.target.value === "") {
                    parentEl.classList.remove("focus");
                } else {
                    parentEl.classList.add("focus");
                }
            });
        });
    }
}

d.addEventListener("DOMContentLoaded", e => {
    headerObserver();
    focusInput();
});

/* Modal */

if(d.querySelector(".wrap-services")) {
    const $programsContainer = d.querySelector(".wrap-services");
    const $modal = d.querySelector(".program__modal");

    $programsContainer.addEventListener("click", e => {
        const $modalToggle = e.target.closest(".program__link");
        if(!$modalToggle) return;

        const $modal = $modalToggle.parentNode.nextElementSibling;
        const $modalCloseBtn = $modal.querySelector(".modal__close")

        const modalOpen = () => {
            $modal.classList.add("is-active");
            $modal.style.animation = 'modalIn 500ms forwards';
            d.body.style.overflowY = 'hidden';
        }

        const modalClose = () => {
            $modal.classList.remove("is-active");
            $modal.removeEventListener("animationend", modalClose);
        }

        $modalCloseBtn.addEventListener("click", e => {
            $modal.style.animation = 'modalOut 500ms forwards';
            $modal.addEventListener("animationend", modalClose);
            d.body.style.overflowY = 'scroll';
        });

        d.addEventListener("keydown", e => {
            if(e.keyCode === 27) {
                $modal.classList.remove("is-active");
                $modal.removeEventListener("animationend", modalClose);
                d.body.style.overflowY = 'scroll';
            }
        });

        modalOpen();
    });
}

function servicesSection() {
    const $serviceToggle = d.querySelectorAll(".service__title");
    const $arrowToggle = d.querySelectorAll(".service-toggle");

    $serviceToggle.forEach(el => {
        el.addEventListener("click", e => {
            if(e.target.matches(".service__title")) {
                $options = e.target.parentElement.lastElementChild;
                $options.classList.toggle("is-active");
                e.target.children[0].classList.toggle("is-active");
            }
        });
    });
}

servicesSection();

if(d.querySelector(".slider-btns .next")) {
    function slider() {
        const $nextBtn = d.querySelector(".slider-btns .next");
        const $prevBtn = d.querySelector(".slider-btns .prev");
        const $slides = d.querySelectorAll(".slider-slide");
        let i = 0;
        let interval;

        interval = setInterval(() => {
            $slides[i].classList.remove("active");
            i++;

            if(i >= $slides.length) {
                i = 0;
            }

            $slides[i].classList.add("active")
        }, 10000)

        d.addEventListener("click", e => {
            if(e.target === $prevBtn) {
                e.preventDefault();
                clearInterval(interval)
                $slides[i].classList.remove("active");
                i--;

                if(i < 0) {
                    i = $slides.length - 1;
                }

                $slides[i].classList.add("active");
            }

            if(e.target === $nextBtn) {
                e.preventDefault();
                clearInterval(interval)
                $slides[i].classList.remove("active");
                i++;

                if(i >= $slides.length) {
                    i = 0;
                }

                $slides[i].classList.add("active");
            }
        });

    }
    slider();
}

if(d.querySelector('.contact-form')) {
    function form() {
        const $form = d.querySelector('.contact-form');
        const $loader = d.querySelector('.contact-form-loader');
        const $response = d.querySelector('.form-modal');
        const $modalRes = d.querySelector('.modal-form-btn');

        $form.addEventListener("submit", e => {
            e.preventDefault();
            $loader.classList.remove('none');

            fetch('https://formsubmit.co/ajax/paveparadise_@hotmail.com', {
                method: "POST",
                body: new FormData(e.target),
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                console.log(json);
                $modalRes ? $modalRes.innerHTML = `¡Mensaje enviado! <i class="fas fa-check"></i>` : null;
                $response ? $response.classList.remove('none') : null;
                $form.reset();
            })
            .catch(err => {
                let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
                console.log(message);
            })
            .finally(() => {
                $modalRes ? $modalRes.disabled = true : null;
                $loader.classList.add('none');
                setTimeout(() => {
                    $response ? $response.classList.add('none') : null;
                }, 5000);
            });

        });
    }

    form();
}
