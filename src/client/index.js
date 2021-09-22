import "regenerator-runtime/runtime";

import { handleSubmit } from './js/app.js';

import './style/style.scss'


console.log("read me");
const submitButton = document.getElementById("generate");
submitButton.addEventListener('click', handleSubmit);

export { handleSubmit }