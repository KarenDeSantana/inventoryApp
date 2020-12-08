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
import DatePicker from 'react-native-date-picker';

const EmployeeForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  navigation,
  initialValues,
}) => {
  const [firstname, setFirstname] = useState(initialValues.firstname);
  const [lastname, setLastname] = useState(initialValues.lastname);
  const [email, setEmail] = useState(initialValues.email);
  const [role, setRolle] = useState(initialValues.role);
  const [birthday, setBirthday] = useState(new Date());
  const [hired_since, setHiredSince] = useState(new Date());

  return (
    <SafeAreaView style={{flex: 1}}>
      <Spacer>
        <Text style={{marginBottom: 15}} h3>
          {headerText}
        </Text>
      </Spacer>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Input label="Firstname" value={firstname} onChangeText={setFirstname} />
        <Spacer />
        <Input label="Lastname" value={lastname} onChangeText={setLastname} />
        <Spacer />
        <Text style={styles.label}>Birthday</Text>
        <DatePicker
          locale="de"
          mode="date"
          date={birthday}
          onDateChange={setBirthday}
        />
        <Spacer />
        <Input label="Email" value={email} onChangeText={setEmail} />
        <Spacer />
        <Input label="Role" value={role} onChangeText={setRolle} />
        <Spacer />
        <Text style={styles.label}>Hired since</Text>
        <DatePicker
          locale="de"
          mode="date"
          date={hired_since}
          onDateChange={setHiredSince}
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
              firstname,
              lastname,
              birthday,
              email,
              role,
              hired_since,
            })
          }
        />
      </Spacer>
    </SafeAreaView>
  );
};

EmployeeForm.defaultProps = {
  initialValues: {
    firstname: '',
    lastname: '',
    email: '',
    role: '',
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

export default EmployeeForm;
