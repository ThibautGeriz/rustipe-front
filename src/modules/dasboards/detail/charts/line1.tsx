import React from 'react';
import { LineChart as LineChartLib } from 'react-native-chart-kit';
import { chartConfig, data } from './config1';

interface LineChartProps {
  bezier: boolean;
  width: number;
  height: number;
}

export default function LineChart({ bezier, width, height }: LineChartProps) {
  return (
    <LineChartLib
      data={data}
      width={width} // from react-native
      height={height}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier={bezier}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
}
