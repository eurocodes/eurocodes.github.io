/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    /*Active link*/
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    /*Remove menu mobile*/
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

// TYPED EFFECT
let TextType = function (el, toType, period) {
    this.toType = toType;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 200;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};
TextType.prototype.tick = function () {
    let i = this.loopNum % this.toType.length;
    let fullTxt = this.toType[i]

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; };

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};
window.onload = function () {
    let elements = document.getElementsByClassName("typed");
    for (let i = 0; i < elements.length; i++) {
        let toType = elements[i].getAttribute("data-rotate");
        let period = elements[i].getAttribute("data-period");

        if (toType) {
            new TextType(elements[i], JSON.parse(toType), period);
        }
    }
    // Inject css
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typed > .wrap {border-right: 0.08em solid #307ccc}";
    document.body.appendChild(css);
};

// PROJECT SECTION
let projects = document.getElementById("project");
let projectImage = projects.getElementsByClassName("image");
let descText = projects.getElementsByClassName("light-text");

for (let i = 0; i < projectImage.length; i++) {
    projectImage[i].addEventListener("mouseover", () => {
        descText[i].classList.add("shown");
        descText[i].classList.remove("hidden");
    })
}

for (let i = 0; i < projectImage.length; i++) {
    projectImage[i].addEventListener("mouseout", () => {
        descText[i].classList.remove("shown");
        descText[i].classList.add("hidden");
    })
}

/*SCROLL HOME*/
sr.reveal('.home__title', {});
sr.reveal('.button', { delay: 200 });
sr.reveal('.home__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal('.about__img', {});
sr.reveal('.about__subtitle', { delay: 400 });
sr.reveal('.about__text', { delay: 400 });

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {});
sr.reveal('.skills__text', {});
sr.reveal('.skills__data', { interval: 200 });
sr.reveal('.skills__img', { delay: 600 });

/*SCROLL WORK*/
sr.reveal('.work__img', { interval: 200 });

/*SCROLL CONTACT*/
sr.reveal('.contact__input', { interval: 200 });

/**SUBMIT FORM */
const form = document.getElementById("form-field");
form.onsubmit = async function (e) {
    e.preventDefault();
    const req = JSON.stringify({
        email: form.email.value,
        name: form.name.value,
        subject: form.subject.value,
        message: form.message.value
    });
    const response = await fetch('https://ugee-forms.herokuapp.com/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: req,
    })

    if (response.status == 200) {
        const result = await response.json();
        alert(result.message)
    } else {
        const { message } = await response.json();
        alert(message)
    }
    this.reset();
}

// FOOTER
const currentYear = new Date().getFullYear()
const footer = document.getElementById("copy-right");
footer.innerHTML = `&#169; ${currentYear} all right reserved`;