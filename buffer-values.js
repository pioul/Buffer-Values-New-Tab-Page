(function() {
  var values = document.querySelectorAll('.value');
  var randValueIndex = Math.floor(Math.random() * values.length);
  var randValue = values[randValueIndex];

  randValue.style.display = 'block'; // \o/
})();
