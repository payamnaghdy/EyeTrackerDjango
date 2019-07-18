// const dataset = {
//     train: {
//       n: 0,
//       x: null,
//       y: null,
//     },
//     val: {
//       n: 0,
//       x: null,
//       y: null,
//     },
//   }
  
//   function getImage() {
//     // Capture the current image in the eyes canvas as a tensor.
//     return tf.tidy(function() {
//       const image = tf.fromPixels($('#eyes')[0]);
//       // Add a batch dimension:
//       const batchedImage = image.expandDims(0);
//       // Normalize and return it:
//       return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
//     });
//   }
  

// function mymove(t,l){
//     const circle = $('#circle');
//     circle.css('left',l + 'px');
//     circle.css('top',t + 'px'); 
// }

// function captureExample(t,l) {
//   // Take the latest image from the eyes canvas and add it to our dataset.
//   tf.tidy(function() {
//     const image = getImage();
//     if(image == null){
//       return
//     }
//   //   const circPos = tf.tensor1d([l, t]).expandDims(0);
//     const circPos = tf.tensor1d([(l / $(window).width()) * 2 - 1, (t / $(window).width())    * 2 - 1]).expandDims(0);

//     // Choose whether to add it to training (80%) or validation (20%) set:
//     const subset = dataset[Math.random() > 0.2 ? 'train' : 'val'];

//     if (subset.x == null) {
//       // Create new tensors
//       subset.x = tf.keep(image);
//       subset.y = tf.keep(circPos);
//     } else {
//       // Concatenate it to existing tensors
//       const oldX = subset.x;
//       const oldY = subset.y;
      
//       subset.x = tf.keep(oldX.concat(image, 0));
//       subset.y = tf.keep(oldY.concat(circPos, 0));
//     }

//     // Increase counter
//     subset.n += 1;
//     if(subset.n > 10)
//     {
//       console.log(dataset)
      
//       fitModel()
//       setInterval(moveTarget, 100);
//     }
//   });n
//     }
//   //   const circPos = tf.tensor1d([l, t]).expandDims(0);
//     const circPos = tf.tensor1d([(l / $(window).width()) * 2 - 1, (t / $(window).width())    * 2 - 1]).expandDims(0);

//     // Choose whether to add it to training (80%) or validation (20%) set:
//     const subset = dataset[Math.random() > 0.2 ? 'train' : 'val'];

//     if (subset.x == null) {
//       // Create new tensors
//       subset.x = tf.keep(image);
//       subset.y = tf.keep(circPos);
//     } else {
//       // Concatenate it to e
// }



// function circlemove(){
//     var l = 1;
//     var t = 0;
//     var sw = false;
//     var counter = 0;
//     var w = window.innerWidth - 50;
//     var h = window.innerHeight - 50;
//     //var int = setInterval(moving,500);
//     function moving(){
//         if (counter < 5){
//           t = 0;
//           l = 0;
//           captureExample();
//           mymove(t.toString(),l.toString());
//         }
//         if( counter >= 5 && counter < 10){
//           t = 0;
//           l = w;
//           captureExample();
//           mymove(t.toString(),l.toString());
//         }
//         if( counter >= 10 && counter < 15){
//           t = h;
//           l = 0;
//           captureExample();
//           mymove(t.toString(),l.toString());
//         }
//         if( counter >= 15 && counter < 20){
//           t = h;
//           l = w;
//           captureExample();
//           mymove(t.toString(),l.toString());
//         }
//         if( counter >= 20 && counter < 25){
//             t = h/2;
//             l = w/2;
//             captureExample();
//             mymove(t.toString(),l.toString());
           
//         }
//         if(counter >= 25 ){
//           fitModel();
//           setInterval(moveTarget, 100);
//           clearInterval(int);
//         }
//         counter++;
//         // if(l%100 == 0 || t % 100 == 0) 
//         //     captureExample();
//         // if (!sw){
//         //     if(l == 0 && t == 0)
//         //         sw = true;
//         //     if(l < w && t == 0)
//         //         l++
//         //     if(l == w && t < h )
//         //         t++
//         //     if( l > 0 && t == h )
//         //         l--
//         //     if(l == 0 && t > 0)
//         //         t--
//         //     mymove(t.toString(),l.toString());

//         // }
//         // else { 
//         //     t = h/2;
//         //     l = w/2;
//         //     captureExample();
//         //     mymove(t.toString(),l.toString());
//         //     fitModel();
//         //     setInterval(moveTarget, 100);
//         //     clearInterval(int);
//         // }
//     }
//     // function captureExample(t,l) {
//     //     // Take the latest image from the eyes canvas and add it to our dataset.
//     //     tf.tidy(function() {
//     //       const image = getImage();
//     //     //   const circPos = tf.tensor1d([l, t]).expandDims(0);
//     //       const circPos = tf.tensor1d([(l / $(window).width()) * 2 - 1, (t / $(window).width())    * 2 - 1]).expandDims(0);
      
//     //       // Choose whether to add it to training (80%) or validation (20%) set:
//     //       const subset = dataset[Math.random() > 0.2 ? 'train' : 'val'];
      
//     //       if (subset.x == null) {
//     //         // Create new tensors
//     //         subset.x = tf.keep(image);
//     //         subset.y = tf.keep(circPos);
//     //       } else {
//     //         // Concatenate it to existing tensors
//     //         const oldX = subset.x;
//     //         const oldY = subset.y;
      
//     //         subset.x = tf.keep(oldX.concat(image, 0));
//     //         subset.y = tf.keep(oldY.concat(circPos, 0));
//     //       }
      
//     //       // Increase counter
//     //       subset.n += 1;
//     //       if(subset.n > 25){
//     //         fitModel()
//     //       }
//     //     });
//     //   }
    
//   }