let controller;
let slideScene;
let nextSlideScene;
let detailScene;

function animationSlide() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll('.slide');
  const nav = document.querySelector('.nav-header');

  slides.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector('.reveal-img')
    const slideImg = slide.querySelector('img');
    const revealText = slide.querySelector('.reveal-text');

    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: 'power2-inOut' }
    });
    slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' });
    slideTl.fromTo(slideImg, { scale: 2 }, { scale: 1 }, '-=1');
    slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=.5');
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: 'white',
        colorTrigger: 'white',
        name: 'slide'
      })
      .addTo(controller);

    // adding the next slide animation
    const nextSlideTl = gsap.timeline();
    let nextSlide = (slides.length - 1) === index ? 'end' : slides[index + 1];

    // nextSlideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 });
    nextSlideTl.fromTo(nextSlide, { y: '0%' }, { y: '50%' })
    nextSlideTl.fromTo(slide, { scale: 1, opacity: 1 }, { scale: .5, opacity: 0 })
    nextSlideTl.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-=.5')

    nextSlideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: '100%'
    }).setTween(nextSlideTl)
      .addIndicators({
        colorStart: 'red',
        colorTrigger: 'red',
        name: 'nextSl',
        indent: 150
      })
      .setPin(slide, { pushFollowers: false })
      .addTo(controller)
  });
}

// cursor interaction
const cursor = document.querySelector('.cursor');
const cursorText = cursor.querySelector('span');
const burger = document.querySelector('.burger');

function cursorFn(e) {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
  cursor.setAttribute('data-offset', cursor.offsetTop - window.scrollY)
}
function cursorFnScroll(e) {
  const fromTop = cursor.getAttribute('data-offset');
  cursor.style.top = parseInt(fromTop, 10) + scrollY + 'px';
  // console.log('from top=' + fromTop);
  // console.log('scrollY=' + scrollY);
}

function activeCursor(e) {
  // console.log(e.target)
  if (e.target.id === 'logo' || e.target.classList.contains('burger')) {
    cursor.classList.add('nav-active');
  } else {
    cursor.classList.remove('nav-active');
  }
  if (e.target.classList.contains('explore')) {
    cursor.classList.add('explore-active');
    gsap.to('.title-swipe', 1, { y: '0%' });
    cursorText.innerText = "Tap";
  } else {
    cursor.classList.remove('explore-active');
    gsap.to('.title-swipe', 1, { y: '100%' });
    cursorText.innerText = '';
  }
}
function toggleNav(e) {
  console.log(e.target)
  if (!e.target.classList.contains('active')) {
    e.target.classList.add('active');
    gsap.to('.line1', .5, { rotate: '45', y: 5, background: 'black' });
    gsap.to('.line2', .5, { rotate: '-45', y: -5, background: 'black' });
    gsap.to('#logo', .5, { color: 'black' });
    gsap.to('.nav-bar', .5, { clipPath: 'circle(2500px at 100% -10%)' });
    document.body.classList.add('hide');
    cursor.style.borderColor = 'black';
    cursor.style.zIndex = 2;
  } else {
    e.target.classList.remove('active');
    gsap.to('.line1', .5, { rotate: '0', y: 0, background: 'white' });
    gsap.to('.line2', .5, { rotate: '0', y: 0, background: 'white' });
    gsap.to('#logo', .5, { color: 'white' });
    gsap.to('.nav-bar', .5, { clipPath: 'circle(0px at 100% -10%)' });
    document.body.classList.remove('hide');
    cursor.style.borderColor = 'white';
    cursor.style.zIndex = 1;
  }
}
// events
window.addEventListener('mouseover', activeCursor)
window.addEventListener('mousemove', cursorFn);
window.addEventListener('scroll', cursorFnScroll);
burger.addEventListener('click', toggleNav)

animationSlide();
