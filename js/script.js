const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
};

const $logo = document.querySelectorAll('.logo')[0];
const $navBar = document.querySelectorAll('.nav-bar')[0];
window.addEventListener('scroll', toggleNavBar, false);
function toggleNavBar()
{
    if(window.pageYOffset >= $logo.offsetHeight
        && $navBar.classList.contains('abs-pos'))
    {
        $navBar.classList.remove('abs-pos');
        $navBar.classList.add('fix-pos');
    }
    else if(window.pageYOffset < $logo.offsetHeight
        && $navBar.classList.contains('fix-pos'))
    {
        $navBar.classList.add('abs-pos');
        $navBar.classList.remove('fix-pos');
    }
}
const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
const windowTop = window.pageYOffset + (window.innerHeight * 0.75);
target.forEach((element) => {
    console.log(element)
    console.log(windowTop)
    console.log(element.offsetTop)
    if(windowTop > element.offsetTop) {
    element.classList.add(animationClass);
    } else {
    element.classList.remove(animationClass);
    }
})
}

animeScroll();

const handleScroll = debounce(animeScroll, 200);

if(target.length) {
window.addEventListener('scroll', handleScroll);
}

const menuItens = document.querySelectorAll('.navigator a');
menuItens.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
})

function scrollToIdOnClick(event){
    event.preventDefault();
    const element = event.target;
    const id = element.getAttribute('href');
    const section = getScrollTopByHref(event.target) - 80;
   
    scrollToPosition(section);
   
}

function scrollToPosition(section){

    window.scroll({
        top: section - 60, 
        behavior: "smooth",

    });

    //smoothScrollTo(0, section);
}

function getScrollTopByHref(element){
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
}

function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
  
    duration = typeof duration !== 'undefined' ? duration : 400;
  
    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
  
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
  };