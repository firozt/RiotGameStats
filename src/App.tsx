import { useEffect, useState } from 'react'
import './App.css'
import LineChart from './LineChart'
import {
  Container, 
} from '@chakra-ui/react'
import NavBar from './nav'
import Home from './Home'
import LeagueOfLegend from './LeagueOfLegend'
import Valorant from './valorant'

const pages : any = [
  <Home/>,
  <LeagueOfLegend/>,
  <Valorant/>
]

function App() {

  const [tabSelected, setTabSelected] = useState<number>(0)
  // console.log(tabSelected)




  return (
    <>
      <NavBar setTabSelected={setTabSelected} tabSelected={tabSelected}/>
      <Container
        pos={'relative'}
        maxW={'container.xl'} 
        bg='gray.50'
        height={'100vh'}
        top={'45px'}
        padding={10}
      >
        {pages[tabSelected]}
      </Container>
    </>
  )
}

export default App
