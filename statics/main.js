$(document).ready(function() {
  const video = $('#webcam')[0];

  function getEyesRectangle(positions) {
  // const minX = positions[23][0] - 5;
  // const maxX = positions[28][0] + 5;
  // const minY = positions[24][1] - 5;
  // const maxY = positions[26][1] + 5;


  let minX = positions[23][0] - 5;
  let maxX = positions[28][0] + 5;
  let minY = positions[24][1] - 5;
  let maxY = positions[31][1] + 5;
  // if (maxY < positions[26][1]){
  //   maxY = positions[26][1] + 5;
  // }
  const width = maxX - minX;
  const height = maxY - minY;

  return [minX, minY, width, height];
  }
  function onStreaming(stream) {
    video.srcObject = stream;
    const ctrack = new clm.tracker();
    ctrack.init();
    ctrack.start(video);
    const overlay = $('#overlay')[0];
    const overlayCC = overlay.getContext('2d');


      console.log('hey');
      circlemove()
    function trackingLoop() {
      // Check if a face is detected, and if so, track it.
      requestAnimationFrame(trackingLoop);

      let currentPosition = ctrack.getCurrentPosition();
      overlayCC.clearRect(0, 0, 400, 300);
      if (currentPosition) {
    // Draw facial mask on overlay canvas:
    ctrack.draw(overlay);

    // Get the eyes rectangle and draw it in red:
    const eyesRect = getEyesRectangle(currentPosition);
    overlayCC.strokeStyle = 'red';
    overlayCC.strokeRect(eyesRect[0], eyesRect[1], eyesRect[2], eyesRect[3]);

    // The video might internally have a different size, so we need these
    // factors to rescale the eyes rectangle before cropping:
    const resizeFactorX = video.videoWidth / video.width;
    const resizeFactorY = video.videoHeight / video.height;

    // Crop the eyes from the video and paste them in the eyes canvas:
    const eyesCanvas = $('#eyes')[0];
    const eyesCC = eyesCanvas.getContext('2d');

    eyesCC.drawImage(
      video,
      eyesRect[0] * resizeFactorX, eyesRect[1] * resizeFactorY,
      eyesRect[2] * resizeFactorX, eyesRect[3] * resizeFactorY,
      0, 0, eyesCanvas.width, eyesCanvas.height
    );
  }
    }
  trackingLoop();
  }

  navigator.mediaDevices.getUserMedia({ video: true }).then(onStreaming);
});
