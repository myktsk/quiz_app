import { useState } from "react";
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

const categoryIcons = {
  "question-mark": require("../../assets/category-icons/question-mark.png"),
  globe: require("../../assets/category-icons/globe.png"),
  "open-book": require("../../assets/category-icons/open-book.png"),
  "book-stack": require("../../assets/category-icons/book-stack.png"),
  movie: require("../../assets/category-icons/movie.png"),
  "vinyl-record": require("../../assets/category-icons/vinyl-record.png"),
  theater: require("../../assets/category-icons/theater.png"),
  television: require("../../assets/category-icons/television.png"),
  joystick: require("../../assets/category-icons/joystick.png"),
  "board-game": require("../../assets/category-icons/board-game.png"),
  chemistry: require("../../assets/category-icons/chemistry.png"),
  computer: require("../../assets/category-icons/computer.png"),
  calculator: require("../../assets/category-icons/calculator.png"),
  "greek-mythology": require("../../assets/category-icons/greek-mythology.png"),
  sports: require("../../assets/category-icons/sports.png"),
  castle: require("../../assets/category-icons/castle.png"),
  politician: require("../../assets/category-icons/politician.png"),
  palette: require("../../assets/category-icons/palette.png"),
  "guest-star": require("../../assets/category-icons/guest-star.png"),
  hen: require("../../assets/category-icons/hen.png"),
  truck: require("../../assets/category-icons/truck.png"),
  "comic-book": require("../../assets/category-icons/comic-book.png"),
  "smart-watch": require("../../assets/category-icons/smart-watch.png"),
  ghost: require("../../assets/category-icons/ghost.png"),
  cartoon: require("../../assets/category-icons/cartoon.png"),
};

export const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <View style={globalStyles.screenWrapper}>
      <View style={globalStyles.sectionHeader}>
        <Text style={globalStyles.sectionTitle}>Select Category</Text>
      </View>
      <View>
        <FlatList
          numColumns={3}
          data={QUIZ_CATEGORIES}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={
                selectedCategory === item.value
                  ? [styles.categoryButton, styles.categoryButtonActive]
                  : styles.categoryButton
              }
              onPress={() => setSelectedCategory(item.value)}
            >
              <Image
                source={categoryIcons[item.icon]}
                style={styles.categoryIcon}
              />
              <Text
                style={
                  selectedCategory === item.value
                    ? [
                        styles.categoryButtonText,
                        styles.categoryButtonTextActive,
                      ]
                    : styles.categoryButtonText
                }
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.value}
        />
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  categoryButton: {
    width: "30%",
    height: 100,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 8,
    marginHorizontal: 6,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButtonActive: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  categoryButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: COLORS.TEXT,
    fontWeight: "bold",
  },
  categoryButtonTextActive: {
    color: COLORS.WHITE,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    marginHorizontal: "auto",
    marginBottom: 10,
  },
});
