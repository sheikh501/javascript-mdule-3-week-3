async function getAllEpisodes() {
    const url = "https://rickandmortyapi.com/api/episode";
    const response = await fetch(url);
    const { results, info } = await response.json();
    return { results, info };
}
async function getNextPage(nextPageNumber) {
    const url = `https://rickandmortyapi.com/api/episode?page=${nextPageNumber}`;
    const response = await fetch(url);
    const { results, info } = await response.json();
    return { results, info };
}
async function getEpisodeInfo(episodeNumber) {
    const url = `https://rickandmortyapi.com/api/episode/${episodeNumber}`;
    const response = await fetch(url);
    const { name, air_date, episode, characters } = await response.json();
    return { name, air_date, episode, characters };
}
async function getCharacter(characterLink) {
    const response = await fetch(characterLink);
    const { name, status, species, image, episode, gender, origin } = await response.json();
    return { name, status, species, image, episode, gender, origin };
}
async function getEpisodesWithCharacter(episodeId) {
    const response = await fetch(episodeId);
    const { name, air_date, episode, characters } = await response.json();
    return { name, air_date, episode, characters };
}

getAllEpisodes();
export { getAllEpisodes, getNextPage, getEpisodeInfo, getCharacter, getEpisodesWithCharacter }