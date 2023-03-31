import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Newinterval from './components/newinterval';
import Saved from './components/saved';
import Settings from './components/settings';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Crear" component={Newinterval} />
        <Tab.Screen name="Guardados" component={Saved} />
        <Tab.Screen name="Configuracion" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}