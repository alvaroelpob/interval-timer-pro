const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([\w-]{11})(?:\S+)?$/;

const isYoutubeLink: (link: string) => boolean = (link) => {
    const match = link.match(pattern);
    return match !== null;
}

export default isYoutubeLink;