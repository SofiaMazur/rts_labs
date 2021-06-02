import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Perceptron from './src/Perceptron';

export default function App() {
  const [learningRate, setLearningRate] = useState(0.001);
  const [deadline, setDeadline] = useState(100);
  const [result, setResult] = useState();
  const [time, setTime] = useState();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>

      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setLearningRate(value)}
        placeholder={{ label: 'Оберіть швидкість навчання', value: null }}
        items={[
          { label: '0.001', value: 0.001 },
          { label: '0.01', value: 0.01 },
          { label: '0.05', value: 0.05 },
          { label: '0.1', value: 0.1 },
          { label: '0.2', value: 0.2 },
          { label: '0.3', value: 0.3 },
        ]}
      />
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setDeadline(value)}
        placeholder={{ label: 'Оберіть дедлайн', value: null }}
        items={[
          { label: '100', value: 100 },
          { label: '200', value: 200 },
          { label: '500', value: 500 },
          { label: '1000', value: 1000 },

        ]}
      />
      <Text style={styles.result}>
        {[result, time]}
      </Text>
      <View style={styles.btn}>
        <Button
          title="Learn"
          color="#fff"
          onPress={() => {
            const p = new Perceptron({ threshold: 4, learningRate })
            let start = performance.now();
            setResult(`${p.learn([[0, 6], [3, 3], [1, 5], [2, 4]], deadline)}`)
            let end = performance.now();
            setTime(`\nTime= ${end - start}`)
          }}
        />
      </View>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  result: {
    top: 100,
    lineHeight: 30,
    alignSelf: 'center',
    fontSize: 16,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 200,
    height: 50,
    width: 150,
    backgroundColor: 'black',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    top: 20,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    color: 'black',
  },
  inputAndroid: {

  },
});
