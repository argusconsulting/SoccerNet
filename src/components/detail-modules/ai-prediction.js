import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import tw from '../../styles/tailwind'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { getPredictionDoubleChance, getPredictionProbability } from '../../redux/predictionSlice'

const AiPrediction = ({fixtureId , homeTeam , awayTeam}) => {
const dispatch = useDispatch()
  const predictionData = useSelector(state => state?.prediction?.probabilityData)
  const doubleChanceData = useSelector(state => state?.prediction?.doubleChanceData)
  const filteredPredictionData = predictionData?.filter(item => item.type_id === 237);
  const filteredDoubleChanceData = doubleChanceData?.predictions?.filter(item => item.type_id === 239);
  // console.log("value of filt-----------------", doubleChanceData)
  console.log("value of filteredDoubleChanceData-----------------", filteredDoubleChanceData)

  useEffect(() => {

    dispatch(getPredictionProbability(fixtureId))
    dispatch(getPredictionDoubleChance(fixtureId))
  }, []);

  return (
    <>
    <View style={tw`bg-[#303649] w-90 rounded-lg self-center mt-10 py-5`}>
    <Text
                  style={tw`text-[#fff] text-[22px] font-400 leading-normal  self-center`}>
            Who will win?
                </Text>

                <Text
                  style={tw`text-[#F5C451] text-[16px] font-400 leading-normal mt-1.5 self-center`}>
           22,323  Votes
                </Text>

                <View style={tw`flex-row justify-between mt-3 `}>
                    <View>
                    <Image
                      source={{uri: homeTeam?.image_path}}
                      style={[
                        tw`w-10 h-10 self-center`, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
                <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal mt-1.5 self-center`}>
          {homeTeam?.name}
                </Text>
                <View
       
        style={[
          tw`mt-4 mx-5 rounded-full justify-center w-20 h-20`,
        
        ]}>
        <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}} // Start from top left
          end={{x: 1, y: 1}} // End at bottom right
          style={[
            tw`rounded-full justify-center`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
        <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal  self-center`}>{filteredPredictionData?.[0]?.predictions?.home} %</Text>
        </LinearGradient>
      </View>
      </View>

<View>
<Image
                      source={require('../../assets/cross.png')}
                      style={[
                        tw`w-10 h-10 self-center`, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
      <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal  self-center mt-1.5`}>
       Draw
                </Text>
      <View
       
       style={[
         tw`mt-4 mx-5 rounded-full justify-center w-20 h-20`,
       
       ]}>
       <LinearGradient
         colors={['#6A36CE', '#2575F6']}
         start={{x: 0, y: 0}} // Start from top left
         end={{x: 1, y: 1}} // End at bottom right
         style={[
           tw`rounded-full justify-center`,
           {flex: 1, justifyContent: 'center', alignItems: 'center'},
         ]}>
       <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>{filteredPredictionData?.[0]?.predictions?.draw} %</Text>
       </LinearGradient>
     </View>
     </View>

<View>
<Image
                      source={{uri: awayTeam?.image_path}}
                      style={[
                        tw`w-10 h-10 self-center `, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
     <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal mt-1.5 self-center`}>
        {awayTeam?.name}
                </Text>
     <View
       
       style={[
         tw`mt-4 mx-5 rounded-full justify-center w-20 h-20`,
       
       ]}>
       <LinearGradient
         colors={['#6A36CE', '#2575F6']}
         start={{x: 0, y: 0}} // Start from top left
         end={{x: 1, y: 1}} // End at bottom right
         style={[
           tw`rounded-full justify-center`,
           {flex: 1, justifyContent: 'center', alignItems: 'center'},
         ]}>
       <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>{filteredPredictionData?.[0]?.predictions?.away} %</Text>
       </LinearGradient>
     </View>
     </View>
                </View>
             
    </View>

    {/* //double chance  */}
    <View style={tw`bg-[#303649] w-90 rounded-lg self-center mt-10 py-5`}>
    <Text
                  style={tw`text-[#fff] text-[22px] font-400 leading-normal  self-center`}>
          Double Chance
                </Text>

             

                <View style={tw`flex-row justify-between mt-3 `}>
                    <View>
                    <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal mt-1.5 self-center`}>
           1x
                </Text>
                <View
       
        style={[
          tw`mt-4  mx-5 rounded-full justify-center w-20 h-20 self-center`,
        
        ]}>
        <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}} // Start from top left
          end={{x: 1, y: 1}} // End at bottom right
          style={[
            tw`rounded-full justify-center`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
        <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal  self-center`}>{filteredDoubleChanceData?.[0]?.predictions?.home_away} %</Text>
        </LinearGradient>
      </View>
      </View>

<View>

      <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal  self-center mt-1.5`}>
      No Draw
                </Text>
      <View
       
       style={[
         tw`mt-4 mx-5 rounded-full justify-center w-20 h-20`,
       
       ]}>
       <LinearGradient
         colors={['#6A36CE', '#2575F6']}
         start={{x: 0, y: 0}} // Start from top left
         end={{x: 1, y: 1}} // End at bottom right
         style={[
           tw`rounded-full justify-center`,
           {flex: 1, justifyContent: 'center', alignItems: 'center'},
         ]}>
       <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>{filteredDoubleChanceData?.[0]?.predictions?.draw_home} %</Text>
       </LinearGradient>
     </View>
     </View>

<View>
<Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal mt-1.5 self-center`}>
          x2
                </Text>
     <View
       
       style={[
         tw`mt-4 mx-5 rounded-full justify-center w-20 h-20`,
       
       ]}>
       <LinearGradient
         colors={['#6A36CE', '#2575F6']}
         start={{x: 0, y: 0}} // Start from top left
         end={{x: 1, y: 1}} // End at bottom right
         style={[
           tw`rounded-full justify-center`,
           {flex: 1, justifyContent: 'center', alignItems: 'center'},
         ]}>
       <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>{filteredDoubleChanceData?.[0]?.predictions?.draw_away} %</Text>
       </LinearGradient>
     </View>
     </View>
                </View>
             
    </View>
    </>
  )
}

export default AiPrediction

const styles = StyleSheet.create({})