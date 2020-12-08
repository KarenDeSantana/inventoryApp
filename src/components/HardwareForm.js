import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer';

const HardwareForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  navigation,
  initialValues,
}) => {
  const [type, setTyp] = useState(initialValues.type);
  const [producer, setProducer] = useState(initialValues.producer);
  const [model, setModel] = useState(initialValues.model);
  const [serial_number, setSerial_number] = useState(initialValues.serial_number);
  const [price, setPrice] = useState(initialValues.price);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Spacer>
        <Text style={{marginBottom: 15}} h3>
          {headerText}
        </Text>
      </Spacer>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Input label="Type" value={type} onChangeText={setTyp} />
        <Spacer />
        <Input
          label="Producer"
          value={producer}
          onChangeText={setProducer}
        />
        <Spacer />
        <Input label="Model" value={model} onChangeText={setModel} />
        <Spacer />
        <Input
          label="Serial_number"
          value={serial_number}
          onChangeText={setSerial_number}
        />
        <Spacer />
        <Input
          label="Price in €"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Spacer />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </ScrollView>
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() =>
            onSubmit({
              type,
              producer,
              model,
              serial_number,
              price,
            })
          }
        />
      </Spacer>
    </SafeAreaView>
  );
};

HardwareForm.defaultProps = {
  initialValues: {
    type: '',
    producer: '',
    model: '',
    serial_number: '',
    price: '',
  },
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
    marginLeft: 10,
    color: 'grey',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F5FCFF',
    marginBottom: 10,
  },
  text: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HardwareForm;
