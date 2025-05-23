import { StyleSheet } from 'react-native';
import { COLORS } from './constants';

export const globalStyles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 80,
  },
  sectionHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.TEXT,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 28,
    height: 28,
    margin: 8,
  },
});
