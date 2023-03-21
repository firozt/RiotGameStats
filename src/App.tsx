import { useState } from 'react'
import './App.css'
import * as leagueApi from '../backend/leagueApi'
import { Button, Input, InputGroup, Text } from '@chakra-ui/react'


function App() {
  const [data, setData] = useState<String>('none')
  const [textField, setTextField] = useState<String>('');
  async function fetchData() {
    const puuid : String = await leagueApi.getPUUID(textField)
    const data : String[] = await leagueApi.getMatchIdHistory(puuid)
    console.log(data)
    setData(data.join(', '))
  }
  
  return (
    <>
      <InputGroup>
        <Input placeholder='data' onChange={(event) => setTextField(event.target.value)}></Input>
        <Button onClick={() => fetchData()}>Submit</Button>
      </InputGroup>
      <Text fontSize={'xl'}>{textField}</Text>
      <Text fontSize={'xl'}>id: {data}</Text>
    </>
  )
}

export default App
