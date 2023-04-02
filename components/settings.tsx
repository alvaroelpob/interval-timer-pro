import { ScrollView, View, Text } from "react-native";

export default function Settings() {
  return (
    <ScrollView>
      <View>
        <Text>Version 0.0.0</Text>
      </View>
      <View>
        <Text>Sonido</Text>
        <View>
          <Text> - Preparación</Text>
          <Text> - Activo:</Text>
          <Text> - Descanso:</Text>
          <Text> - Descanso entre series:</Text>
        </View>
      </View>
    </ScrollView>
  )
}