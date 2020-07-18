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




    // nextSlideTl.fromTo(nextSlide, { y: '0%' }, { y: '100%' });
    // nextSlideTl.fromTo(slide, { opacity: 0, scale: 1 }, { opacity: 1, scale: 0.5 });
    // nextSlideTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    // nextSlideScene = new ScrollMagic.Scene({
    //   triggerElement: slide,
    //   triggerHook: 0,
    //   duration: '100%'
    // })
    //   .setTween(nextSlideTl)
    //   .addIndicators({
    //     colorStart: 'white',
    //     colorTrigger: 'white',
    //     name: 'nextSlide',
    //     indent: 200
    //   })
    //   .setPin(slide, { pushFollowers: false })
    //   .addTo(controller);
    // ;
  });
}

// cursor interaction
const cursor = document.querySelector('.cursor');
const cursorText = cursor.querySelector('span');
const burger = document.querySelector('.burger');

function cursorFn(e) {
  // cursor.style.top = cursor.offsetTop + 'px';
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
  cursor.setAttribute('data-offset', cursor.offsetTop - window.scrollY)
  // console.log(cursor.offsetTop)
}
function cursorFnScroll(e) {
  const fromTop = cursor.getAttribute('data-offset');
  cursor.style.top = parseInt(fromTop, 10) + scrollY + 'px';
  console.log('from top=' + fromTop);
  console.log('scrollY=' + scrollY);
}

// events

window.addEventListener('mousemove', cursorFn);
window.addEventListener('scroll', cursorFnScroll);

animationSlide();
