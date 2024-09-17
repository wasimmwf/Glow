// Themes
import { Metrics } from './Metrics';
import { Colors } from './Colors';
import { Fonts } from './Fonts';

// Default Styles for Application
const ApplicationStyles = {
  ...Fonts,
  flexContainer: {
    flex: 1
  },
  flexHorizontal: {
    flexDirection: 'row'
  },
  flexVertical: {
    flexDirection: 'column'
  },
  basePadding: {
    padding: Metrics.baseSpace
  },
  baseMargin: {
    margin: Metrics.baseSpace
  },
  whiteBG: {
    backgroundColor: Colors.white
  },
  centered: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  justifyAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignCenter: {
    textAlign: 'center'
  }
};

// Make the Styles available for the Application
export { ApplicationStyles };