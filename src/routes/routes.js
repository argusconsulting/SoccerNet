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
import {Image, TouchableOpacity} from 'react-native';
import CalendarScreen from '../screens/Calendar/calendar';
import {useState} from 'react';
import LeagueModal from '../components/league-modal/league-modal';
import Profile from '../screens/Profile/profile';
import Highlights from '../screens/Highlights/highlights';
import HighlightDetail from '../screens/Highlights/modules/highlight-detail';
import Trivia from '../screens/trivia/trivia';
import Poll from '../screens/poll/poll';
import LeagueScreen from '../screens/league/leagueList';
import TriviaQuestions from '../screens/triviaQuestions/triviaQuestions';
import Discussion from '../screens/discussion/discussion';
import News from '../screens/news/news';
import Photos from '../screens/photos/photos';
import UploadPhotos from '../screens/photos/modules/upload-photos';
import LiveNow from '../screens/live-now/live-now';
import LiveDetails from '../screens/live-now/modules/live-details';
import {useSelector} from 'react-redux';
import Notification from '../screens/Notification/notification';
import SpotLight from '../screens/rooms/spotListing';
import Settings from '../screens/settings/settings';
import ChangePassword from '../screens/change-password/change-password';
import VideoHighlights from '../screens/video-highlights/videoHighlights';
import CreateRooms from '../screens/rooms/createRooms';
import MeetingChat from '../screens/rooms/meetingChat';
import JustFinished from '../screens/justFinished/justFinished';

// Bottom Tab Navigation
const Tab = createBottomTabNavigator();
function BottomTabScreens() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
          name="League"
          component={EmptyScreen} // Any valid screen or use the main one
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({focused}) => (
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  source={
                    focused
                      ? require('../assets/icons/white_grid.png')
                      : require('../assets/icons/grid.png')
                  }
                  style={[tw`w-5 h-5 mt-2`, {resizeMode: 'contain'}]}
                />
              </TouchableOpacity>
            ),
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault(); // Prevent navigation on tab press
              toggleModal(); // Open the modal instead
            },
          }}
        />
      </Tab.Navigator>
      <LeagueModal isVisible={isModalVisible} toggleModal={toggleModal} />
    </SafeAreaProvider>
  );
}

const EmptyScreen = () => {
  return null;
};

const Stack = createNativeStackNavigator();

export const StackScreen = () => {
  const token = useSelector(state => state.auth_store.token);

  return (
    // <Stack.Navigator screenOptions={{headerShown: false}}>
    //   {(token == undefined || token == '' || token == null) && (
    //     <>
    //       <Stack.Screen
    //         name="LanguageSelection"
    //         component={LanguageSelection}
    //       />
    //       <Stack.Screen name="SplashScreen" component={SplashScreen} />
    //     </>
    //   )}
    //   <>
    //     <Stack.Screen name="LeagueSelection" component={LeagueSelection} />
    //     <Stack.Screen name="Home" component={BottomTabScreens} />
    //     <Stack.Screen name="Calendar" component={CalendarScreen} />
    //     <Stack.Screen name="Profile" component={Profile} />
    //     <Stack.Screen name="Highlights" component={Highlights} />
    //     <Stack.Screen name="HighlightDetail" component={HighlightDetail} />
    //     <Stack.Screen name="Trivia" component={Trivia} />
    //     <Stack.Screen name="Poll" component={Poll} />
    //     <Stack.Screen name="LeagueScreen" component={LeagueScreen} />
    //     <Stack.Screen name="TriviaQuestions" component={TriviaQuestions} />
    //     <Stack.Screen name="Discussion" component={Discussion} />
    //     <Stack.Screen name="News" component={News} />
    //     <Stack.Screen name="Photos" component={Photos} />
    //     <Stack.Screen name="UploadPhotos" component={UploadPhotos} />
    //     <Stack.Screen name="LiveNow" component={LiveNow} />
    //     <Stack.Screen name="LiveDetails" component={LiveDetails} />
    //     <Stack.Screen name="SpotLight" component={SpotLight} />
    //     <Stack.Screen name="Notification" component={Notification} />
    //     <Stack.Screen name="Settings" component={Settings} />
    //   </>
    // </Stack.Navigator>
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={token ? 'Home' : 'LanguageSelection'} // Set the starting screen based on token
    >
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LeagueSelection" component={LeagueSelection} />
      <Stack.Screen name="Home" component={BottomTabScreens} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Highlights" component={Highlights} />
      <Stack.Screen name="HighlightDetail" component={HighlightDetail} />
      <Stack.Screen name="Trivia" component={Trivia} />
      <Stack.Screen name="Poll" component={Poll} />
      <Stack.Screen name="LeagueScreen" component={LeagueScreen} />
      <Stack.Screen name="TriviaQuestions" component={TriviaQuestions} />
      <Stack.Screen name="Discussion" component={Discussion} />
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="Photos" component={Photos} />
      <Stack.Screen name="UploadPhotos" component={UploadPhotos} />
      <Stack.Screen name="LiveNow" component={LiveNow} />
      <Stack.Screen name="LiveDetails" component={LiveDetails} />
      <Stack.Screen name="SpotLight" component={SpotLight} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="videoHighlights" component={VideoHighlights} />
      <Stack.Screen name="CreateRooms" component={CreateRooms} />
      <Stack.Screen name="MeetingChat" component={MeetingChat} />
      <Stack.Screen name="JustFinished" component={JustFinished} />
    </Stack.Navigator>
  );
};

export default function Routes() {
  const token = useSelector(state => state.auth_store.token);
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
