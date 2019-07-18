const dataset = {
  train: {
    n: 0,
    x: null,
    y: null,
  },
  val: {
    n: 0,
    x: null,
    y: null,
  },
}
let pupilx;
let pupily;
let eye_size = {
  x: 0,
  y: 0,

}
let move_interval=0;
let captureExample_interval;
let data_positions = [
  {
    x: 0,
    y: 0,
    //1
  },
  {
    x: (window.innerWidth-100)/2,
    y: (window.innerHeight-100),
    //2
  },
  {
    x: (window.innerWidth-100),
    y: (window.innerHeight-100)/2,
    //3
  },
  {
    x: (window.innerWidth-100)/2,
    y: 0,
    //4
  },
  {
    x: 0,
    y: (window.innerHeight-100),
    //5
  },
  {
    x: 0,
    y: (window.innerHeight-100)/2,
    //6
  },
  {
    x: (window.innerWidth-100),
    y: (window.innerHeight-100),
    //7
  },
  {
    x:(window.innerWidth-100),
    y: 0,
    //8
  },
  {
    x: (window.innerWidth-100)/2,
    y: (window.innerHeight-100)/2,
    //9
  },
  {
    x: (window.innerWidth-100) * 0.3,
    y: (window.innerHeight-100) * 0.7,
    //10
  },
  {
    x: (window.innerWidth-100) * 0.7,
    y: (window.innerHeight-100) * 0.3,
    //11
  },
  {
    x: (window.innerWidth-100) * 0.7,
    y: (window.innerHeight-100) * 0.7,
    //12
  },
  {
    x: (window.innerWidth-100) * 0.3,
    y: (window.innerHeight-100) * 0.3,
  },
];

function myMove(t,l){
  const circle = $('#circle');
  circle.css('left',l + 'px');
  circle.css('top',t + 'px'); 
}
let data_iterator = 0;
function captureExample(interval){
  //clearInterval(interval);
  
  const circPos = tf.tensor1d([(data_positions[data_iterator].x / $(window).width()) * 2 - 1, (data_positions[data_iterator].y / $(window).width())    * 2 - 1]).expandDims(0);
  const pupil_pos = tf.tensor1d([(pupilx / eye_size.x * 2 - 1), (pupily / eye_size.y    * 2 - 1)]).expandDims(0);
  // Choose whether to add it to training (80%) or validation (20%) set:
  const subset = dataset[Math.random() > 0.2 ? 'train' : 'val'];

  if (subset.x == null) {
    // Create new tensors
    subset.x = tf.keep(pupil_pos);
    subset.y = tf.keep(circPos);
  } else {
    // Concatenate it to existing tensors
    const oldX = subset.x;
    const oldY = subset.y;
    
    subset.x = tf.keep(oldX.concat(pupil_pos, 0));
    subset.y = tf.keep(oldY.concat(circPos, 0));
  }

  // Increase counter
  subset.n += 1;


  //move_interval = setInterval(moveCircle, 1000, move_interval);

}
function moveCircle(interval){
  if(data_iterator == data_positions.length){
    clearInterval(interval);
   // alert(data_positions);
  }
  //clearInterval(interval);
  //captureExample_interval = setInterval(captureExample, 1000, captureExample_interval,data_positions[data_iterator].x,data_positions[data_iterator].y);
  myMove(data_positions[data_iterator].x,data_positions[data_iterator].y);
  data_iterator++;
}

$(document).ready(function() {
  

   
    $("#calibrate").click(function collect_data(){

      move_interval = setInterval(moveCircle, 1000, move_interval);
      captureExample_interval = setInterval(captureExample, 1000, captureExample_interval);
    
    }); 
            
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
        //print pupil position in p tag
        pupilx = currentPosition[23][0] - currentPosition[27][0];
        pupily = currentPosition[26][1] - currentPosition[27][1];
        eye_size.x = currentPosition[23][0] - currentPosition[25][0];
        eye_size.y = currentPosition[26][1] - currentPosition[24][1];





  }
    }
  trackingLoop();
  }

  navigator.mediaDevices.getUserMedia({ video: true }).then(onStreaming);
});


