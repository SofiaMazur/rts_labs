import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

export default function App() {
  const ferma = (n) => {
    if (n < 1 || !/^[0-9]*$/.test(n))
      return "N value is invalid";

    if (n % 2 == 0)
      return `A: ${n / 2}, B: 2`;

    let x = ~~(Math.sqrt(n));
    let y = 0;
    let count = 1; // iterations counter
    const breakpoint = 10 ** 6; // max value of iterations

    while (true) {
      const squaredY = x ** 2 - n;
      y = ~~(Math.sqrt(squaredY));

      if (count > breakpoint) return `Error: too many iterations`;

      if (y ** 2 === squaredY)
        break;
      else {
        x += 1;
        count += 1;
      }
    }

    return `A: ${x - y}, B: ${x + y}`;
  }

  const [n, onChangeNumber] = useState(null);
  const [result, setResult] = useState(null);
  const pressHandler = () => setResult(ferma(n));

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={n}
        placeholder="Write n value"
        keyboardType="numeric"
      />
      <View style={styles.btn}>
        <Button
          title="Calculate"
          color="#fff"
          onPress={pressHandler}
        />
      </View>
      <Text style={styles.result}>
        {result}</Text>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    alignSelf: 'center',
    top: 200,
    fontSize: 30
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 250,
    height: 50,
    width: 150,
    backgroundColor: 'black',
  },
  result: {
    alignSelf: 'center',
    top: 300,
    fontSize: 25
  }
});
