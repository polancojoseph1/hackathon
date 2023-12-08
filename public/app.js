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
    let canvas
    if (canvas) canvas.remove()
    canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
        const container = document.createElement('div')
        container.style.position = 'relative'

        const labeledFaceDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        console.log(resizedDetections, "resizedDetections <----------")
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        console.log(results)
        results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box
            console.log(box)
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
        })
        console.log("func ran")
      }, 100)
})


function loadLabeledImages() {
  const labels = ['Joseph Polanco ', 'Aaron Chen ', 'Apollos Kim ']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 3; i++) {
        const img = await faceapi.fetchImage(`img/${label}${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        if(!detections) continue;
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
