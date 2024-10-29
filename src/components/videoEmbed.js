import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

const VideoEmbed = ({embed}) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{html: embed}}
        style={styles.webView}
        javaScriptEnabled={true}
        allowsFullscreenVideo={true}
      />
    </View>
  );
};

export default VideoEmbed;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 210, // Adjust the height based on your layout
    backgroundColor: 'black',
    marginVertical: 10,
  },
  webView: {
    flex: 1,
  },
});
