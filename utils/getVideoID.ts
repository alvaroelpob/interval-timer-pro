const regexPattern: RegExp = /(?:[?&]v=|\/embed\/|\/v\/|\.be\/|\/videos\/|embed\/)([^#\&\?\/]*)/;

const getVideoId: (youtubeLink: string) => string | null = (youtubeLink) => {
    let videoId: string | null = null;

    const match: RegExpMatchArray | null = youtubeLink.match(regexPattern);
    if (match) videoId = match[1];

    return videoId;
}

export default getVideoId;