import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Weather from './Weather';
import Forecast from './Forecast';
import ForecastInfo from './ForecastInfo';

const MainNavigator = createStackNavigator({
  Weather:
  {
    screen: Weather,
    navigationOptions:
    {
      header: null,
    },
  },

  Forecast:
  {
    screen: Forecast,
    navigationOptions:
    {
      title: 'Dự báo thời tiết',

      headerTintColor: 'white',
      headerTitleStyle:
      {
        color: 'white',
      },
      headerTransparent: true
    },
  },

  Info:
  {
    screen: ForecastInfo,
    navigationOptions:
    {
      title: 'Chi tiết',

      headerTintColor: 'white',
      headerTitleStyle:
      {
        color: 'white',
      },
      headerTransparent: true
    },
  },
});

const App = createAppContainer(MainNavigator);

export default App;