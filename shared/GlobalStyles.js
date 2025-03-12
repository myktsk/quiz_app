import { StyleSheet } from "react-native";
import { COLORS } from "./constants";

export const globalStyles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  sectionHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.TEXT,
  },
});
