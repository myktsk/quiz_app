import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { globalStyles } from '../../shared/GlobalStyles';
import { COLORS, QUIZ_CATEGORIES, ROUTES } from '../../shared/constants';
import { categoryIcons } from '../../shared/icons';
import { deleteScore, fetchScores } from '../../redux/actions';

export const ScoreBoardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores.scores);

  const confirmAndReset = () => {
    Alert.alert(
      'Reset Scores',
      'Are you sure you want to reset the scores? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            scores.forEach((score) => {
              dispatch(deleteScore(score.id));
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const subscription = dispatch(fetchScores());
    return () => subscription;
  }, []);

  return (
    <View style={globalStyles.screenWrapper}>
      <View style={globalStyles.sectionHeader}>
        <Text style={globalStyles.sectionTitle}>Your Scores</Text>
      </View>
      <View style={globalStyles.contentContainer}>
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
            style={{ width: '100%' }}
            data={scores}
            renderItem={({ item }) => {
              const category = QUIZ_CATEGORIES.find(
                (category) => category.value === item.category
              );
              return (
                <View style={styles.listItem}>
                  <Image
                    source={categoryIcons[category.icon]}
                    style={globalStyles.categoryIcon}
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
            keyExtractor={(item) => item.id}
          />
        )}
        {scores.length > 0 && (
          <TouchableOpacity onPress={confirmAndReset}>
            <Text style={{ color: COLORS.DANGER }}>Reset Scores</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[globalStyles.primaryButton, { marginTop: 16 }]}
          onPress={() => {
            navigation.navigate(ROUTES.HOME);
          }}
        >
          <Text style={globalStyles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
    padding: 16,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
  },
  listItemContent: {
    flex: 1,
    gap: 4,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  listItemText: {
    fontSize: 12,
    color: COLORS.TEXT_LIGHT,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
