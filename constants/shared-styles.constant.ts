import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const SHARED_STYLES: Record<string, ViewStyle | TextStyle | ImageStyle> =
  {
    cardStyle: cardStyle(),
    centerContent: centerContent(),
  };

function cardStyle(): ViewStyle | TextStyle | ImageStyle {
  return {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  };
}

function centerContent(): ViewStyle {
  return {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };
}
