const input = document.getElementById('input');
const button = document.getElementById('button');
const post = document.getElementById('post');

button.addEventListener('click', async () => {
    const subredditName = input.value;
    const timestamp = Date.now();
    const jsonUrl = `https://www.reddit.com/r/${subredditName}/random.json?timestamp=${timestamp}`;

    try {
        const response = await fetch(jsonUrl);
        const jsonData = await response.json();

        if (jsonData.length > 0 && jsonData[0].data.children.length > 0) {
            const data = jsonData[0].data.children[0].data;
            const title = data.title;
            const user = data.author;
            const description = data.selftext;
            const media = data.is_video;
            const mediaURL = data.url_overridden_by_dest;
            const link = data.permalink;
            const subreddit = data.subreddit;

            let postContent = `<p id='infos'><a href='https://reddit.com/r/${subreddit}' target='_blank' id='subreddit'>r/${subreddit}</a> posted by <a href='https://reddit.com/u/${user}' target='_blank' id='user'>u/${user}</a></p>`;
            postContent += `<h2 id="title">${title}</h2>`;

            if(description != "") {
                postContent += `<p id="description">${description}</p>`;
            }

            if(media == true) {
                const videoURL = data.media.reddit_video.fallback_url;
                postContent += `<video controls src='${videoURL}' alt='video' id='video'></video><br><br>`;
            }
            else {
                if(mediaURL.includes(".png") || mediaURL.includes(".jpg") || mediaURL.includes(".jpeg") || mediaURL.includes(".gif") || mediaURL.includes(".webp")) {
                    postContent += `<img src='${mediaURL}' alt='image' id='image' class='thumbnail' onclick="openPopup('${mediaURL}')" /><br><br>`;
                }
                else if(mediaURL.includes("youtube.com/watch")) {
                    const youtubeURL = mediaURL.replace("/watch?v=", "/embed/");
                    postContent += `<iframe src="${youtubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='youtube'></iframe><br><br>`;
                }
                else if(mediaURL.includes("youtube.com/shorts")) {
                    const youtubeURL = mediaURL.replace("/shorts/", "/embed/");
                    postContent += `<iframe src="${youtubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='youtube'></iframe><br><br>`;
                }
                else if(mediaURL.includes("youtu.be")) {
                    const youtubeURL = mediaURL.replace("youtu.be/", "youtube.com/embed/");
                    postContent += `<iframe src="${youtubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='youtube'></iframe><br><br>`;
                }
                else {
                    postContent += `<a href="${mediaURL} target="_blank" id="media">${mediaURL}</a><br><br>`;
                }
            }

            postContent += `<a href='https://reddit.com${link}' target='_blank' id='link'>Link to post</a>`;

            post.innerHTML = postContent;

            button.innerHTML = "Load another post";
        } else {
            post.innerHTML = `<h2 id='error'>No post found</h2>`;
        }
    } catch (error) {
        console.error('Error while parsing JSON datas:', error);
    }
});

input.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const subredditName = input.value;
        const timestamp = Date.now();
        const jsonUrl = `https://www.reddit.com/r/${subredditName}/random.json?timestamp=${timestamp}`;
    
        try {
            const response = await fetch(jsonUrl);
            const jsonData = await response.json();
    
            if (jsonData.length > 0 && jsonData[0].data.children.length > 0) {
                const data = jsonData[0].data.children[0].data;
                const title = data.title;
                const user = data.author;
                const description = data.selftext;
                const media = data.is_video;
                const mediaURL = data.url_overridden_by_dest;
                const link = data.permalink;
                const subreddit = data.subreddit;
    
                let postContent = `<p id='infos'><a href='https://reddit.com/r/${subreddit}' target='_blank' id='subreddit'>r/${subreddit}</a> posted by <a href='https://reddit.com/u/${user}' target='_blank' id='user'>u/${user}</a></p>`;
                postContent += `<h2 id="title">${title}</h2>`;
    
                if(description != "") {
                    postContent += `<p id="description">${description}</p>`;
                }
    
                if(media == true) {
                    const videoURL = data.media.reddit_video.fallback_url;
                    postContent += `<video controls src='${videoURL}' alt='video' id='video'></video><br><br>`;
                }
                else {
                    if(mediaURL.includes(".png") || mediaURL.includes(".jpg") || mediaURL.includes(".jpeg") || mediaURL.includes(".gif") || mediaURL.includes(".webp")) {
                        postContent += `<img src='${mediaURL}' alt='image' id='image' class='thumbnail' onclick="openPopup('${mediaURL}')" /><br><br>`;
                    }
                    else if(mediaURL.includes("youtube.com/watch")) {
                        const youtubeURL = mediaURL.replace("/watch?v=", "/embed/");
                        postContent += `<iframe src="${youtubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='youtube'></iframe><br><br>`;
                    }
                    else if(mediaURL.includes("youtube.com/shorts")) {
                        const youtubeURL = mediaURL.replace("/shorts/", "/embed/");
                        postContent += `<iframe src="${youtubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='youtube'></iframe><br><br>`;
                    }
                    else if(mediaURL.includes("youtu.be")) {
                        const youtubeURL = mediaURL.replace("youtu.be/", "youtube.com/embed/");
                        postContent += `<iframe src="${youtubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id='youtube'></iframe><br><br>`;
                    }
                    else {
                        postContent += `<a href="${mediaURL} target="_blank" id="media">${mediaURL}</a><br><br>`;
                    }
                }
    
                postContent += `<a href='https://reddit.com${link}' target='_blank' id='link'>Link to post</a>`;
    
                post.innerHTML = postContent;

                button.innerHTML = "Load another post";
            } else {
                post.innerHTML = `<h2 id='error'>No post found</h2>`;
            }
        } catch (error) {
            console.error('Error while parsing JSON datas:', error);
        }
    }
});

const popup = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');
const closePopup = document.getElementById('closePopup');

function openPopup(imageUrl) {
    popup.style.display = 'block';
    popupImage.src = imageUrl;
}

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});