function moveTarget() {
    if (currentModel == null) {
      return;
    }
    tf.tidy(function() {
      const image = getImage();
      const prediction = currentModel.predict(image);
  
      // Convert normalized position back to screen position:
      const targetWidth = $('#target').outerWidth();
      const targetHeight = $('#target').outerHeight();
      const x = (prediction.get(0, 0) + 1) / 2 * ($(window).width() - targetWidth);
      const y = (prediction.get(0, 1) + 1) / 2 * ($(window).height() - targetHeight);
    // const x = prediction.get(0, 0);
    // const y = prediction.get(0, 1);
        console.log(x)
      // Move target there:
      const $target = $('#target');
      $target.css('left', x + 'px');
      $target.css('top', y + 'px');
    });
  }
  
