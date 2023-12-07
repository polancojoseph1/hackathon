const video = document.getElementById('video')

console.log(faceapi.nets)

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('face-api.js\weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('face-api.js\weights'),
    faceapi.nets.faceRecognitionNet.loadFromUri('face-api.js\weights'),
    faceapi.nets.faceExpressionNet.loadFromUri('face-api.js\weights')
]).then(startVid)

function startVid() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        error => console.error(error)
    )
}

video.addEventListener('play', () => {
    console.log('vid is playing')
})
