import { View, Text, Pressable } from 'react-native';

interface AssignmentItemProps {
  assignment: {
    title: string;
    class: string;
    due: string;
    overdue: number; 
  };
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  return (
    <Pressable className='flex-row justify-between items-start mb-4'>
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
        <Text className='text-neutral-500 text-xs font-bold text-end'>{assignment.due}</Text>
      </View>
    </Pressable>
  );
}
