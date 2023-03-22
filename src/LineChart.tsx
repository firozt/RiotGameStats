import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
Chart as ChartJS, CategoryScale, LinearScale, PointElement,
LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Text } from '@chakra-ui/react';

ChartJS.register( CategoryScale,LinearScale, PointElement, 
LineElement, Title, Tooltip, Legend );

type Props = {
  x_axis : number[],
  y_axis : number[],
  title : String,
}




const LineChart : React.FC<Props> = ({x_axis, y_axis, title}) => {
  const datav = {
    labels: x_axis,
    datasets: [{
      label: title,
      data: y_axis,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const [data, setDataset] = useState<any>(datav)


  return (
    <>
      
      <Text fontSize={'5xl'}textAlign='center'>{title}</Text>
      <Line data={data} />
    </>
  )
}

export default LineChart