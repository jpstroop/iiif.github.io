
var interactiveImg = (function() {
  var frameHeight,
      frameWidth,
      elemIiifImg = $('.main-interactive-image .container-image img'),

      // BL Image, 5213 x 5706
      iiifImg = {
        baseUrl: 'http://stacks.stanford.edu/image/iiif/ff139pd0160%252FK90113-43',
        region: 'full',
        size: 'full',
        rotation: 0,
        quality: 'native',
        format: 'jpg'
      },
      ddOptions;


  function init() {
    calculateSelectOptions();
    loadImage();
    attachEvents();
  }


  function loadImage() {
    loadRegionOptions();
  }


  function attachEvents() {
    $(window).resize(function() {
      calculateSelectOptions();
      loadImage();
    });

    $('.try-it-region').on('change', function() {
      loadSizeOptions($(this).val());
    });

    $('.try-it-size').on('change', function() {
      var region = $('.try-it-region').val();

      loadRotationOptions(region, $(this).val());
    });

    $('.try-it-rotation').on('change', function() {
      var region = $('.try-it-region').val(),
          size = $('.try-it-size').val();

      renderIiifImg(region, size, $(this).val());
    });

  }


  function loadRegionOptions(region, size, rotation) {
    var regions = getRegions();

    if (typeof region === 'undefined') {
      region = regions[0];
    }

    $('.try-it-region').html('');

    $.each(regions, function(index, option) {
      $('.try-it-region').append('<option value="' + option + '">' + option + '</option>');
    });

    $('.try-it-region').val(region).attr('selected', 'selected');

    loadSizeOptions(region, size, rotation);
  }


  function loadSizeOptions(region, size, rotation) {
    var sizes = getSizesFor(region);

    if (typeof size === 'undefined') {
      size = sizes[0];
    }

    $('.try-it-size').html('');

    $.each(sizes, function(index, option) {
      $('.try-it-size').append('<option value="' + option + '">' + option + '</option>');
    });

    $('.try-it-size').val(size).attr('selected', 'selected');

    loadRotationOptions(region, size, rotation);
  }


  function loadRotationOptions(region, size, rotation) {
    var rotations = getRotationsFor(region, size);

    if (typeof rotation === 'undefined') {
      rotation = rotations[0];
    }

    $('.try-it-rotation').html('');

    $.each(rotations, function(index, option) {
      $('.try-it-rotation').append('<option value="' + option + '">' + option + '</option>');
    });

    $('.try-it-rotation').val(rotation).attr('selected', 'selected');

    renderIiifImg(region, size, rotation);
  }


  function getRegions() {
    var regions = [];

    $.each(ddOptions, function(region, obj) {
      regions.push(region);
    });

    return regions;
  }


  function getSizesFor(region) {
    var sizes = [];

    $.each(ddOptions[region], function(size, obj) {
      sizes.push(size);
    });

    return sizes;
  }


  function getRotationsFor(region, size) {
    return ddOptions[region][size];
  }


  function renderIiifImg(region, size, rotation) {
    elemIiifImg.hide();
    elemIiifImg.attr('src', getIiifUrl(region, size, rotation)).fadeIn(300);
  }


  function getIiifUrl(region, size, rotation) {
    return [iiifImg.baseUrl, region, size, rotation, iiifImg.quality + '.' + iiifImg.format].join('/');
  }


  function calculateFrameDimensions() {
    frameHeight = $('.main-interactive-image .container-image').height();
    frameWidth  = $('.main-interactive-image .container-image').width();
  }


  function calculateSelectOptions() {
    calculateFrameDimensions();

    ddOptions = {
      '0,1200,5213,2242' : {},
      '1400,1200,2500,1075' : {},
      '2325,1300,800,800' : {},
      'full' : {},
      '2150,4500,1500,645' : {},
      '2150,4350,4500,1935' : {}
    }

    ddOptions['0,1200,5213,2242'][frameWidth + ','] = [0];
    ddOptions['0,1200,5213,2242'][roundTo50s(frameWidth - 200) + ','] = [0];
    ddOptions['0,1200,5213,2242'][roundTo50s(frameWidth - 400) + ','] = [0];

    ddOptions['1400,1200,2500,1075'][frameWidth + ','] = [0];
    ddOptions['1400,1200,2500,1075'][roundTo50s(frameWidth - 200) + ','] = [0];
    ddOptions['1400,1200,2500,1075'][roundTo50s(frameWidth - 400) + ','] = [0];

    ddOptions['2325,1300,800,800']['400,400'] = [0,90,180,270];
    ddOptions['2325,1300,800,800']['200,200'] = [0,90,180,270];
    ddOptions['2325,1300,800,800']['100,100'] = [0,90,180,270];

    ddOptions['full'][',' + frameHeight] = [0,90,180,270];
    ddOptions['full'][',' + roundTo50s(frameHeight - 200)] = [0,90,180,270];

    ddOptions['2150,4500,1500,645'][frameWidth + ','] = [0];
    ddOptions['2150,4500,1500,645'][roundTo50s(frameWidth - 200) + ','] = [0];
    ddOptions['2150,4500,1500,645'][roundTo50s(frameWidth - 400) + ','] = [0];

    ddOptions['2150,4350,4500,1935'][frameWidth + ','] = [0];
    ddOptions['2150,4350,4500,1935'][roundTo50s(frameWidth - 200) + ','] = [0];
    ddOptions['2150,4350,4500,1935'][roundTo50s(frameWidth - 400) + ','] = [0];
  }


  function roundTo50s(value) {
    value = value - (value % 50);

    if (value < 50) {
      value = 50;
    }

    return value;
  }

  return {
    render: function() {
      init();
    }
  };

})();


$(function() {

  interactiveImg.render();

});
