import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import tw from '../styles/tailwind';
import LanguageSelection from '../screens/LanguageSelection/LanguageSelection';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LeagueSelection from '../screens/LeagueSelection/leagueSelection';
import Calendar from '../screens/Calendar/calendar';
import Home from '../screens/Home/home';
import Feather from 'react-native-vector-icons/Feather';

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
          tabStyle: {backgroundColor: '#fff', paddingBottom: 7},
          labelStyle: {fontSize: 12},
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
                  color={'#EB6707'}
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
          component={Calendar}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Feather
                  name={'book'}
                  color={'#EB6707'}
                  size={22}
                  style={tw`mt-2`}
                />
              ) : (
                <Feather
                  name={'book'}
                  color={'#8D8E90'}
                  size={22}
                  style={tw`mt-2`}
                />
              ),
          }}
        />

        {/* <Tab.Screen
          name="Event"
          component={Event}
          options={{
            tabBarLabel: 'Event',
            tabBarIcon: ({focused}) =>
                focused ? (
                    <Feather
                      name={'calendar'}
                      color={'#EB6707'}
                      size={22}
                      style={tw`mt-2`}
                    />
                  ) : (
                    <Feather
                      name={'calendar'}
                      color={'#8D8E90'}
                      size={22}
                      style={tw`mt-2`}
                    />
            ),

          }}
        /> */}
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
        <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LeagueSelection" component={LeagueSelection} />
        <Stack.Screen name="Calendar" component={Calendar} />

        <Stack.Screen name="Home" component={BottomTabScreens} />
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
