export const particlePresets = {
  default: {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 1000 } }, // was 50 and 800
      color: { value: "#22d3ee" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 100, color: "#22d3ee", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out" }
    },
    interactivity: {
      // events: { onhover: { enable: false, mode: "repulse" }, onclick: { enable: false, mode: "push" } }
      events: { onhover: { enable: false }, onclick: { enable: false } }
    },
    retina_detect: false // from true
  },
  nasa: {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 1, anim: { enable: true, speed: 1, opacity_min: 0.05, sync: false } },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      events: { onhover: { enable: false, mode: "bubble" } },
      // modes: { bubble: { distance: 200, size: 0, duration: 2, opacity: 0 } }
    },
    retina_detect: false // from true
  },
  bubble: {
    particles: {
      number: { value: 20, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.3, random: true },
      size: { value: 40, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 2, direction: "top", random: false, straight: false, out_mode: "out" }
    },
    retina_detect: false // from true
  },
  snow: {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 5, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 1.5, direction: "bottom", random: false, straight: false, out_mode: "out" }
    },
    retina_detect: false // from true
  },
  // nyancat: {
  //   particles: {
  //     number: { value: 8, density: { enable: true, value_area: 800 } },
  //     shape: {
  //       type: "image",
  //       image: {
  //         src: "https://vincentgarreau.com",
  //         width: 100,
  //         height: 100
  //       }
  //     },
  //     size: { value: 32, random: false },
  //     line_linked: { enable: false },
  //     move: { enable: true, speed: 4, direction: "right", straight: true, out_mode: "out" }
  //   },
  //   retina_detect: false // from true
  // }
};
