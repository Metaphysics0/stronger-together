import { omit, pick } from 'lodash';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const SHARED_STYLES: Record<string, ViewStyle | TextStyle | ImageStyle> =
  {
    cardStyle: cardStyle(),
    centerContent: centerContent(),
    formRow: formRow(),
    formRowWithoutBorder: formRowWithoutBorder(),
    formRowBorder: formRowBorder(),
    formLabel: formLabel(),
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

function formRow(): ViewStyle {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  };
}

function formRowWithoutBorder(): ViewStyle {
  const baseStyles = formRow();
  return omit(baseStyles, 'borderBottomWidth', 'borderBottomColor');
}

function formRowBorder(): ViewStyle {
  const baseStyles = formRow();
  return pick(baseStyles, 'borderBottomWidth', 'borderBottomColor');
}

function formLabel(): TextStyle {
  return {
    fontSize: 16,
  };
}
