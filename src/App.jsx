import React, { useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'

function App() {

  let [showContent, setShowContent] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(".vi-mask-group", {
      rotate: 80,
      duration: 2,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
    })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "expo.inOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= .9) {
            document.querySelector(".svg").remove();
            setShowContent(true)
            this.kill()
          }
        }
      })
  })

  useGSAP(()=>{

    if(!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate:0,
      duration:2,
      delay: "-1",
      ease: "expo.inOut",
    });
    gsap.to(".sky", {
      scale: 1.2,
      rotate:0,
      duration:2,
      delay: "-.8",
      ease: "expo.inOut",
    });
    gsap.to(".bg", {
      scale: 1.1,
      rotate:0,
      duration:2,
      delay: "-.8",
      ease: "expo.inOut",
    });
    gsap.to(".girl", {
      scale: 2,
      x:"-50%",
      bottom: "-19%",
      rotate:0,
      duration:2,
      delay: "-.8",
      ease: "expo.inOut",
    });

    const main = document.querySelector(".main")

    main?.addEventListener("mousemove", function(e){
      const xMove = (e.clientX / window.innerWidth - .5) * 40;
      gsap.to(".imgdiv .text",{
        x: `${xMove * 0.8}%`
      });
      gsap.to(".sky",{
        x: xMove
      });
      gsap.to(".bg",{
        x: xMove *1.7
      });
    })
  }, [showContent])

  return (
    <>
      <div className="svg fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000] flex items-center justify-center">

        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className='main w-full rotate-[10deg] scale-[1.7] '>
          <div className="landing relative overflow-hidden w-full h-screen bg-[#000]">

            <div className="navbar absolute top-0 left-0 z-[10] w-full px-10 py-10 ">
              <div className="logo flex items-center gap-7">
                <div className="lines flex flex-col gap-1">
                  <div className="line w-11 h-1 bg-white"></div>
                  <div className="line w-8 h-1 bg-white"></div>
                  <div className="line w-5 h-1 bg-white"></div>
                </div>
                <h3 className='text-3xl text-white leading-none -mt-[7px]'>Rockstar</h3>
              </div>
            </div>

            <div className="imgdiv overflow-hidden relative w-full h-screen">
              <img className='absolute sky w-full h-full object-cover scale-[1.5] rotate-[-20deg]' src="./sky.png" alt="" />

              <img className='absolute bg w-full h-full object-cover scale-[1.8] rotate-[-15deg]' src="./bg.png" alt="" />

              <div className="text absolute top-0 left-1/2 -translate-x-1/2 text-white flex flex-col gap-4">
                <h1 className='text-9xl -ml-20 leading-none'>grand</h1>
                <h1 className='text-9xl ml-20 leading-none'>theft</h1>
                <h1 className='text-9xl -ml-20 leading-none'>auto</h1>
              </div>

              <img className='absolute girl bottom-[-150%] left-1/2 -translate-x-1/2 scale-[2.7] h-[70%] rotate-[-15deg]' src="./girlbg.png" alt="" />
            </div>

            <div className="btmbar text-white text-3xl absolute bottom-0 left-0 w-full py-15 px-1 bg-gradient-to-t from-black to-transparent">
              <img className='absolute top-1/2 left-1/2 -translate-x-1/2 h-[45px]' src="./ps5.png" alt="" />
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default App