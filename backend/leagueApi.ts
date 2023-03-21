import { keys } from './keys'
import axios from 'axios';

const API_KEY : string = keys.RIOT_API_KEY


export async function getPUUID(name : String) : Promise<String> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
    
    const puuid : Promise<String> = axios.get(url)
    .then((response : any ) => {
        console.log(response)
        console.log('puuid fetched')
        return response.data.puuid
    })
    .catch((error : any) => {
        console.log(error)
        throw new Error('bad username ',error)
    })
    return puuid
}
export async function getMatchIdHistory(puuid: String , games: number=10) : Promise<String[]> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?counts=${games}&api_key=${API_KEY}`
    console.log(url)
    const matchIdHistroy : Promise<String[]> = axios.get(url)
    .then((response : any ) => {
        console.log(response)
        console.log('puuid fetched')
        return response.data
    })
    .catch((error : any) => {
        console.log(error)
        throw new Error(error)
    })
    return matchIdHistroy
}