import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import tw from '../../styles/tailwind';
import { useDispatch, useSelector } from 'react-redux';
import { getPredictionSummary } from '../../redux/liveScoreSlice';

const PredictionSummary = ({ fixtureId }) => {
  console.log("fix------------------", fixtureId)
  const dispatch = useDispatch();
  const data = useSelector(state => state.liveScore.predictionSummaryData);

  useEffect(() => {

    dispatch(getPredictionSummary(fixtureId));
  
    const intervalId = setInterval(() => {
      dispatch(getPredictionSummary(fixtureId));
    }, 1000 * 60 * 12); // 12 minutes
  
 
    return () => clearInterval(intervalId);
  }, [fixtureId, dispatch]);

  const formatText = (text) => {
    return text
      .replace(/\*\*/g, '') 
      .replace(/\*/g, '') 
      .replace(/\n\s*/g, '\n') 
      .replace(/^[A-Z]\)\s*/, '') 
      .trim();
  };

  const formattedText = data?.[0]?.prediction?.response
    ? formatText(data[0].prediction.response)
    : 'No data available';

  // **Processing Text for Display**
  const sections = formattedText.split(/\n\n/).filter(s => s.trim()); // Split sections by double newline for separation

  return (
    <View style={tw`p-5 justify-center self-center align-center`}>
      {sections.map((section, index) => {
        const lines = section.split('\n').filter(line => line.trim());

        return (
          <View key={index} style={tw`mb-4 bg-[#303649] px-3 py-5 rounded-lg justify-center self-center align-center`}>
          
            {lines[0] && (
              <Text style={tw`text-white text-[18px] font-bold mb-2`}>
                {lines[0]}
              </Text>
            )}

            {/* **Remaining Lines as Details** */}
            <View style={tw`ml-3 mt-3`}>
              {lines.slice(1).map((line, i) => {
                if (line.includes(':')) {
                  // Key-Value Pair (Example: "Match: Al-Lewaa vs Hajer")
                  const splitLine = line.split(':');
                  return (
                    <Text key={`${index}-${i}`} style={tw`text-white text-[16px] leading-relaxed`}>
                      <Text style={tw`font-bold`}>{splitLine[0].trim()}</Text>
                      {splitLine[1] && (
                        <Text style={tw`text-white`}>: {splitLine[1].trim()}</Text>
                      )}
                    </Text>
                  );
                } else {
                  // Normal Text (Example: "Commentary data not available...")
                  return (
                    <Text key={`${index}-${i}`} style={tw`text-white text-[16px] leading-relaxed`}>
                      {line.trim()}
                    </Text>
                  );
                }
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PredictionSummary;
