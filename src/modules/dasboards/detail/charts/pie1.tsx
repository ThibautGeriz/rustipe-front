import React from 'react';
import { PieChart as PieChartLib } from 'react-native-chart-kit';
import { chartConfig } from './config1';

interface PieChartProps {
  width: number;
  height: number;
}

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

export default function PieChart({ width, height }: PieChartProps) {
  return (
    <PieChartLib
      // style={{ backgroundColor: 'red' }}
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute={false}
    />
  );
}
