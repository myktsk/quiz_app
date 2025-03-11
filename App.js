import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "./shared/constants";
import { HomeScreen } from "./screens/HomeScreen/HomeScreen";
import { QuizScreen } from "./screens/QuizScreen/QuizScreen";
import { ScoreBoardScreen } from "./screens/ScoreBoardScreen/ScoreBoardScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.QUIZ} component={QuizScreen} />
      <Stack.Screen name={ROUTES.SCORE_BOARD} component={ScoreBoardScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <RootStack />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
