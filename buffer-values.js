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

  var itscattimeImages = [
    '../graphics/itscattime/cat-1.jpg',
    '../graphics/itscattime/cat-2.jpg'
  ];

  init();

  function init() {
    var values = document.querySelectorAll('.value');
    var isItCatTime = wouldItBeCatTime();
    var displayMode = isItCatTime ? displayModes[0] : (localStorage.getItem('mode') || displayModes[0]);
    var randValueIndex;
    var randValue;

    randValueIndex = getRandom(values.length);
    randValue = values[randValueIndex];

    document.body.classList.add('mode-' + displayMode);
    randValue.classList.add('is-visible'); // \o/



    if (isItCatTime) {
      displayPictures('itscattime', randValueIndex);
      document.body.classList.add('is-cattime');
    } else {
      displayMode == 'pictures' ? displayPictures('backgrounds', randValueIndex) : displayColors(randValueIndex);
    }

    initBindings();
  }

  function initBindings() {
    document.getElementById('mode-selector').addEventListener('click', function(e) {
      if (e.target.nodeName != 'BUTTON') return;

      var mode = e.target.getAttribute('data-select-mode');
      changeMode(mode);
    });
  }

  function displayPictures(pictureSetName, randValueIndex) {
    var randBackgroundIndex;
    var fadeImgIn;
    var img;

    var pictureSet = getPictureSet(pictureSetName);

    // Load image
    // We're using a hidden img element to load the image and be able to listen to its
    // load event, in order to prevent visual glitchs which would happen if made visible
    // before; once the load event fires, we smoothly reveal the background. We're not
    // revealing the img element itself because 'object-fit: cover' causes glitches too
    // when animated, so we use a pseudo-element's background with 'background-size: cover'
    // to display the image.
    img = document.createElement('img');
    randBackgroundIndex = getRandom(pictureSet.range); // 2 backgrounds each
    img.src = pictureSet.getSrc(randValueIndex, randBackgroundIndex);
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

  function displayColors(randValueIndex) {
    document.body.classList.add('color-' + (randValueIndex + 1));
  }

  // Return an integer between 0 and (range - 1)
  function getRandom(range) {
    return Math.floor(Math.random() * range);
  }

  function getPictureSet(pictureSetName) {
    var pictureSets = {
      backgrounds: {
        range: 2, // Each value has 2 backgrounds
        arr: backgroundImages,
        getSrc: function(randValueIndex, randBackgroundIndex) {
          return this.arr[randValueIndex][randBackgroundIndex]
        }
      },
       itscattime: {
        range: itscattimeImages.length,
        arr: itscattimeImages,
        getSrc: function(randValueIndex, randBackgroundIndex) {
          return this.arr[randBackgroundIndex]
        }
      }
    };

    return pictureSets[pictureSetName];
  }

  // Well, yes
  function wouldItBeCatTime() {
    return getRandom(500) == 0;
  }

  function changeMode(mode) {
    if (displayModes.indexOf(mode) == -1) return;

    localStorage.setItem('mode', mode);
    location.reload();
  }

})();
