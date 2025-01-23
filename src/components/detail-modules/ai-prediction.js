import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from '../../styles/tailwind'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { getPredictionDoubleChance, getPredictionFirstGoal, getPredictionProbability } from '../../redux/predictionSlice'

const AiPrediction = ({fixtureId , homeTeam , awayTeam}) => {
const dispatch = useDispatch()
  const predictionData = useSelector(state => state?.prediction?.probabilityData)
  const doubleChanceData = useSelector(state => state?.prediction?.doubleChanceData)
  const firstGoalData = useSelector(state => state?.prediction?.firstGoalData)
  const filteredPredictionData = predictionData?.filter(item => item.type_id === 237);
  const filteredDoubleChanceData = doubleChanceData?.predictions?.filter(item => item.type_id === 239);
  const filterdTeamScoredFirstData = firstGoalData?.predictions?.filter(item => item.type_id === 238);
  const [showPredictions, setShowPredictions] = useState(false);
  const [showDoubleChance, setShowDoubleChance] = useState(false);
  const [showFirstGoal, setShowFirstGoal] = useState(false);

  useEffect(() => {
    const fetchPredictions = () => {
      dispatch(getPredictionProbability(fixtureId));
      dispatch(getPredictionDoubleChance(fixtureId));
      dispatch(getPredictionFirstGoal(fixtureId));
    };

    // Call the APIs initially
    fetchPredictions();

    // Set an interval to call the APIs every 10 minutes
    const interval = setInterval(fetchPredictions, 10 * 60 * 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [dispatch, fixtureId]);


  


  return (
    <>
    <View style={tw`bg-[#303649] w-90 rounded-lg self-center mt-10 py-5`}>
    <Text
                  style={tw`text-[#fff] text-[22px] font-400 leading-normal  self-center`}>
            Who will win?
                </Text>

               

                <View style={tw`flex-row justify-between mt-6 `}>
                    <View>
                    <Image
                      source={{uri: homeTeam?.image_path}}
                      style={[
                        tw`w-10 h-10 self-center`, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
                {/* <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal mt-1.5 w-25 self-center text-center`}>
          {homeTeam?.name}
                </Text> */}
                <TouchableOpacity
       onPress={() => setShowPredictions(true)}
        style={[
          tw`mt-5 mx-5  rounded-full justify-center w-20 h-20`,
        
        ]}>
        <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}} // Start from top left
          end={{x: 1, y: 1}} // End at bottom right
          style={[
            tw`rounded-full justify-center`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
  <Text style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
                {showPredictions ? `${filteredPredictionData?.[0]?.predictions?.home.toFixed(2)} %` : 'Yes'}
              </Text>       
               </LinearGradient>
      </TouchableOpacity>
      </View>

<View>
<Image
                      source={require('../../assets/handshake.png')}
                      style={[
                        tw`w-12 h-12 self-center`, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
      {/* <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal  self-center mt-1.5`}>
       Draw
                </Text> */}
      <TouchableOpacity
       onPress={() => setShowPredictions(true)}
       style={[
         tw`mt-3 mx-5 rounded-full justify-center w-20 h-20`,
       
       ]}>
       <LinearGradient
         colors={['#6A36CE', '#2575F6']}
         start={{x: 0, y: 0}} // Start from top left
         end={{x: 1, y: 1}} // End at bottom right
         style={[
           tw`rounded-full justify-center`,
           {flex: 1, justifyContent: 'center', alignItems: 'center'},
         ]}>
 <Text style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
                {showPredictions ? `${filteredPredictionData?.[0]?.predictions?.draw.toFixed(2)} %` : '--'}
              </Text>
                     </LinearGradient>
     </TouchableOpacity>
     </View>

<View>
<Image
                      source={{uri: awayTeam?.image_path}}
                      style={[
                        tw`w-10 h-10 self-center `, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
     {/* <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal w-25 mt-1.5 self-center text-center`}>
        {awayTeam?.name}
                </Text> */}
     <TouchableOpacity
         onPress={() => setShowPredictions(true)}
       style={[
         tw`mt-5 mx-5 rounded-full justify-center w-20 h-20`,
       
       ]}>
       <LinearGradient
         colors={['#6A36CE', '#2575F6']}
         start={{x: 0, y: 0}} // Start from top left
         end={{x: 1, y: 1}} // End at bottom right
         style={[
           tw`rounded-full justify-center`,
           {flex: 1, justifyContent: 'center', alignItems: 'center'},
         ]}>
 <Text style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
                {showPredictions ? `${filteredPredictionData?.[0]?.predictions?.away.toFixed(2)} %` : 'No'}
              </Text>
                     </LinearGradient>
     </TouchableOpacity>
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
                <TouchableOpacity
           onPress={() => setShowDoubleChance(true)}
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
        <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal  self-center`}>{showDoubleChance ? `${filteredDoubleChanceData?.[0]?.predictions?.home_away.toFixed(2)} %` : "1X"} </Text>
        </LinearGradient>
      </TouchableOpacity>
      </View>

<View>

      <Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal  self-center mt-1.5`}>
      No Draw
                </Text>
                <TouchableOpacity
           onPress={() => setShowDoubleChance(true)}
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
       <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>{showDoubleChance ? `${filteredDoubleChanceData?.[0]?.predictions?.draw_home.toFixed(2)} %`: "--"}</Text>
       </LinearGradient>
     </TouchableOpacity>
     </View>

<View>
<Text
                  style={tw`text-[#fff] text-[18px] font-402 leading-normal mt-1.5 self-center`}>
          x2
                </Text>
                <TouchableOpacity
           onPress={() => setShowDoubleChance(true)}
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
       <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>{showDoubleChance ? `${filteredDoubleChanceData?.[0]?.predictions?.draw_away.toFixed(2)} %`: "X2"}</Text>
       </LinearGradient>
     </TouchableOpacity>
     </View>
                </View>
             
    </View>


    {/* first goal prediction */}

    <View style={tw`bg-[#303649] w-90 rounded-lg self-center my-10 py-5`}>
    <Text
                  style={tw`text-[#fff] text-[22px] mb-5 font-400 leading-normal  self-center`}>
      Who will score first goal ?
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
                <TouchableOpacity
           onPress={() => setShowFirstGoal(true)}
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
        <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal  self-center`}>{showFirstGoal ? `${filterdTeamScoredFirstData?.[0]?.predictions?.home.toFixed(2)} %` : "Yes"} </Text>
        </LinearGradient>
      </TouchableOpacity>
      </View>

<View>

<Image
                      source={require('../../assets/handshake.png')}
                      style={[
                        tw`w-12 h-12 self-center`, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
                <TouchableOpacity
           onPress={() => setShowFirstGoal(true)}
       style={[
         tw`mt-2 mx-5 rounded-full justify-center w-20 h-20`,
       
       ]}>
       <LinearGradient
         colors={['#6A36CE', '#2575F6']}
         start={{x: 0, y: 0}} // Start from top left
         end={{x: 1, y: 1}} // End at bottom right
         style={[
           tw`rounded-full justify-center`,
           {flex: 1, justifyContent: 'center', alignItems: 'center'},
         ]}>
       <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>{showFirstGoal ? `${filterdTeamScoredFirstData?.[0]?.predictions?.draw.toFixed(2)} %`: "--"}</Text>
       </LinearGradient>
     </TouchableOpacity>
     </View>

<View>
<Image
                      source={{uri: awayTeam?.image_path}}
                      style={[
                        tw`w-10 h-10 self-center`, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
                <TouchableOpacity
           onPress={() => setShowFirstGoal(true)}
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
       <Text  style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>{showFirstGoal ? `${filterdTeamScoredFirstData?.[0]?.predictions?.draw.toFixed(2)} %`: "No"}</Text>
       </LinearGradient>
     </TouchableOpacity>
     </View>
                </View>
             
    </View>
    </>
  )
}

export default AiPrediction

const styles = StyleSheet.create({})