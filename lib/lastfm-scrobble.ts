export interface Scrobble {
    artist: string
    image: string
    album: string
    name: string
    date: string
    link: string
}

export async function loadScrobble(): Promise<Scrobble | Error> {
    return new Promise(async (resolve, reject) => {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USER}&limit=1&api_key=${process.env.LASTFM_APIKEY}&format=json`
        const req = await fetch(url)
        if (!req.ok) reject(new Error("Failed to fetch last scrobble"))

        const body = await req.json()
        const recentTrack = body.recenttracks.track[0]
        const unixstamp = parseInt(recentTrack.date["uts"])
        const fulldate = new Date(unixstamp * 1000)

        try {
            const scrobble: Scrobble = {
                artist: recentTrack.artist["#text"],
                image: recentTrack.image[3]["#text"],
                album: recentTrack.album["#text"],
                name: recentTrack.name,
                link: recentTrack.url,
                date: `${fulldate.getDate()}.${fulldate.getMonth()}.${fulldate.getFullYear()}`,
            }
            resolve(scrobble)
        } catch (e) {
            reject(e)
        }
    })
}
