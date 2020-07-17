let controller;
let slideScene;
let pageScene;
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
    slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=.5')
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

  });
}

// cursor interaction
const cursor = document.querySelector('.cursor');
const cursorText = cursor.querySelector('span');
const burger = document.querySelector('.burger');

animationSlide();