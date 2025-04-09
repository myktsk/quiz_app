import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator, // スピナー
} from 'react-native';
import { COLORS } from '../../shared/constants';
import { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { useRoute } from '@react-navigation/native';
import { decode } from 'html-entities';
import { Alert } from 'react-native';
import { ROUTES } from '../../shared/constants';

export const QuizScreen = ({ navigation }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { category } = route.params;

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        let url = `https://opentdb.com/api.php?amount=10&type=multiple`;

        if (category !== 'any') {
          url += `&category=${category}`;
        }
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && Array.isArray(data.results)) {
          setQuestions(data.results);

          // Shuffle choices
          const shuffledQuestions = data.results.map((quize) => {
            const options = [
              quize.correct_answer,
              ...quize.incorrect_answers,
            ].map(decode);
            const shuffledOptions = options.sort(() => Math.random() - 0.5);

            return shuffledOptions;
          });

          setChoices(shuffledQuestions);
        } else {
          fetchQuizData(); // Re-fetch Because it may not be able to acquire the data.
        }
      } catch (error) {
        console.error('API fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handlePress = (item) => {
    setSelectedAnswer(item);
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer！');
      return;
    }

    const correctAnswer = questions[count]?.correct_answer;
    if (selectedAnswer === correctAnswer) {
      setCorrectCount(correctCount + 1);
      Alert.alert('Correct！', 'Congratulations！', [
        { text: 'Next question', onPress: () => handleNext() },
      ]);
    } else {
      Alert.alert('Incorrect！', `Correct answer is ${decode(correctAnswer)}`, [
        { text: 'Next question', onPress: () => handleNext() },
      ]);
    }
    if (count < 9) {
      setCount(count + 1);
    }
    setSelectedAnswer(null);
  };

  const handleNext = () => {
    if (count < 9) {
      return;
    }
    navigation.navigate(ROUTES.RESULT, {
      category: category,
      correctCount: correctCount,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size='large' color={COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.questionArea}>
        <Text style={styles.questionAreaText}>
          Q{count + 1}. {decode(questions[count]?.question)}
        </Text>
      </View>

      <FlatList
        data={choices[count]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View
              style={[
                styles.answerArea,
                selectedAnswer === item && {
                  backgroundColor: COLORS.PRIMARY,
                },
              ]}
            >
              <Text
                style={[
                  styles.answerAreaText,
                  selectedAnswer === item && {
                    color: COLORS.WHITE,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <TouchableOpacity style={styles.nextButton} onPress={handleAnswer}>
          <Text style={styles.nextButtonText}>Answer</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%' }}>
        <Progress.Bar
          width={null}
          height={10}
          progress={count * 0.1}
          color={count * 0.1 === 1 ? 'red' : 'blue'}
          unfilledColor='lightgray'
          borderRadius={5}
          animationType='timing'
          useNativeDriver={true}
        />
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  screenWrapper: {
    flex: 1,
    padding: 16,
  },
  questionArea: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    padding: 16,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    elevation: 3,
  },
  questionAreaText: {
    fontSize: 20,
  },
  answerArea: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
    marginTop: 16,
    padding: 2,
  },
  answerAreaText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  nextButton: {
    width: '50%',
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.WHITE,
    marginBottom: 16,
  },
  nextButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: COLORS.PRIMARY,
  },
});
