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

const SoftwareForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  navigation,
  initialValues,
}) => {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [producer, setProducer] = useState(initialValues.producer);
  const [license_type, setLicense_type] = useState(initialValues.license_type);
  const [price, setPrice] = useState(initialValues.price);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Spacer>
        <Text style={{marginBottom: 15}} h3>
          {headerText}
        </Text>
      </Spacer>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Input label="Name" value={name} onChangeText={setName} />
        <Spacer />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Spacer />
        <Input label="Producer" value={producer} onChangeText={setProducer} />
        <Spacer />
        <Input
          label="License_type"
          value={license_type}
          onChangeText={setLicense_type}
        />
        <Spacer />
        <Input
          label="Price in €"
          value={price}
          onChangeText={setPrice}
          keyboardNamee="numeric"
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
              name,
              description,
              producer,
              license_type,
              price,
            })
          }
        />
      </Spacer>
    </SafeAreaView>
  );
};

SoftwareForm.defaultProps = {
  initialValues: {
    name: '',
    description: '',
    producer: '',
    license_type: '',
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

export default SoftwareForm;
