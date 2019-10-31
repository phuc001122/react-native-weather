import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Weather from './Weather';
import Forecast from './Forecast';
import ForecastInfo from './ForecastInfo';

const MainNavigator = createStackNavigator({
  Weather: {
    screen: Weather,
    navigationOptions: {
      header: null,
    },
  },
  Forecast: {screen: Forecast,},
  Info: {screen: ForecastInfo},
});

const App = createAppContainer(MainNavigator);

export default App;