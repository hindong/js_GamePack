import { gameStart } from "./game.js";

export const canvas = document.querySelector("#main");
export const ctx = canvas.getContext("2d");


gameStart();
