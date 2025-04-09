import { Provider } from "react-redux";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { store } from "./redux/store";
import { COLORS, ROUTES } from "./shared/constants";
import { HomeScreen } from "./screens/HomeScreen/HomeScreen";
import { QuizScreen } from "./screens/QuizScreen/QuizScreen";
import { ScoreBoardScreen } from "./screens/ScoreBoardScreen/ScoreBoardScreen";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.BACKGROUND,
        },
        headerTintColor: COLORS.TEXT,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.SCORE_BOARD)}
          >
            <Text style={{ color: COLORS.TEXT, marginRight: 10 }}>
              Score Board
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.QUIZ} component={QuizScreen} />
      <Stack.Screen name={ROUTES.SCORE_BOARD} component={ScoreBoardScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <SafeAreaView style={styles.safeArea}>
            <RootStack />
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
