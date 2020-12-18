const d = document;


const $header = d.querySelector("header");
const $homeIntro = d.querySelector(".home-intro");
const $heroText = d.querySelector(".hero__text");
const $heroImage = d.querySelector(".hero__img");
const path = location.pathname;
const page = path.substring(0, path.lastIndexOf("."));

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
        rootMargin: "-250px 0px 0px 0px"
    });

    if(page === "/index" || path === "/") {
        observer.observe($heroText);
    } else {
        observer.observe($heroImage);
    }
}



/* Banner Changer */

if(path !== "/" || path !== "/index.html") {
    function heroUpdate() {
        if(page === "/somos") {
            $heroImage.src = "assets/img/about.jpg";
            $heroImage.alt = "Altea Historia";
            $heroText.style.display = "none";
            $heroImage.style.height = "50vh";
            $heroImage.style.padding = "0";
            $homeIntro.style.height = "auto";
        } else if(page === "/contacto") {
            $heroImage.src = "assets/img/contact.jpg";
            $heroImage.alt = "Altea Contacto";
            $heroText.style.display = "none";
            $heroImage.style.height = "50vh";
            $heroImage.style.padding = "0";
            $homeIntro.style.height = "auto";
        } else {
            return
        }
    }
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
    heroUpdate();
    focusInput();
});

/* Modal */

const $programsContainer = d.querySelector(".wrap-services");
const $modal = d.querySelector(".program__modal");

$programsContainer.addEventListener("click", e => {
    // console.log(e);
    // e.preventDefault();

    const $modalToggle = e.target.closest(".program__link");
    // console.log($modalToggle);
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

