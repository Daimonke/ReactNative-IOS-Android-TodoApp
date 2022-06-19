import { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import Todo from '../components/Todo';
import StickyHeader from '../components/StickyHeader';


const Main = ({ completedTodos, todos, getData }) => {
    const [todoMenu, setTodoMenu] = useState([]);

    return (
        <SafeAreaView style={styles.container}>
            <StickyHeader setTodoMenu={setTodoMenu} todoMenu={todoMenu} getData={getData} completedTodos={completedTodos} dataName='todos' />
            <ScrollView style={styles.body} contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={styles.title}>Active Todos</Text>
                <Text style={styles.todosNumber}>{todos.length}</Text>
                {todos.map((todo, i) => (
                    <Todo key={todo.id} todo={todo} index={i} todoMenu={todoMenu} setTodoMenu={setTodoMenu} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeText: {
        fontSize: 20,
    },
    title: {
        fontSize: 30,
        marginTop: 20,
    },
    todosNumber: {
        fontSize: 40,
        color: 'navy',
        marginBottom: 20,
    },
    body: {
        backgroundColor: 'lightgray',
        width: '100%',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});

export default Main;