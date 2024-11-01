import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

interface AssignmentItemProps {
  assignment: {
    title: string;
    description: string;
    class: string;
    type: string;
    duedate: number; 
    overdue: number;
    files?: string[];
    images?: string[];
  };
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  const [expanded, setExpanded] = useState(false);

  const formatDueDate = (dueDate: number) => {
    const date = new Date(dueDate * 1000);
    return date.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

  return (
    <View>
      <Pressable
        className='flex-row justify-between items-start mb-4'
        onPress={() => setExpanded(!expanded)}
      >
        <View className='flex-1'>
          <Text className='text-white text-sm font-bold'>{assignment.title}</Text>
          <Text className='text-neutral-500 text-xs font-bold'>{assignment.class}</Text>
        </View>
        <View className='flex-row items-center justify-between p-4'>
          {assignment.overdue > 0 && (
            <View className='flex-2 mr-3 bg-red-500 rounded-full w-2 h-2' accessibilityLabel="Overdue"></View>
          )}
        </View>
        <View className='flex-3'>
          <Text className='text-white text-sm font-bold text-center'>Due</Text>
          <Text className='text-neutral-500 text-xs font-bold text-end'>
            {formatDueDate(assignment.duedate)}
          </Text>
        </View>
      </Pressable>
      {expanded && (
        <View className="mb-4 p-4 bg-neutral-800 rounded">
          <Text className="text-white text-xs font-semibold">{assignment.description}</Text>
          {assignment.files && assignment.files.length > 0 && (
            <View>
              <Text className="text-neutral-500 text-xs font-bold">Files:</Text>
              {assignment.files.map((file, index) => (
                <Text key={index} className="text-blue-500 text-xs">{file}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
