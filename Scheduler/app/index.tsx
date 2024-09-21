import { Text, View, Button } from "react-native";
import { test } from "./schoology/test";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Button"
      onPress={test}
      />
    </View>
  );
}
