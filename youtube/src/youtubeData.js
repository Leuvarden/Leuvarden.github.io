class YoutubeDataProvider {
    constructor(key){
        this.key = key;
        this.videosSearchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${key}&maxResults=15`;
        this.videoStatURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&key=${key}`;
        this.videos = {};
        this.nextPageToken = "";
    }
    getVideosSearchURL(query) {
        return this.videosSearchURL + `&q=${query}`;
    }
    getVideosStatURL(query) {
        return this.videoStatURL + `&id=${query}`;
    }
    getNextVideosSearchURL() {
        return this.videosSearchURL + `&pageToken=${this.nextPageToken}`;
    }
    getVideosStats(videoIDs) {
        return fetch(this.getVideosStatURL(videoIDs))
            .then(responce => responce.json())
            .then(data => {
                data.items.forEach(item => {
                    this.videos[item.id].statistics = item.statistics;
                })
                return true
            })
            .catch(err => {
                return Promise.reject(err);
            })
    }
    getSearchResults(query = ""){
        this.videos = {};
        this.nextPageToken = "";
        return fetch(this.getVideosSearchURL(query))
            .then(responce => responce.json())
            .then(data => this.saveSearchResults(data))
            .then(() => this.videos)
            .catch(err => console.error(err));
    }
    saveSearchResults(data){
        let videosIDs = [];
        this.nextPageToken = data.nextPageToken;
        data.items.forEach(item => {
            let videoID = item.id.videoId;
            videosIDs.push(videoID);
            this.videos[videoID] = item.snippet;
            this.videos[videoID].videoID = videoID;
        })
        return this.getVideosStats(videosIDs.join(","));
    }
    getMoreResults(){
        if (this.nextPageToken == false) {
            throw new Error("ORLY?");
        }
        return fetch(this.getNextVideosSearchURL())
            .then(responce => responce.json())
            .then(data => this.saveSearchResults(data))
            .then(() => this.videos)
            .catch(err => console.error(err));
    }
}

export default YoutubeDataProvider;