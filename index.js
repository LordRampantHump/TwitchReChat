const fetch = require('node-fetch');
const fs = require('fs');
let comments = [];
async function reChat(vid, next){
    
    const response = await fetch(`https:///api.twitch.tv/v5/videos/${vid}/comments?${next ? `cursor=${next}` : `content_offset_seconds=0`}`, {
	method: 'get',
	headers: {'Accept': 'application/vnd.twitchtv.v5+json', "Client-ID": "jzkbprff40iqj646a697cyrvl0zt2m6"}
});
const data = await response.json();

for (const comment of data.comments) {
    comments.push(comment);
}

if(data['_next']) return reChat(vid, data['_next']) 

return fs.writeFileSync(`chatlog_${vid}.json`, JSON.stringify(comments));  

}

//Call with : (https://www.twitch.tv/videos/1248552656)
reChat(1248552656)
