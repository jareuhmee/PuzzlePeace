import { TextInput, View } from "react-native";
import { defaultStyles } from "../../constants/Styles";

export default function CreateResolution() {
  return (
    <View style={defaultStyles.container}>
      <TextInput
        style={defaultStyles.input}
        placeholder="Create resolution..."
      />
    </View>
  );
}
