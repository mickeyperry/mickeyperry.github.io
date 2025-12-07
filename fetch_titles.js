// Paste this in your browser console on your portfolio site
// It will fetch all video titles and create a complete videos.json

const videoIds = [
  "8wFK_ZNZVGg", "zYqJlpjJjus", "5gW6Rsfz3xE", "Lo7UIk1xttA", "lsvwQXKEp4I", "v3NGJPTgYQA",
  "_PmhImN8qyQ", "I5fejugB4B8", "vCWyW2c1LzY",
  "hLwItRxMHso", "fxHy8IYAYw0", "gVKgrZiSLUU", "P32QrE0Whck", "e0ifAQ7QOxY", "mHwNEyiVQmY", "TjUKa1YOVTI", "vvngoFzMnA4",
  "jHmqEkBV1w4", "UcVKRt8_nto",
  "Fcm0_2c2dHc",
  "yeJoH0wTuA8", "bk9SGRs3qz8", "FOfBOIj-uaI"
];

const categories = {
  "8wFK_ZNZVGg": "Playtika", "zYqJlpjJjus": "Playtika", "5gW6Rsfz3xE": "Playtika", "Lo7UIk1xttA": "Playtika", "lsvwQXKEp4I": "Playtika", "v3NGJPTgYQA": "Playtika",
  "_PmhImN8qyQ": "Personal Project", "I5fejugB4B8": "Personal Project", "vCWyW2c1LzY": "Personal Project",
  "hLwItRxMHso": "Waves", "fxHy8IYAYw0": "Waves", "gVKgrZiSLUU": "Waves", "P32QrE0Whck": "Waves", "e0ifAQ7QOxY": "Waves", "mHwNEyiVQmY": "Waves", "TjUKa1YOVTI": "Waves", "vvngoFzMnA4": "Waves",
  "jHmqEkBV1w4": "Post Office", "UcVKRt8_nto": "Post Office",
  "Fcm0_2c2dHc": "Igloo",
  "yeJoH0wTuA8": "Liniad", "bk9SGRs3qz8": "Liniad", "FOfBOIj-uaI": "Liniad"
};

async function fetchVideoTitle(videoId) {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    const data = await response.json();
    return data.title;
  } catch (e) {
    return categories[videoId]; // Fallback to category name
  }
}

async function generateVideosJSON() {
  const videos = [];

  for (let i = 0; i < videoIds.length; i++) {
    const videoId = videoIds[i];
    console.log(`Fetching ${i + 1}/${videoIds.length}: ${videoId}...`);

    const title = await fetchVideoTitle(videoId);

    videos.push({
      id: videoId,
      category: categories[videoId],
      timestamp: Date.now() + i,
      name: title,
      role: "Motion Designer & Video Editor",
      description: ""
    });

    // Wait a bit to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log("\n✅ Done! Copy this and save to videos.json:\n");
  console.log(JSON.stringify(videos, null, 2));

  // Also save to localStorage
  localStorage.setItem('customVideos', JSON.stringify(videos));
  console.log("\n✅ Also saved to localStorage!");
}

generateVideosJSON();
