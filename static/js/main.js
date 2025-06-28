/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


document.addEventListener("DOMContentLoaded", function () {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  let currentOpen = null; // Simpan item yang sedang terbuka

  portfolioItems.forEach(item => {
    const h3 = item.querySelector("h3");
    const p = item.querySelector("p");

    const fullTitle = h3.textContent.trim();
    const fullText = p.textContent.trim();
    const combinedLength = fullTitle.length + fullText.length;

    // Batas karakter
    const limit = 125;

    if (combinedLength > limit) {
      const maxTitle = 60;
      const maxText = 65;

      const shortTitle = fullTitle.length > maxTitle ? fullTitle.substring(0, maxTitle) + "..." : fullTitle;
      const shortText = fullText.length > maxText ? fullText.substring(0, maxText) + "..." : fullText;

      // Simpan versi full di attribute
      h3.setAttribute("data-full", fullTitle);
      p.setAttribute("data-full", fullText);
      h3.setAttribute("data-short", shortTitle);
      p.setAttribute("data-short", shortText);

      // Set teks pendek sebagai default
      h3.textContent = shortTitle;
      p.textContent = shortText;

      // Tombol read more
      const readMoreBtn = document.createElement("button");
      readMoreBtn.textContent = "Read more";
      readMoreBtn.className = "read-more-btn";

      readMoreBtn.addEventListener("click", function () {
        // Jika ada yang terbuka, tutup dulu
        if (currentOpen && currentOpen !== item) {
          const openH3 = currentOpen.querySelector("h3");
          const openP = currentOpen.querySelector("p");
          const newBtn = document.createElement("button");
          newBtn.textContent = "Read more";
          newBtn.className = "read-more-btn";

          newBtn.addEventListener("click", arguments.callee); // Bind ulang handler
          openH3.textContent = openH3.getAttribute("data-short");
          openP.textContent = openP.getAttribute("data-short");
          currentOpen.querySelector(".read-more-btn")?.remove();
          currentOpen.querySelector(".portfolio-actions").before(newBtn);
        }

        // Tampilkan konten penuh
        h3.textContent = h3.getAttribute("data-full");
        p.textContent = p.getAttribute("data-full");
        readMoreBtn.remove();
        currentOpen = item; // Tandai sebagai terbuka
      });

      item.querySelector(".portfolio-actions").before(readMoreBtn);
    }
    });
  });
