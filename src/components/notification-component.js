import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {Platform, ToastAndroid} from 'react-native';
// import notifee, {AndroidImportance} from '@notifee/react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('Auth status ------------->', authStatus);
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

async function onDisplayNotification(data) {
  // Request permissions (required for iOS)
  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default2',
    name: 'Default Channel',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: data.notification.title,
    body: data.notification.body,
    android: {
      channelId,

      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export const GetFCMToken = async () => {
  // ApplicationPermission()
  if (requestUserPermission()) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcm_token = await messaging().getToken();

      if (fcm_token) {
        console.log('** FCM Token **', fcm_token);
        return fcm_token;
      }
    } catch (err) {
      console.error('Get FCM Token:', err);
    }
  } else {
    console.log('Fcm token function is not aborted');
  }
};

export const InitializeNotification = () => {
  // Get FCM token and create notification channels
  GetFCMToken()
    .then(fcmToken => {
      if (fcmToken) {
        _createChannels();
        // Listen for notifications in different app states
        _handleNotificationListeners();
      } else {
        console.warn('FCM token not available.');
      }
    })
    .catch(error => {
      console.error('Failed to initialize notifications:', error);
    });
};

const _createChannels = async () => {
  try {
    // Create a notification channel (required for Android)
    await notifee.createChannel({
      id: 'KickScore',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
      vibrationPattern: [300, 500],
    });
  } catch (error) {
    console.error('Failed to create notification channel:', error);
  }
};

const _handleNotificationListeners = () => {
  // Handle notification when the app is in the background or quit state - when click on notification
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened app:', remoteMessage);
    if (remoteMessage.notification) {
      ToastAndroid.show(remoteMessage.notification.body, ToastAndroid.LONG);
    }
  });

  // Check if the app was opened from a quit state due to a notification
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Initial notification:', remoteMessage);
        if (remoteMessage.notification) {
          ToastAndroid.show(remoteMessage.notification.body, ToastAndroid.LONG);
        }
      }
    })
    .catch(error => {
      console.error('Failed to get initial notification:', error);
    });

  // Handle notification when the app is in the foreground - working
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground message:', remoteMessage);
    onDisplayNotification(remoteMessage);

    // if (remoteMessage.notification) {
    //   ToastAndroid.show(remoteMessage.notification.body, ToastAndroid.LONG);
    // }
  });

  // Handle background message - working
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message:', remoteMessage);
  });
};
