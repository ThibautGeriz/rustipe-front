import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart as PieChartLib } from 'react-native-svg-charts';

const { width: screenWidth } = Dimensions.get('window');

interface PieChartProps {
  readonly data?: number[];
}

class PieChart extends React.PureComponent<PieChartProps> {
  render() {
    const { data } = this.props;

    const randomColor = () =>
      // eslint-disable-next-line no-bitwise
      `#${((Math.random() * 0xffffff) << 0).toString(16)}000000`.slice(0, 7);

    const pieData = (data || [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80])
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
        },
        key: `pie-${index}`,
      }));

    return <PieChartLib style={{ height: 200, width: screenWidth - 20 }} data={pieData} />;
  }
}

export default PieChart;
