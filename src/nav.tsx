import { Box, Button, InputGroup } from '@chakra-ui/react'
import React from 'react'

type Props = {
	setTabSelected : (newValue : number) => void
	tabSelected : number
}

const selected : { [key: string]: string } = {
	'backgroundColor' : 'gray.50',
	'color' : 'teal',

}

const NavBar : React.FC<Props> = ({setTabSelected, tabSelected}) => {

	const changeTab : (event : React.MouseEvent ) => void = (event) => {
		const index : number = parseInt(event.currentTarget.getAttribute('value')?? '0')
		setTabSelected(index)
		
	}
	
	const navButtons = ['Home', 'League of Legends' , 'Valorant'].map((item : string, index : number) => {
		if (index == tabSelected) {
			return <Button h={'100%'} borderRadius={0} isActive _active={selected}>{item}</Button>
		}
		return <Button value={index} height={'100%'} bg={'teal'} borderRadius={0} onClick={(event : React.MouseEvent) => changeTab(event)}>{item}</Button>
	})

  return (
    <Box 
			zIndex={'999'}
			flexDir={'row'}
      bg={'teal'}
      height={'45px'}
			position={'fixed'}
			width={'100%'}
		>
			<InputGroup
				height={'100%'}
				color={'white'}
				mx={4}
			>
				{ navButtons.map((item) => { return item }) }
			</InputGroup>
    </Box> 
  )
}

export default NavBar