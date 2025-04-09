import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../../shared/GlobalStyles";
import { COLORS, QUIZ_CATEGORIES } from "../../shared/constants";
import { categoryIcons } from "../../shared/icons";
import { fetchScores } from "../../redux/actions";

export const ScoreBoardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores.scores);

  useEffect(() => {
    const subscription = dispatch(fetchScores());
    return () => subscription;
  }, []);

  return (
    <View style={globalStyles.screenWrapper}>
      <View style={globalStyles.sectionHeader}>
        <Text style={globalStyles.sectionTitle}>Your Scores</Text>
      </View>
      <View style={styles.resultsContainer}>
        {scores.length === 0 ? (
          <Text
            style={{
              color: COLORS.TEXT,
            }}
          >
            No scores yet!
          </Text>
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={scores}
            renderItem={({ item }) => {
              const category = QUIZ_CATEGORIES.find(
                (category) => category.value === item.category
              );
              return (
                <View style={styles.listItem}>
                  <Image
                    source={categoryIcons[category.icon]}
                    style={styles.categoryIcon}
                  />
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{category.label}</Text>
                    <View style={styles.scoreContainer}>
                      <Text style={styles.listItemText}>Score:</Text>
                      <Text
                        style={
                          item.score >= 8
                            ? [styles.scoreText, { color: COLORS.SUCCESS }]
                            : item.score >= 5
                            ? [styles.scoreText, { color: COLORS.WARNING }]
                            : [styles.scoreText, { color: COLORS.DANGER }]
                        }
                      >
                        {item.score}
                      </Text>
                      <Text style={styles.listItemText}>/10</Text>
                    </View>
                    <Text style={styles.listItemText}>
                      Finished At: {item.created_at}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.category}
          />
        )}
        {scores.length > 0 && (
          <TouchableOpacity
            style={globalStyles.primaryButton}
            onPress={() => setResults([])}
          >
            <Text style={globalStyles.buttonText}>Reset Scores</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
    padding: 16,
    width: "100%",
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    margin: 8,
  },
  listItemContent: {
    flex: 1,
    gap: 4,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.TEXT,
  },
  listItemText: {
    fontSize: 12,
    color: COLORS.TEXT_LIGHT,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
