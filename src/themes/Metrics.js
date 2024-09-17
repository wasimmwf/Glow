import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseSpace
const Metrics = {
  baseSpace: 16,
  doubleBaseSpace: 32,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export { Metrics };
