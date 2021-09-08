import { getAllEpisodes, getNextPage, getEpisodeInfo, getCharacter, getEpisodesWithCharacter } from "./app.js";
//create HTML elements
const root = document.querySelector("#root");
const mainContainer = document.createElement("div");
mainContainer.classList.add("main-container");
const h1 = document.createElement("h1");
h1.classList.add("header");
h1.textContent = "Rick and Morty fan page";
root.appendChild(h1);

const episodesListContainer = document.createElement("div");
episodesListContainer.classList.add("episodes-list-container");
const episodesList = document.createElement("ul");
episodesList.classList.add("episodes-list");
episodesListContainer.appendChild(episodesList);
mainContainer.appendChild(episodesListContainer);
const episodesInfoContainer = document.createElement("div");
episodesInfoContainer.classList.add("episodes-info-container");
mainContainer.appendChild(episodesInfoContainer);
const nextEpisodesBtn = document.createElement("button");
nextEpisodesBtn.classList.add("load-episodes-btn")
nextEpisodesBtn.innerText = "Load episodes";
episodesListContainer.appendChild(nextEpisodesBtn);
const charactersContainer = document.createElement("div");
const episodeCardContainer = document.createElement("div");
root.appendChild(mainContainer);
const arrayOfEpisodes = [];
let episodeId = "";

async function displayListOfEpisodes() {
    const allEpisodes = await getAllEpisodes();
    addItemsToList(allEpisodes);
    showEpisodeInfo(allEpisodes.results[0]);
}

async function getNextEpisodes() {
    let nextPageNumber;
    if (arrayOfEpisodes.length === 20) {
        nextPageNumber = 2;
    } else if (arrayOfEpisodes.length === 40) {
        nextPageNumber = 3;
    } else if (arrayOfEpisodes.length === 41) {
        return;
    }
    const newPage = await getNextPage(nextPageNumber);
    addItemsToList(newPage);
}

async function addItemsToList(receivedObject) {
    receivedObject.results.forEach(episodeInfo => {
        const liItem = document.createElement("li");
        liItem.innerText = `Episode ${episodeInfo.id}`;
        episodesList.appendChild(liItem);
        arrayOfEpisodes.push(episodeInfo.name);
        liItem.addEventListener("click", () => showEpisodeInfo(episodeInfo));

    })
}
async function showEpisodeInfo(episodeInfo) {
    const episodeName = document.createElement("h2");
    episodeName.classList.add("episode-name");
    episodesInfoContainer.innerHTML = "";
    episodeName.innerText = `Episode ${episodeInfo.id} (${episodeInfo.name})`;
    episodesInfoContainer.appendChild(episodeName);
    const airDate = document.createElement("p");
    airDate.classList.add("air-date");
    airDate.innerText = `${episodeInfo.air_date} | ${episodeInfo.episode}`;
    episodesInfoContainer.appendChild(airDate);
    showCharacters(episodeInfo.characters);
    episodeId = episodeInfo.id;

}
async function showCharacters(characters) {
    charactersContainer.innerHTML = "";
    characters.forEach(async(link) => {
        createCharacter(link);
    })
}


async function createCharacter(link) {
    const { name, status, species, image, episode, gender, origin } = await getCharacter(link);
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card")
    const characterImage = document.createElement("img")
    characterImage.classList.add("character-img");
    characterImage.src = image;
    charactersContainer.classList.add("characters-container");
    charactersContainer.appendChild(characterCard);
    episodesInfoContainer.appendChild(charactersContainer);
    const heroName = document.createElement("h3");
    heroName.innerText = name;
    const heroStatus = document.createElement("p");
    heroStatus.innerText = `${species} | ${status}`;
    characterCard.appendChild(characterImage);
    characterCard.appendChild(heroName);
    characterCard.appendChild(heroStatus);
    characterCard.addEventListener("click", () => { showEpisodesWithCharacter(name, status, species, image, episode, gender, origin) });
}
async function showEpisodesWithCharacter(name, status, species, image, episode, gender, origin) {
    episodesInfoContainer.innerHTML = "";
    const characterCard = document.createElement("div");
    characterCard.classList.add("mini-character-card");
    const characterCardInfo = document.createElement("div");
    characterCardInfo.classList.add("mini-character-card-info");
    const characterName = document.createElement("h1");
    const characterInfo = document.createElement("p");
    const characterImg = document.createElement("img");
    characterCardInfo.appendChild(characterName);
    characterCardInfo.appendChild(characterInfo);
    characterImg.src = image;
    characterImg.classList.add("character-img");
    characterName.innerHTML = name;
    characterInfo.innerHTML = `${species} | ${status} | ${gender} | ${origin.name}`;
    const hrLine = document.createElement("hr");
    hrLine.classList.add("hr-line");
    const backToEpisodeButton = document.createElement("button");
    backToEpisodeButton.innerHTML = "Back to episode";
    backToEpisodeButton.classList.add("back-btn")
    backToEpisodeButton.addEventListener("click", backToEpisode);
    characterCard.appendChild(characterImg);
    characterCard.appendChild(characterCardInfo);
    characterCardInfo.appendChild(backToEpisodeButton);
    episodesInfoContainer.appendChild(characterCard);
    episodesInfoContainer.appendChild(hrLine);

    episodeCardContainer.innerHTML = "";


    episode.forEach(async(episode) => {
        const episodeWithCharacter = await getEpisodesWithCharacter(episode);
        episodeCardContainer.classList.add("episode-card-container");
        let episodeCard = document.createElement("div");
        const episodeName = document.createElement("p");
        const episodeInformation = document.createElement("p");
        episodeInformation.innerHTML = episodeWithCharacter.episode;
        episodeCard.classList.add("episode-card");
        episodeName.innerHTML = episodeWithCharacter.name;
        episodeCard.appendChild(episodeName);
        episodeCard.appendChild(episodeInformation);
        episodeCardContainer.appendChild(episodeCard);
        episodesInfoContainer.appendChild(episodeCardContainer);
    })

}

async function backToEpisode() {
    const allEpisodes = await getAllEpisodes();
    // addItemsToList(allEpisodes);
    let prevEpisodeInfo = episodeId - 1;
    // if(prevEpisodeInfo==)
    showEpisodeInfo(allEpisodes.results[prevEpisodeInfo]);
    // console.log(prevEpisodeInfo - 1)
    // showEpisodeInfo(episode)
    // console.log("kk");
}
nextEpisodesBtn.addEventListener("click", getNextEpisodes);
displayListOfEpisodes();