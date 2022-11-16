const { downloadSong } = require('ytdl-mp3');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');


let download = async(song) => {
    try{
        log.red(color.whiteBG(` 👾 -> Downloading ${song.title} < - 👽 `))

        await downloadSong(song.url, {
            getTags: true
        })
        log.red(color.blackBG(` 👾 -> Downloaded ${song.title} < - 👽 `))

    } catch (error){
        console.log(error)
        try {
            await downloadSong(song.url, {
                getTags: false
            })
        } catch (error2) {
            console.log(error2)
        }
    }

}
(async function () {
    let url = process.argv[2];
    let id = url.split("list=")[1];
    const playlist = await ytpl(id);
    let playlistUrls = [];
    for (let i = 0; i < playlist.items.length; i++) {
        playlistUrls.push({url: playlist.items[i].shortUrl, title: playlist.items[i].title})
    }

    playlistUrls.map(async (song) => {
        await download(song);
    })
})();