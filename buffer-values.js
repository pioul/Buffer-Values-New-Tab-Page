(function() {
  'use strict';

  var displayModes = ['pictures', 'colors'];

  var backgroundImages = [
    ['../graphics/backgrounds/epic-iceland.jpg',
     '../graphics/backgrounds/orange-light-in-queenstown-new-zealand.jpg'],
    ['../graphics/backgrounds/jacks-point.jpg',
     '../graphics/backgrounds/tekapo-new-zealand-trey-ratcliff-2.jpg'],
    ['../graphics/backgrounds/trey-ratcliff-walking-alone-and-being-somewhat-lost-on-which-way.jpg',
     '../graphics/backgrounds/auckland-night.jpg'],
    ['../graphics/backgrounds/trey-ratcliff-new-york-inception.jpg',
     '../graphics/backgrounds/bang2.jpg'],
    ['../graphics/backgrounds/ohau-cliff-hawaii-trey-ratcliff.jpg',
     '../graphics/backgrounds/sleeping-in.jpg'],
    ['../graphics/backgrounds/day-17-randy-erebus-halo.jpg',
     '../graphics/backgrounds/sheep-in-new-zealand.jpg'],
    ['../graphics/backgrounds/the-lonely-trinity.jpg',
     '../graphics/backgrounds/the-water-in-autumn.jpg'],
    ['../graphics/backgrounds/morning-with-coffee-in-yellowstone.jpg',
     '../graphics/backgrounds/trey-ratcliff-medieval-village.jpg'],
    ['../graphics/backgrounds/behind-my-house-new-zealand.jpg',
     '../graphics/backgrounds/bonus-pink-sky.jpg'],
    ['../graphics/backgrounds/farewell-san-francisco.jpg',
     '../graphics/backgrounds/seattle.jpg']
  ];

  var randValueIndex;

  init();

  function init() {
    var displayMode = localStorage.getItem('mode') || displayModes[0];
    var values = document.querySelectorAll('.value');
    var randValue;

    randValueIndex = Math.floor(Math.random() * values.length);
    randValue = values[randValueIndex];

    document.body.classList.add('mode-' + displayMode);
    randValue.classList.add('is-visible'); // \o/

    displayMode == 'pictures' ? displayPictures() : displayColors();

    initBindings();
  }

  function initBindings() {
    document.getElementById('mode-selector').addEventListener('click', function(e) {
      if (e.target.nodeName != 'BUTTON') return;

      var mode = e.target.getAttribute('data-select-mode');
      changeMode(mode);
    });
  }

  function displayPictures() {
    var randBackgroundIndex;
    var fadeImgIn;
    var img;

    // Load image
    // We're using a hidden img element to load the image and be able to listen to its
    // load event, in order to prevent visual glitchs which would happen if made visible
    // before; once the load event fires, we smoothly reveal the background. We're not
    // revealing the img element itself because 'object-fit: cover' causes glitches too
    // when animated, so we use a pseudo-element's background with 'background-size: cover'
    // to display the image.
    img = document.createElement('img');
    randBackgroundIndex = Math.floor(Math.random() * 2); // 2 backgrounds each
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
  }

  function displayColors() {
    document.body.classList.add('color-' + (randValueIndex + 1));
  }

  function changeMode(mode) {
    if (displayModes.indexOf(mode) == -1) return;

    localStorage.setItem('mode', mode);
    location.reload();
  }

})();
