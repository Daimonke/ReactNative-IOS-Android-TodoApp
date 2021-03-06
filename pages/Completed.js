import { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import Todo from '../components/Todo';
import StickyHeader from '../components/StickyHeader';


const Completed = ({ completedTodos, getData }) => {
    const [todoMenu, setTodoMenu] = useState([]);
    return (
        <SafeAreaView style={styles.container}>
            <StickyHeader setTodoMenu={setTodoMenu} todoMenu={todoMenu} getData={getData} completedTodos={completedTodos} onlyDelete dataName='completedTodos' />
            <ScrollView style={styles.body} contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={styles.title}>Completed todos</Text>
                <Text style={styles.completedTodosNumber}>{completedTodos.length}</Text>
                {completedTodos.map((todo, i) => (
                    <Todo key={todo.id} todo={todo} index={i} todoMenu={todoMenu} setTodoMenu={setTodoMenu} borderColor='#00B81A' backgroundColor='#001B1A' checkColor='#FFEC02' />
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
    completedTodosNumber: {
        fontSize: 40,
        color: 'green',
        marginBottom: 20,
    },
    body: {
        backgroundColor: 'lightgray',
        width: '100%',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});


export default Completed