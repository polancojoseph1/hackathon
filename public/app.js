// const video = document.getElementById('video')

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/weights'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/weights')
// ]).then(startVideo)

// function startVideo() {
//   navigator.getUserMedia(
//     { video: {} },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
// }

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)

//   //   document.body.appendChild(image)
//   setInterval(async () => {
//     const image = await document.createElement("img");
//     image.src = "img/captain.webp" //me.jpg
//     // loadLabeledImages(image)
//     // const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())

//     // console.log(detections)


//     const results = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()

//     const singleResult = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()

//     const faceMatcher = new faceapi.FaceMatcher(singleResult)


//     if (singleResult) {
//         const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
//         console.log(bestMatch.toString(), "<--- one")
//       }


//     results.forEach(fd => {
//         const bestMatch = faceMatcher.findBestMatch(fd.descriptor)
//         console.log(bestMatch.toString(), "<--- multiple")
//     })
//     // const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//     // console.log(detections)
//     const resizedDetections = faceapi.resizeResults(singleResult, displaySize)
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//     faceapi.draw.drawDetections(canvas, resizedDetections, { withScore: true })
//     // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//     // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, 100)
// })


// // function loadLabeledImages(image) {
// //     const labels = ['Captain America', 'Joseph']
// //     return Promise.all(
// //       labels.map(async label => {
// //         const descriptions = []
// //         for (let i = 1; i <= 2; i++) {
// //           const img = await faceapi.fetchImage(image.src)
// //           const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
// //           descriptions.push(detections.descriptor)
// //         }
// //         console.log(descriptions, label)
// //         return new faceapi.LabeledFaceDescriptors(label, descriptions)
// //       })
// //     )
// //   }







const video = document.getElementById('video')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/weights')
]).then(startVideo)


function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}


video.addEventListener('play', async () => {
    // console.log("hello mundo")
    // const labeledFaceDescriptors = await loadLabeledImages()
    // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
    // let canvas
    // if (canvas) canvas.remove()
    // canvas = faceapi.createCanvasFromMedia(video)
    // const displaySize = { width: video.width, height: video.height }
    // faceapi.matchDimensions(canvas, displaySize)
    // const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
    // const resizedDetections = faceapi.resizeResults(detections, displaySize)
    // const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    // console.log(results)
    // results.forEach((result, i) => {
    //     console.log(result.toString())
    //     const box = resizedDetections[i].detection.box
    //     const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
    //     drawBox.draw(canvas)
    // })

    setInterval(async () => {
        const container = document.createElement('div')
        container.style.position = 'relative'
        document.body.append(container)
        const labeledFaceDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
        let canvas
        if (canvas) canvas.remove()
        canvas = faceapi.createCanvasFromMedia(video)
        // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        document.body.append(canvas)
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        console.log(results)
        results.forEach((result, i) => {
            // console.log(result.toString())
            const box = resizedDetections[i].detection.box
            console.log(box)
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
            drawBox.draw(canvas)
        })
    //     // loadLabeledImages(image)
    //     // const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())

    //     // console.log(detections)


    //     // const results = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()

    //     // const singleResult = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()

    //     // const faceMatcher = new faceapi.FaceMatcher(singleResult)


    //     // if (singleResult) {
    //     //     const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
    //     //     console.log(bestMatch.toString(), "<--- one")
    //     //   }


    //     // results.forEach(fd => {
    //     //     const bestMatch = faceMatcher.findBestMatch(fd.descriptor)
    //     //     console.log(bestMatch.toString(), "<--- multiple")
    //     // })
    //     // const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    //     // console.log(detections)
    //     const resizedDetections = faceapi.resizeResults(singleResult, displaySize)
    //     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //     faceapi.draw.drawDetections(canvas, resizedDetections, { withScore: true })
    //     // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //     // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      }, 100)
})


function loadLabeledImages() {
//   const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
  const labels = ['Captain America', 'Joseph Polanco']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`img/${label}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
