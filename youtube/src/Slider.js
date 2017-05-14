import Swiper from "./Swiper";
import {swiperConfigs} from "./configs/swiper";

class Slider {
    constructor(params) {
        this.input = params.input;
        this.searchBtn = params.searchBtn;
        this.youtubeApi = params.youtubeApi;
        this.getPost = params.getPost;
        this.swiper = new Swiper(swiperConfigs, this.loadMoreResults.bind(this));
        this.swiper.init();

        params.searchBtn.addEventListener("click", () => {
            let searchValue = this.input.value;
            this.youtubeApi.getSearchResults(searchValue)
                .then(videoData => this.getPostsArray(videoData))
                .then(postArray => this.swiper.loadSlides(postArray))
        })
    }
    getPostsArray(videoData) {
        let postArray = [];
        for (let i in videoData) {
            postArray.push(this.getPost(videoData[i]))
        }
        return postArray;
    }
    loadMoreResults(){
        this.youtubeApi.getMoreResults()
            .then(videoData => this.getPostsArray(videoData))
            .then(postArray => this.swiper.loadSlides(postArray, true))
    }
}

export default Slider;