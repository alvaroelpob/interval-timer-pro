import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Newinterval from './components/newinterval';
import Saved from './components/saved';
import Settings from './components/settings';

import Plus from './assets/svg/plus';
import Bookmark from './assets/svg/bookmark';
import Gear from './assets/svg/gear';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Crear') {
              return <Plus gray={!focused}/>
            } else if (route.name === 'Guardados') {
              return <Bookmark gray={!focused} />
            } else if (route.name === "Configuración") {
              return <Gear gray={!focused}/>
            }

          },
        })}>
        <Tab.Screen name="Crear" component={Newinterval} />
        <Tab.Screen name="Guardados" component={Saved} />
        <Tab.Screen name="Configuración" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}