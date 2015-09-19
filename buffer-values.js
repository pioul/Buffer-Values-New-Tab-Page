(function() {
  var backgroundImages = [
    ['../images/backgrounds/epic-iceland.jpg',
     '../images/backgrounds/orange-light-in-queenstown-new-zealand.jpg'],
    ['../images/backgrounds/jacks-point.jpg',
     '../images/backgrounds/tekapo-new-zealand-trey-ratcliff-2.jpg'],
    ['../images/backgrounds/trey-ratcliff-walking-alone-and-being-somewhat-lost-on-which-way.jpg',
     '../images/backgrounds/auckland-night.jpg'],
    ['../images/backgrounds/trey-ratcliff-new-york-inception.jpg',
     '../images/backgrounds/bang2.jpg'],
    ['../images/backgrounds/ohau-cliff-hawaii-trey-ratcliff.jpg',
     '../images/backgrounds/sleeping-in.jpg'],
    ['../images/backgrounds/day-17-randy-erebus-halo.jpg',
     '../images/backgrounds/sheep-in-new-zealand.jpg'],
    ['../images/backgrounds/the-lonely-trinity.jpg',
     '../images/backgrounds/the-water-in-autumn.jpg'],
    ['../images/backgrounds/morning-with-coffee-in-yellowstone.jpg',
     '../images/backgrounds/trey-ratcliff-medieval-village.jpg'],
    ['../images/backgrounds/behind-my-house-new-zealand.jpg',
     '../images/backgrounds/bonus-pink-sky.jpg'],
    ['../images/backgrounds/farewell-san-francisco.jpg',
     '../images/backgrounds/seattle.jpg']
  ];

  var values = document.querySelectorAll('.value');
  var randValueIndex = Math.floor(Math.random() * values.length);
  var randValue = values[randValueIndex];
  var randBackgroundIndex = Math.floor(Math.random() * 2); // 2 backgrounds each
  var fadeImgIn;
  var img;

  randValue.classList.add('is-visible'); // \o/

  // Load image
  // We're using a hidden img element to load the image and be able to listen to its
  // load event, in order to prevent visual glitchs which would happen if made visible
  // before; once the load event fires, we smoothly reveal the background. We're not
  // revealing the img element itself because 'object-fit: cover' causes glitches too
  // when animated, so we use a pseudo-element's background with 'background-size: cover'
  // to display the image.
  img = document.createElement('img');
  img.src = backgroundImages[randValueIndex][randBackgroundIndex];
  document.body.appendChild(img);

  // Once loaded, reveal it
  // A pseudo-element's styles can't be accessed programmatically, so inserting a new
  // style rule in the stylesheet to set the background dynamically it is! :)
  fadeImgIn = function() {
    document.styleSheets[1].insertRule(`
      body::before {
        background-image: url(${img.src});
      }
    `, 0);
    document.body.classList.add('background-is-loaded');
  };

  if (img.complete) fadeImgIn(); // Fade in if already loaded
    else img.addEventListener('load', fadeImgIn); // Or fade in when loaded

})();
