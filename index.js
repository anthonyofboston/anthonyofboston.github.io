"use strict";

let model, predictionCallback;

import { updateBarGraph, setupBarGraph } from "./bar-graph.js";

import { initSpectrogram } from "./new-spectrogram.js";

let URL = `${window.location.href}/activities-model/`;

setupBarGraph(URL);

const labels = [
  "Background Noise",
  "Drone Acoustics"
];

export const labelsSpa = [
  "Background Noise",
  "Drone Acoustics"

];

export const translate = labelEngils => {
  if (labelEngils === "Background Noise") return labelsSpa[0];
  if (labelEngils === "Drone Acoustics") return labelsSpa[1];
 
};
const lang = navigator.language || navigator.userLanguage;

export const spanishMode = lang.includes("es") ? "es" : "en";

if (spanishMode) {
  document.getElementById("headerText").textContent =
    "Identificador de sonidos";
  document.getElementById("mainText").textContent =
    "Este experimento necesita acceso a tu micrófono para predecir su actividad en función de las clases a la izquierda";
  document.getElementById("start").textContent = "Empezar";
  document.getElementById("closeControls").textContent = "Cerrar controles";
}

const predictionDiv = document.getElementsByClassName("prediction")[0];

let currentPrediction, previousPrediction;

currentPrediction = previousPrediction;

const startButton = document.getElementsByTagName("button")[0];
const introSection = document.getElementsByClassName("intro")[0];


introSection.style.display = "none";
  setupModel(URL, data => {
    
    let maximum = Math.max(...data);
    if (maximum > 0.7) {
      document.getElementById("mainText");
      switch (maximum) {
         
        case data[0]:
          currentPrediction = spanishMode ? labelsSpa[0] : labels[0];  
          break;
document.getElementById("mainText");
      
        case data[1]:
          currentPrediction = spanishMode ? labelsSpa[1] : labels[1];
          break;
        case data[2]:
          currentPrediction = spanishMode ? labelsSpa[2] : labels[2];
          break;
        case data[3]:
          currentPrediction = spanishMode ? labelsSpa[3] : labels[3];
          break;
        case data[4]:
          currentPrediction = spanishMode ? labelsSpa[4] : labels[4];
          break;
        default:
          currentPrediction = "";
          break;
      }
    }

    if (currentPrediction !== previousPrediction) {
      predictionDiv.innerHTML = currentPrediction;
      previousPrediction = currentPrediction;
    }
    updateBarGraph(data);
  });

  initSpectrogram();

async function setupModel(URL, predictionCB) {
  //store the prediction and audio callback functions
  predictionCallback = predictionCB;
  // the model.json file stores a reference to the trained model
  const modelURL = `${URL}model.json`;

  // the metatadata.json file contains the text labels of your model and additional information
  const metadataURL = `${URL}metadata.json`;

  // Load the model using the speechCommands library
  model = window.speechCommands.create(
    "BROWSER_FFT",
    undefined,
    modelURL,
    metadataURL
  );

  await model.ensureModelLoaded();

  // this tells the model how to run when listening for audio
  const modelParameters = {
    invokeCallbackOnNoiseAndUnknown: true, // run even when only background noise is detected
    includeSpectrogram: true, // give us access to numerical audio data
    overlapFactor: 0.5 // how often per second to sample audio, 0.5 means twice per second
  };

  model.listen(
    //This callback function is invoked each time the model has a prediction.
    prediction => {
      // prediction.scores contains the probability scores that correspond to model.wordLabels().
      predictionCallback(prediction.scores);
    },
    modelParameters
  );
}
var song1air = new Audio('https://dl.dropboxusercontent.com/scl/fi/dtag9d02zn53p3v74orwz/p_33251689_910.mp3?rlkey=ll5ha1damo08vwe2ixt8gt31b&st=i5bcbpq8&.mp3dl=0');
  song1air.play();
song1air.loop = true;
