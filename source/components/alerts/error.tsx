import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants';
import {Text} from '../text';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library

Icon.loadFont();

interface ErrorStateProps {
  title?: string;
  message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Oops...🙁',
  message = "We're sorry, something went wrong. Please try again later",
}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="exclamation-circle"
        size={RFValue(30)}
        color={Colors.secondary['600']}
      />
      <Text type="medium" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(16),
    marginVertical: RFValue(8),
    color: Colors.white,
  },
  message: {
    fontSize: RFValue(12),
    textAlign: 'center',
    marginHorizontal: RFValue(20),
    color: Colors.primary['300'],
  },
});

export {ErrorState};
