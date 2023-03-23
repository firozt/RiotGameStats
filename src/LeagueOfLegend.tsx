import { useEffect, useState } from 'react'
import './App.css'
import LineChart from './LineChart'
import {
  Container, 
  Box,
  Center,
  Spinner, 
} from '@chakra-ui/react'
import InputBox from './InputBox'
import NavBar from './nav'
type Props = {}

type Data = {
  x_axis : number[],
  y_axis : number[],
  title : String,
}

type MatchCache = {
	values : number[][]
	last : number
}

type CacheObj  = {
	puuid : String,
	kda : MatchCache,
	gpm : MatchCache,
	kills : MatchCache,
}

const LeagueOfLegend = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<Data>({
    x_axis : [],
    y_axis : [],
    title : ''

		
  });

	const check_cache : (name : string, filter : string, games : number) => any = (name,filter,games) => {

	}
	useEffect(() => {
		// sessionStorage.setItem(textFi)
	
	}, [data])
	




  return (
		<>
			<InputBox setData={setData} setIsLoading={setIsLoading} isLoading={isLoading}/>
			<Box
				borderTop={'1.7px solid #dae9e9'}
				mt={5}
			>
				{
					isLoading ?
					<Center>
						<Spinner speed={'.8s'} size={'xl'} my={'10vh'}  />
					</Center> :
					data.x_axis.length != 0 ? 
					<LineChart
						x_axis={data.x_axis}
						y_axis={data.y_axis}
						title={data.title}
					/> : null
				}
			</Box>
		</>
  )
}

export default LeagueOfLegend