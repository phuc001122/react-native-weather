import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Forecast from './Forecast';
import Weather from './Weather';

const MainNavigator = createStackNavigator({
  Forcast: {
    screen: Forecast,
    navigationOptions: {
      header: null,
    },
  },
  Weather: {screen: Weather},
});

const App = createAppContainer(MainNavigator);

export default App;