import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const cardStyle: ViewStyle | TextStyle | ImageStyle = {
  backgroundColor: 'white',
  borderRadius: 30,
  padding: 12,
  fontSize: 16,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  elevation: 5,
};
