import { Elysia } from 'elysia'

const route = new Elysia({ prefix: '/osuchan' })
    /**
     * Dynamically generate shields io badge for osu play time
     * 
     * https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flnfel.github.io%2Fosuchan&query=playtime&style=for-the-badge&logo=osu&logoColor=white&label=Osu%20play%20time&color=%23FF66AA
     * 
     * @see {@link https://www.inchcalculator.com/seconds-to-time-calculator/ | Seconds to HH:MM:SS Time Calculator}
     * @see {@link https://stackoverflow.com/a/37894547/12478479 | Get decimal portion of a number}
     */
    .get('/profile', async () => {
        const response = await fetch('https://osuchan.syrin.me/api/profiles/users/lbk2o1l/stats/0?user_id_type=username')
        const osuchanData = await response.json()
        const hours = osuchanData.playtime / 3600 // 3600 === 1 hour
        const minutes = (hours - Math.floor(hours)) * 60 // 60 minutes
        const seconds = (minutes - Math.floor(minutes)) * 60 // 60 seconds
        const playtime = `${Math.floor(hours)}H ${Math.floor(minutes)}M`
        osuchanData.playtime = playtime

        return osuchanData
    })

export default route
