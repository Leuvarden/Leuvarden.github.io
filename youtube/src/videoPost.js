export default (videoData) => {
    let uploadDate = videoData.publishedAt.slice(0,10).replace(/-/g, " ");
    let stats = videoData.statistics;
    let post = document.createElement("li");
    post.className = "slide post video";
    post.innerHTML = `<figure>
                            <a target="_blank" href="https://www.youtube.com/watch?v=${videoData.videoID}">
                                <img src="${videoData.thumbnails.medium.url}" alt="${videoData.title} thumbnail">
                            </a>
                        </figure>
                        <div class="video-info">
                            <div class="user-info">
                                <strong><a href="#" class="video-title">${videoData.title}</a><strong>
                                <div>
                                    <a href="https://www.youtube.com/channel/${videoData.channelId}" class="username">${videoData.channelTitle}</a>
                                    <br><span>${uploadDate}</span>
                                </div>
                            </div>
                        </div>
                        <div class="icon-bar">
                            <span><i class="fa fa-eye"></i> <br> ${stats.viewCount}</span>
                            <span><i class="fa fa-commenting-o"></i> <br> ${stats.commentCount}</span>
                            <span><i class="fa fa-thumbs-up"></i> <br> ${stats.likeCount}</span>
                            <span><i class="fa fa-thumbs-down"></i> <br> ${stats.dislikeCount}</span>
                        </div>
                        <div class="video-info">
                            <p>${videoData.description}</p>
                        </div>`
    return post;
}
