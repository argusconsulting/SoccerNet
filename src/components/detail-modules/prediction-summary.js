import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from '../../styles/tailwind';
import { useDispatch, useSelector } from 'react-redux';
import { getPredictionSummary } from '../../redux/liveScoreSlice';

const PredictionSummary = ({ fixtureId }) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.liveScore.predictionSummaryData);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getPredictionSummary(fixtureId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      dispatch(getPredictionSummary(fixtureId));
    }, 1000 * 60 * 12); // Every 12 minutes

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
    : null;

  const sections = formattedText ? formattedText.split(/\n\n/).filter(s => s.trim()) : [];

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center mt-10`}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!sections.length) {
    return (
      <View style={tw`p-5`}>
        <Text style={tw`text-white text-center`}>No prediction data available.</Text>
      </View>
    );
  }

  return (
    <View style={tw`p-5 justify-center self-center align-center`}>
      {sections.map((section, index) => {
        const lines = section.split('\n').filter(line => line.trim());

        return (
          <View
            key={index}
            style={tw`mb-4 bg-[#303649] px-3 py-5 rounded-lg justify-center self-center align-center`}
          >
            {lines[0] && (
              <Text style={tw`text-white text-[18px] font-bold mb-2`}>
                {lines[0]}
              </Text>
            )}

            <View style={tw`ml-3 mt-3`}>
              {lines.slice(1).map((line, i) => {
                if (line.includes(':')) {
                  const [key, value] = line.split(':');
                  return (
                    <Text key={`${index}-${i}`} style={tw`text-white text-[16px] leading-relaxed`}>
                      <Text style={tw`font-bold`}>{key.trim()}</Text>
                      <Text>: {value.trim()}</Text>
                    </Text>
                  );
                } else {
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
