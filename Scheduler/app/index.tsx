import { View, Button } from "react-native";
import { promptAuthorization } from "./schoology/test";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Authorize" onPress={promptAuthorization}/>
    </View>
  );
}
