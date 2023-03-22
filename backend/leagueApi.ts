import { keys } from './keys'
import axios from 'axios';

const API_KEY : String = keys.RIOT_API_KEY


async function getPUUID(name : String) : Promise<String> {
    const url : string = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
    
    const puuid : Promise<String> = axios.get(url)
    .then((response : any ) => {
        console.log('puuid fetched')
        return response.data.puuid
    })
    .catch((error : any) => {
        console.log(error)
        return '0'
    })
    return puuid
}
async function getMatchIdHistory(puuid: String , games: number=10) : Promise<String[]> {
    const url : string = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${games}&api_key=${API_KEY}`
    const matchIdHistroy : Promise<String[]> = axios.get(url)
    .then((response : any ) => {
        console.log('match history fetched')
        return response.data
    })
    .catch((error : any) => {
        console.log(error)
        return '0'

    })
    return matchIdHistroy

}

async function getMatchData(matchId : String, puuid: String ) : Promise<any> {
    const url : string = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
    const matchInfo : Promise<any> = axios.get(url)
    .then((response : any) => {
        console.log('match data fetched')
        for(let i = 0; i < 10; i++) {
            let player = response.data.info.participants[i]
            if (player.puuid == puuid) { return player }
        }
        throw new Error('not found in game?')
    }).catch((err) => {
        console.log(err)
        return '0'
    });
    return matchInfo
}

async function selectMatchData(matchId : String, puuid : String, props : string[]) : Promise<any> {
    const output : any= {}
    const matchData = await getMatchData(matchId,puuid)
    const challenges = matchData.challenges
    props.forEach((prop) => {
        if (matchData.hasOwnProperty(prop)) {
            output[prop] = matchData[prop]
        } else if (challenges.hasOwnProperty(prop)) {
            output[prop] = challenges[prop]
        }
    })
    console.log('selected match data success')
    return output
} 


export async function graph(games: number=10, name: String, prop: string): Promise<number[][]>{
    let x_axis : number[] = Array.from({ length: games }, (_, index) => index+1).reverse();
    let y_axis : number[] = []
    const output : number[][] = [x_axis,y_axis]
    const puuid : String = await getPUUID(name) // 1 req 
    const matchIds : String[] = await getMatchIdHistory(puuid,games) // 10 req
    for(let i = games-1; i >= 0; i--) {
        const value : any = await selectMatchData(matchIds[i],puuid,[prop])
        y_axis.push(value[prop])
    }
    
    return output

    const data = await getMatchData(matchIds[0],puuid)
    return data
}   