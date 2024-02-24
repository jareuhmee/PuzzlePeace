import { TextInput, View } from "react-native";
import { defaultStyles } from "../../constants/Styles";

export default function CreateTrigger() {
  return (
    <View style={defaultStyles.container}>
      <TextInput style={defaultStyles.input} placeholder="Create trigger..." />
    </View>
  );
}
