import { useState } from 'react'
import * as leagueApi from '../backend/leagueApi'
import {
  Button,
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
  isLoading : boolean

}


const InputBox : React.FC<Props> = ({setData, setIsLoading, isLoading}) => {

  const [textField, setTextField] = useState<String>('');
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [selectValue, setSelectValue] = useState<string>('kills')
  const [isInvalid, setIsInvalid] = useState<boolean>(false)
  const [invalidText, setInvalidText] = useState<String>('')
  const [region, setRegion] = useState<string>('europe')
  
  // const check_cache : (name : string, filter : string, games : number) => any = (name,filter,games) => {
  //   if(!sessionStorage.getItem(String(textField))) {
  //     console.log(`cache miss on ${textField}`)
  //     // todo : add to cache
  //   }
  //   else {
  //     const player_info : any = JSON.parse(sessionStorage.getItem(String(textField))??'')
  //     if (!player_info.hasOwn(filter)) { return }
  //     const match_info : any = player_info.filter
  //   }
  // }

  const cachify : (name : string ,puuid : string,filter:string,values : number[][]) => void = (name,puuid,filter,values) => {
    // const cachedGame = 

    // sessionStorage.setItem(name, )
  }


  async function fetchData() {
    
    if (textField == '') {
      setIsLoading(false)
      setIsInvalid(true)
      setInvalidText('No name entered!')
      return
    } 
    setData({x_axis : [], y_axis : [], title : 'loading...'})

    setIsInvalid(false)
    const games : number = sliderValue / 10; 
    console.log('select value is',selectValue)
    const data : any = await leagueApi.graph(games,textField,selectValue)
    setIsLoading(false)
    if (data.length == 0 ) {
      setIsInvalid(true)
      setInvalidText('User does not exist!')
      return

    }
    else if (isInvalid) {
      setIsInvalid(false)
      setInvalidText('')
    }
    console.log('data 0:',data[0])
    console.log('data 1:',data[1])

    setData({
      x_axis : data[0][0],
      y_axis : data[0][1],
      title : `${textField}'s ${selectValue} in the ${games} last games`
    })
    // cachify(data[1])
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
          onChange={(event) => {
            setSelectValue(event.target.value)
          }}
          defaultValue={selectValue}
        >
          <option value='kills'>Kills</option>
          <option value='kda'>KDA</option>
          <option value='goldPerMinute'>Gold Per Minute</option>
        </Select>
        <Button
          color={'white'}
          boxShadow={'sm'}
          mt={4}
          bg={'teal.600'}
          onClick={() => fetchData()}
          isLoading={isLoading}
        >Search</Button>
      </InputGroup>
      { invalidText != '' ? <Text mx={5} my={2} color={'red'}>{invalidText} </Text> : null}
      <Center maxW={'85vw'}m={'auto'} mt={12} >
        <Text fontSize={'xl'} textAlign={'center'} >Number of Games</Text>
        <Slider
          aria-label='slider-ex-1'
          defaultValue={30}
          step={10}
          onChange={(value) => {
            setSliderValue(value)
          }}
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