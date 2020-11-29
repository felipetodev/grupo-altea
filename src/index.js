const d = document;


const $header = d.querySelector("header");
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

if(path !== "/") {
    function heroUpdate() {
        if(page === "/acerca") {
            $heroImage.src = "assets/img/about.jpg";
            $heroImage.alt = "banner";
            $heroText.style.display = "none";
            $heroImage.style.height = "50vh";
            $heroImage.style.objectFit = "cover";
        } else if(page === "/contacto") {
            $heroImage.src = "assets/img/contact.jpg";
            $heroImage.alt = "banner";
            $heroText.style.display = "none";
            $heroImage.style.height = "50vh";
            $heroImage.style.objectFit = "cover";
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
            input.addEventListener("click", e => {
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