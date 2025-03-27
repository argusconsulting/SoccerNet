import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from '../../styles/tailwind';
import MapView, { Marker } from 'react-native-maps';

const MatchInfo = ({ detailData }) => {
    if (!detailData || !detailData.weatherreport || !detailData.venue) return null;

    const { weatherreport , venue } = detailData;
    const { temperature, feels_like, wind, humidity, pressure, clouds, description, icon, current } = weatherreport;
    const { name, address, city_name, capacity, latitude, longitude, surface, image_path } = venue;


    return (
               <View style={tw`bg-gray-900 p-5 rounded-lg shadow-lg mb-5`}>
            {/* Venue Information */}
            <Text style={tw`text-xl text-white font-bold mb-3 font-400 `}>Venue Information</Text>
            <View style={tw`  mb-4`}>
                <Image source={{ uri: image_path }} style={tw`w-full h-60 self-center rounded-lg`} />
                <View style={tw`mt-3`}>
                    <Text style={tw`text-gray-200 font-400 font-[14px] text-lg font-bold`}>{name}</Text>
                    <Text style={tw`text-gray-300 font-400 font-[14px]`}>Address:{'  '}{address}, {city_name}</Text>
                    <Text style={tw`text-gray-400 font-400 font-[14px]`}>Capacity:{'  '}{capacity}</Text>
                    <Text style={tw`text-gray-400 font-400 font-[14px]`}>Surface:{'  '}{surface}</Text>
                </View>
            </View>

            {/* Weather Report */}
            <View style={tw`flex-row justify-between my-5`}>
            <Text style={tw`text-xl text-white font-bold font-401  `}>Weather Report</Text>
            <View style={tw`flex-row items-center justify-end `}>
                <Image source={{ uri: icon }} style={tw`w-10 h-10 mr-3`} />
                <Text style={tw`text-white text-[14px] font-400  capitalize`}>{description}</Text>
            </View>
            </View>
            {current !== null && (
                <View style={tw`flex-row justify-between items-center mb-2`}>
                    <FontAwesome5 name="thermometer-half" size={20} color="white" />
                    <Text style={tw`text-gray-300 flex-1 ml-2 font-400 `}>
                        Current Temp: {current?.temp}°C (Feels like {current?.feels_like}°C)
                    </Text>
                </View>
            )}
            <View style={tw`flex-row justify-between items-center mb-2`}>
                <FontAwesome5 name="tint" size={20} color="white" />
                <Text style={tw`text-gray-300 flex-1 ml-2 font-400 `}>Humidity: {humidity}</Text>
            </View>
            <View style={tw`flex-row justify-between items-center mb-2`}>
                <FontAwesome5 name="tachometer-alt" size={20} color="white" />
                <Text style={tw`text-gray-300 flex-1 ml-2 font-400 `}>Pressure: {pressure} hPa</Text>
            </View>
            <View style={tw`flex-row justify-between items-center mb-2`}>
                <FontAwesome5 name="wind" size={20} color="white" />
                <Text style={tw`text-gray-300 flex-1 ml-2 font-400 `}>Wind: {wind?.speed} m/s (Direction: {wind?.direction}°)</Text>
            </View>
            <View style={tw`flex-row justify-between items-center mb-2`}>
                <FontAwesome5 name="cloud" size={20} color="white" />
                <Text style={tw`text-gray-300 flex-1 ml-2 font-400 `}>Cloud Cover: {clouds}</Text>
            </View>

            {/* Map View */}
            <Text style={tw`text-xl text-white font-bold mb-3 my-5 font-401`}>Location</Text>
          
      <MapView
  style={tw`h-80 rounded-lg`}
  region={{
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
  zoomEnabled={true}
  scrollEnabled={true}
  pitchEnabled={true}
  rotateEnabled={true}
>
  <Marker
    coordinate={{
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    }}
    title={name}
    description={city_name}
    onCalloutPress={() => {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    }}
  />
</MapView>

        </View>

    );
};

export default MatchInfo;

const styles = StyleSheet.create({});
