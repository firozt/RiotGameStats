import { useState } from 'react'
import './App.css'
import LineChart from './LineChart'
import * as leagueApi from '../backend/leagueApi'
import {
  Button,
  Container, 
  Input,
  InputGroup,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Center,
  Select,
  Spinner, 
} from '@chakra-ui/react'
import InputBox from './InputBox'

type Data = {
  x_axis : number[],
  y_axis : number[],
  title : String,
}

function App() {
  const [data, setData] = useState<Data>({
    x_axis : [],
    y_axis : [],
    title : ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <>
      <Box
        bg={'teal'}
        height={'45px'}
      >
      </Box>
      <Container maxW={'container.xl'} bg='gray.50' height={'100vh'}>
        <InputBox setData={setData} setIsLoading={setIsLoading}/>
        <Box
          borderTop={'1.7px solid #dae9e9'}
          mt={5}
        >
          {
            isLoading ? <Spinner speed={'.8s'} size={'xl'} my={'10vh'} mx={'48vw'} /> : data.x_axis.length != 0 ? 
            <LineChart
            x_axis={data.x_axis}
            y_axis={data.y_axis}
            title={data.title}
            /> : null
            

            // (num > 5) ? 'Greater than 5' : (num < 5) ? 'Less than 5' : 'Equal to 5';
          }
        </Box>
      </Container>
    </>
  )
}

export default App
