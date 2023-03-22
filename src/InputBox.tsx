import { useState } from 'react'
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
} from '@chakra-ui/react'

type Data = {
  x_axis : number[],
  y_axis : number[],
  title : String,
}

type Props = {
  setData : (newValue : Data) => void
  setIsLoading : (newValue : boolean) => void

}



const InputBox : React.FC<Props> = ({setData, setIsLoading}) => {

  const [textField, setTextField] = useState<String>('');
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [selectValue, setSelectValue] = useState<string>('kills')
  const [isInvalid, setIsInvalid] = useState<boolean>(false)
  
  async function fetchData() {
    
    if (textField == '') {
      setIsInvalid(true)
      return
    } 
    setIsLoading(true)
    setData({x_axis : [], y_axis : [], title : 'loading...'})

    setIsInvalid(false)
    const games : number = sliderValue / 10; 
    console.log('select value is',selectValue)
    const data : number[][] = await leagueApi.graph(games,textField,selectValue)
    console.log('data:',data)
    setData({
      x_axis : data[0],
      y_axis : data[1],
      title : `${textField}'s ${selectValue} in the ${games} last games`
    })
    setIsLoading(false)

  }

  
  return (
    <Box>
      <InputGroup>
        <Input
          isInvalid={isInvalid}
          focusBorderColor='teal.500'
          mt={4}
          mx={1}
          variant={'outline'} 
          placeholder='summoner name' 
          boxShadow={'sm'}
          onChange={(event) => setTextField(event.target.value)}
          bg={'white'}
        />
        <Select
          width={'40%'}
          mt={4}
          mx={1}
          variant={'filled'}
          bg={'white'}
          boxShadow={'sm'}
          onChange={(event) => {setSelectValue(event.target.value)}}
          defaultValue={selectValue}
        >
          <option value='kills'>Kills</option>
          <option value='kda'>KDA</option>
          <option value='goldPerMinute'>Gold Per Minute</option>
        </Select>
        <Button color={'white'} boxShadow={'sm'} mt={4} bg={'teal.600'} onClick={() => fetchData()}>Search</Button>
      </InputGroup>
      <Center maxW={'85vw'}m={'auto'} mt={12} >
        <Text fontSize={'xl'} textAlign={'center'} >Number of Games</Text>
        <Slider
          aria-label='slider-ex-1'
          defaultValue={30}
          step={10}
          onChange={(value) => setSliderValue(value)}
          ml={10}
        >
          <Box mt={5}>
            <SliderMark value={0}> 0</SliderMark>
            <SliderMark value={100} > 10</SliderMark>
          </Box>
          <SliderMark
            value={sliderValue}
            textAlign='center'
            bg='teal.500'
            color='white'
            mt='-14'
            ml='-10'
            w='20'
            h={'30'}
          >
            {sliderValue/10} games
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack bg={'teal.200'}/>
          </SliderTrack>
          <SliderThumb/>
        </Slider>
      </Center>
    </Box>
  )
}

export default InputBox