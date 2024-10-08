import React from 'react';
import { Text } from 'react-native';
import tw from '../../styles/tailwind';


const TruncatedText = ({ text, maxLength = 5, ellipsis = '...' }) => {
  const words = text.split(' ');

  if (words.length <= maxLength) {
    return <Text style={[tw`text-[#fff] text-[14px] font-400 mx-5 mt-1 leading-tight w-50`,{textTransform:"capitalize"}]}>{text}</Text>; // No truncation needed
  }

  const truncatedWords = words.slice(0, maxLength);
  return (
    <Text style={tw`text-[#fff] text-[14px] font-400 mx-5 mt-1 leading-tight w-50`}>
      {truncatedWords.join(' ')}
      {ellipsis}
    </Text>
  );
};

export default TruncatedText;