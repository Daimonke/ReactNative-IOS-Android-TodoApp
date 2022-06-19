import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Add from './pages/Add';
import Main from './pages/Main';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import Completed from './pages/Completed';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

export default function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const getData = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      todos?.length > 0 ? setTodos(JSON.parse(todos)) : setTodos([
        {
          id: 1,
          title: 'First Todo',
          completed: false
        }
      ]);
      const doneTodos = await AsyncStorage.getItem('completedTodos');
      doneTodos?.length > 0 ? setCompletedTodos(JSON.parse(doneTodos)) : null;

    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getData();
  }
    , [])

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          size = focused ? size + 10 : size;
          let iconName;
          switch (route.name) {
            case 'Todos':
              iconName = 'md-list-outline';
              break;
            case 'Add Todo':
              iconName = 'add-circle';
              break;
            case 'Completed Todos':
              iconName = 'md-checkmark-circle-outline';
              break;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIconStyle: styles.tabBarIcon,
        headerShown: false,
      })}>
        <Tab.Screen name="Todos" children={() => <Main completedTodos={completedTodos} todos={todos} getData={getData} />} />
        <Tab.Screen name="Add Todo" children={() => <Add getData={getData} />} />
        <Tab.Screen name="Completed Todos" children={() => <Completed completedTodos={completedTodos} todos={todos} getData={getData} />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
    borderTopWidth: 0,
    borderStyle: 'solid',
    paddingBottom: 10,
  },
  tabBarIcon: {
    width: '100%',
    height: '100%',
  },
})