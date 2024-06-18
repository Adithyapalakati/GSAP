import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const ParallaxSite = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const boxes = document.querySelectorAll('.box');
    const cards = document.querySelectorAll('.card');

    boxes.forEach((box, index) => {
      let targetIndex = (index + 2) % 4; // Calculate the target index (2, 3, 0, 1)
      gsap.to(box, {
        scrollTrigger: {
          trigger: '#section2',
          start: 'top center',
          end: 'center center',
          scrub: true,
          onLeave: () => {
            let wave = cards[targetIndex].querySelector('.wave');
            gsap.to(wave, {
              height: '100%',
              duration: 0.1,
              ease: 'power2.out'
            });
          },
          onEnterBack: () => {
            let wave = cards[targetIndex].querySelector('.wave');
            gsap.set(wave, { height: '0%' }); // Reset wave position when scrolling back up
          }
        },
        x: cards[targetIndex].offsetLeft - box.offsetLeft,
        y: cards[targetIndex].offsetTop - box.offsetTop,
        duration: 1
      });
    });

    // Animate boxes to circles in Section3
    const circles = document.querySelectorAll('.circle');
    boxes.forEach((box, index) => {
      const circle = circles[index];
      if (circle) {
        circle.setAttribute('data-target-index', (index + 2) % 4);
        gsap.to(box, {
          scrollTrigger: {
            trigger: '#section3',
            start: 'top center',
            end: 'center center',
            scrub: true,
          },
          x: circle.offsetLeft - box.offsetLeft,
          y: circle.offsetTop - box.offsetTop,
          duration: 1
        });
      }
    });

  }, []);

  return (
    <div>
      <section id="section1">
        <div className="container">
          <div className="hero-box">
            <div className="box" id="box1">1</div>
            <div className="box" id="box2">2</div>
          </div>
          <h1>Welcome to parallax</h1>
          <div className="hero-box">
            <div className="box" id="box3">3</div>
            <div className="box" id="box4">4</div>
          </div>
        </div>
      </section>
      <section id="section2">
        <div className="container">
          <div className="card" id="card1"><div className="wave"></div><p>1</p></div>
          <div className="card" id="card2"><div className="wave"></div><p>2</p></div>
          <div className="card" id="card3"><div className="wave"></div><p>3</p></div>
          <div className="card" id="card4"><div className="wave"></div><p>4</p></div>
        </div>
      </section>
      <section id="section3" className="h-screen flex justify-center items-center">
        <div className="circle-container flex gap-4">
          <div className="flex items-center">
            <div className="circle"></div>
            <p className="ml-2">UI</p>
          </div>
          <div className="flex items-center">
            <div className="circle"></div>
            <p className="ml-2">UX</p>
          </div>
          <div className="flex items-center">
            <div className="circle"></div>
            <p className="ml-2">Design</p>
          </div>
          <div className="flex items-center">
            <div className="circle"></div>
            <p className="ml-2">Development</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParallaxSite;
