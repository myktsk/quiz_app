import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { COLORS, QUIZ_CATEGORIES, ROUTES } from "../../shared/constants";
import { globalStyles } from "../../shared/GlobalStyles";
import { categoryIcons } from "../../shared/icons";
import { useEffect, useRef } from "react";
import { addScore } from "../../redux/actions";

export const ResultScreen = ({ navigation, route }) => {
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const { category: catValue, correctCount: score } = route.params;
  const message = score >= 7 ? "You did great!" : "Better luck next time!";
  const category = QUIZ_CATEGORIES.find((cat) => cat.value === catValue);

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(addScore({ category: catValue, score }));
      isFirstRender.current = false;
    }
  }, []);
  return (
    <View style={globalStyles.screenWrapper}>
      <View style={globalStyles.sectionHeader}>
        <Text style={globalStyles.sectionTitle}>Your Score</Text>
      </View>
      <View style={globalStyles.contentContainer}>
        <View style={styles.row}>
          <Image
            source={categoryIcons[category.icon]}
            style={globalStyles.categoryIcon}
          />
          <Text style={styles.strongText}>{category.label}</Text>
        </View>
        <View style={[styles.row, { marginTop: 16 }]}>
          <Text
            style={
              score >= 8
                ? [styles.scoreText, { color: COLORS.SUCCESS }]
                : score >= 5
                ? [styles.scoreText, { color: COLORS.WARNING }]
                : [styles.scoreText, { color: COLORS.DANGER }]
            }
          >
            {score}
          </Text>
          <Text style={{ color: COLORS.TEXT }}>/ 10</Text>
        </View>
        <Text
          style={[
            styles.strongText,
            {
              marginTop: 24,
            },
          ]}
        >
          {message}
        </Text>
        <TouchableOpacity
          style={[globalStyles.primaryButton, { marginTop: 40 }]}
          onPress={() => navigation.navigate(ROUTES.SCORE_BOARD)}
        >
          <Text style={globalStyles.buttonText}>See Score Board</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.TEXT,
  },
  strongText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TEXT,
  },
});
