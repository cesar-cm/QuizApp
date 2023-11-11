import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  action: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

const ButtonApp: React.FC<ButtonProps> = ({
  title,
  action,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={action} style={[styles.component, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  component: {
    overflow: 'hidden',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ButtonApp;
