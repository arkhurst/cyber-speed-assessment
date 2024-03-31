import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../text';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library

Icon.loadFont();

interface EmptyStateProps {
  title?: string;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Results Found',
  message = 'Looks like there are no results found. Please try again later.',
}) => {
  return (
    <View style={styles.container}>
      <Icon name="info-circle" size={RFValue(30)} color={Colors.white} />
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

export {EmptyState};
