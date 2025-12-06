import React from 'react';
import { Tabs } from 'expo-router';
import { theme } from '@/constants/Theme';
import { Home } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[600],
        tabBarInactiveTintColor: theme.colors.secondary[400],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      {/* quizBook関連 */}
      <Tabs.Screen name="quizBook/AddQuizBook" options={{ href: null }} />
      <Tabs.Screen name="quizBook/AddSection" options={{ href: null }} />
      <Tabs.Screen name="quizBook/AddQuestions" options={{ href: null }} />
      <Tabs.Screen name="quizBook/ConfirmDisplay" options={{ href: null }} />
      <Tabs.Screen name="quizBook/Input/ChapterSectionInput" options={{ href: null }} />
      <Tabs.Screen name="quizBook/Input/ConfirmButton" options={{ href: null }} />
      <Tabs.Screen name="quizBook/Input/QuestionCountInput" options={{ href: null }} />
      <Tabs.Screen name="quizBook/Input/QuizBookNameInput" options={{ href: null }} />
      <Tabs.Screen name="quizBook/Input/SectionCountInput" options={{ href: null }} />
      
      {/* study関連 */}
      <Tabs.Screen name="study/[id]" options={{ href: null }} />
      <Tabs.Screen name="study/section/[chapterId]" options={{ href: null }} />
      <Tabs.Screen name="study/question/[id]" options={{ href: null }} />
      <Tabs.Screen name="study/question/compornent/MemoModal" options={{ href: null }} />
    </Tabs>
  );
}