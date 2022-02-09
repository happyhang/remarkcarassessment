import * as React from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { TextStyle } from '../../styles';
import Colors from '../../styles/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.grey300,
    height: 40,
    justifyContent: 'center',
  },
  text: {
    ...TextStyle.standard,
    borderWidth: 1,
    borderColor: Colors.grey300,
    textAlign: 'center',
  },
});

function Button({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
