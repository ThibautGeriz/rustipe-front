import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Title, Divider, Subheading } from 'react-native-paper';
import LineChart1 from './charts/line1';
import Bar1 from './charts/bar1';
import StackedBar1 from './charts/stakedbar1';
import PieChart1 from './charts/pie1';
import PieChart2 from './charts/pie2';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>React-native-chart-kit</Title>
      <Subheading>Line charts</Subheading>
      <LineChart1 bezier height={220} width={Dimensions.get('window').width - 20} />
      <LineChart1 bezier={false} height={220} width={Dimensions.get('window').width - 20} />
      <Subheading>Bar charts</Subheading>
      <Bar1 height={220} width={Dimensions.get('window').width - 20} />
      <StackedBar1 height={220} width={Dimensions.get('window').width - 20} />
      <Subheading>Pie chart</Subheading>
      <Divider />
      <PieChart1 height={220} width={Dimensions.get('window').width - 20} />

      <Title style={styles.title}>React-native-svg-charts</Title>
      <Subheading>Pie chart</Subheading>

      <PieChart2 />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  title: {
    textAlign: 'center',
  },
});
