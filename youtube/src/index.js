import YoutubeDataProvider from "./youtubeData";
import Slider from "./Slider";
import getPost from "./videoPost";

import {youtubeDevKey} from "./configs/youtube";

import "./styles.css";

let you = new YoutubeDataProvider(youtubeDevKey);

const sliderParams = {
    input: document.querySelector("#searchQuery"),
    searchBtn: document.querySelector("#startSearch"),
    youtubeApi: you,
    getPost
}

//input, searchBtn, youtubeApi, swiper, getPost
let slider = new Slider(sliderParams);

console.log("inited");
