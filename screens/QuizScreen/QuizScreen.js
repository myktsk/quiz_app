import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../shared/constants';
import { useState } from 'react';
import * as Progress from 'react-native-progress';

const quize = {
  type: 'multiple',
  difficulty: 'easy',
  category: 'Sports',
  question: 'Which two teams played in Super Bowl XLII?',
  correct_answer: 'The New York Giants & The New England Patriots',
  incorrect_answers: [
    'The Green Bay Packers & The Pittsburgh Steelers',
    'The Philadelphia Eagles & The New England Patriots',
    'The Seattle Seahawks & The Denver Broncos',
  ],
};

export const QuizScreen = ({ navigation }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [progress, setProgress] = useState(0);

  const handlePress = (item) => {
    setSelectedAnswer(item);
  };

  const handleNext = () => {
    if (progress < 1) {
      setProgress(progress + 0.1);
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.questionArea}>
        <Text style={styles.questionAreaText}>Q2. {quize.question}</Text>
      </View>

      <FlatList
        data={[quize.correct_answer, ...quize.incorrect_answers]}
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
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext} // Nextボタンを押すと進捗が更新される
        >
          <Text style={styles.nextButtonText}>→Next</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%' }}>
        <Progress.Bar
          width={null} // Set width to null to allow it to expand to container's width
          height={10}
          progress={progress} // Reflect progress
          color={progress === 1 ? 'red' : 'blue'}
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
});
