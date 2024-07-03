// src/components/ValidatedInput.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ValidatedInput = ({ label, value, onChange, placeholder, keyboardType = 'default', validationRules }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    validate();
  }, [value]);

  const validate = () => {
    if (!validationRules) {
      setError('');
      return;
    }
    for (let rule of validationRules) {
      if (!rule.condition(value)) {
        setError(rule.message);
        return;
      }
    }
    setError('');
  };

  return (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        style={styles.input}
        value={value !== '' ? value.toString() : ''}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onBlur={validate}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ValidatedInput;