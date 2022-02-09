import Colors from './colors';
import Spacing from './spacing';

const containerStyle = {
  // Use this to wrap the outermost view in any stack screen.
  outerContainer: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: Colors.grey100,
  },
  // Use this to wrap the main content view in any stack screen.
  // If it is ScrollView then use this in contentContainerStyle.
  // Most likely you have to inject the bottom padding for iPhones along this as well.
  contentContainer: {
  },
  standardScreenSpacing: {
    marginHorizontal: Spacing.s5,
  },
};

export default containerStyle;
