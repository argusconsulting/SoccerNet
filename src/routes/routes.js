import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import tw from '../styles/tailwind';
import LanguageSelection from '../screens/LanguageSelection/LanguageSelection';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LeagueSelection from '../screens/LeagueSelection/leagueSelection';

import Home from '../screens/Home/home';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native';
import CalendarScreen from '../screens/Calendar/calendar';

// Bottom Tab Navigation
const Tab = createBottomTabNavigator();
function BottomTabScreens() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {height: Platform.OS == 'ios' ? 55 : 55},
        }}
        tabBarOptions={{
          showIcon: true,
          showLabel: true,
          activeTintColor: '#937323',
          inactiveTintColor: '#9756',
          tabStyle: {backgroundColor: '#303649', paddingBottom: 7},
          labelStyle: {fontSize: 12, color: '#fff'},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Feather
                  name={'home'}
                  color={'#fff'}
                  size={22}
                  style={tw`mt-2`}
                />
              ) : (
                <Feather
                  name={'home'}
                  color={'#8D8E90'}
                  size={22}
                  style={tw`mt-2`}
                />
              ),
          }}
        />

        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({focused}) =>
              focused ? (
                <AntDesign
                  name={'calendar'}
                  color={'#fff'}
                  size={22}
                  style={tw`mt-2`}
                />
              ) : (
                <AntDesign
                  name={'calendar'}
                  color={'#8D8E90'}
                  size={22}
                  style={tw`mt-2`}
                />
              ),
          }}
        />

        <Tab.Screen
          name="More"
          component={LanguageSelection}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../assets/icons/white_grid.png')}
                  style={[tw`w-5 h-5 mt-2`, {resizeMode: 'contain'}]}
                />
              ) : (
                <Image
                  source={require('../assets/icons/grid.png')}
                  style={[tw`w-5 h-5 mt-2`, {resizeMode: 'contain'}]}
                />
              ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator();

export const StackScreen = () => {
  // const token = useSelector(state => state.auth_store.token);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <>
        <Stack.Screen name="Home" component={BottomTabScreens} />
        <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LeagueSelection" component={LeagueSelection} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
      </>
    </Stack.Navigator>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
