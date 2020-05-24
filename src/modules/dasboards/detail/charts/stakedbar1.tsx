import React from 'react';
import { StackedBarChart as StackBarChartLib } from 'react-native-chart-kit';
import { chartConfig } from './config1';

interface BarChartProps {
  width: number;
  height: number;
}

const data = {
  labels: ['Test1', 'Test2'],
  legend: ['L1', 'L2', 'L3'],
  data: [
    [60, 60, 60],
    [30, 30, 60],
  ],
  barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  hideLegend: false,
};

export default function BarChart({ width, height }: BarChartProps) {
  return (
    <StackBarChartLib
      data={data}
      width={width} // from react-native
      height={height}
      chartConfig={chartConfig}
    />
  );
}
