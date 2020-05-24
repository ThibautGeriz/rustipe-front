import React from 'react';
import { BarChart as BarChartLib } from 'react-native-chart-kit';
import { chartConfig, data } from './config1';

interface BarChartProps {
  width: number;
  height: number;
}

export default function BarChart({ width, height }: BarChartProps) {
  return (
    <BarChartLib
      data={data}
      width={width} // from react-native
      height={height}
      yAxisLabel="$"
      yAxisSuffix="k"
      chartConfig={chartConfig}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
}
