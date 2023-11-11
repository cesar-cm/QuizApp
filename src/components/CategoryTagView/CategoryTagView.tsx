import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Fonts} from '../../constants/UIKit';

interface CategoryTagViewProps {
  text: string;
}

const CategoryTagView: React.FC<CategoryTagViewProps> = ({text}) => {
  return (
    <View style={[styles.component]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontWeight: Fonts.weight.caption2,
    marginRight: 1,
  },
  text: {
    fontSize: Fonts.size.caption2,
  },
});

export default CategoryTagView;
