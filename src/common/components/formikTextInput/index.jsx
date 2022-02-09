import * as React from 'react';
import {
  TextInput, View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { getIn, useFormikContext } from 'formik';
import { TextStyle } from '../../styles';
import Colors from '../../styles/colors';

const styles = StyleSheet.create({
  label: TextStyle.small,
  textInput: {
    ...TextStyle.standard,
    borderWidth: 1,
    borderColor: Colors.grey300,
  },
  error: {
    ...TextStyle.standard,
    color: Colors.red900,
  },
});

function FormikTextInput({ name, label, ...props }) {
  const formik = useFormikContext();
  const value = getIn(formik.values, name);
  const error = getIn(formik.errors, name);
  const isTouched = getIn(formik.touched, name);

  const onChange = React.useCallback((t) => {
    formik.setFieldValue(name, t);
  }, []);

  return (
    <View>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      {error && isTouched ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}

FormikTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

FormikTextInput.defaultProps = {
  label: undefined,
};

export default FormikTextInput;
