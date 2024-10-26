import { Text as RNText, TextProps } from 'react-native';

export default function Text({ children, ...props }: TextProps) {
  return (
    <RNText style={{ fontFamily: 'Nunito' }} {...props}>
      {children}
    </RNText>
  );
}
