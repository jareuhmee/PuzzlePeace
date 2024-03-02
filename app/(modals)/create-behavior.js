import { TextInput, View } from "react-native";
import { defaultStyles } from "../../constants/Styles";

export default function CreateBehavior() {
  return (
    <View style={defaultStyles.container}>
      <TextInput style={defaultStyles.input} placeholder="Create behavior..." />
    </View>
  );
}
