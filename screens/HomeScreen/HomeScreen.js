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
import { COLORS, QUIZ_CATEGORIES, ROUTES } from "../../shared/constants";
import { categoryIcons } from "../../shared/icons";

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
      <TouchableOpacity
        style={globalStyles.primaryButton}
        onPress={() => {
          navigation.navigate(ROUTES.QUIZ, { category: selectedCategory });
        }}
        disabled={!selectedCategory}
      >
        <Text style={globalStyles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
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
