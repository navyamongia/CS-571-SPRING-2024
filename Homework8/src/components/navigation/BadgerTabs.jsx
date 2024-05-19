import { Text } from "react-native";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import BadgerNewsStack from "../BadgerNewsStack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();

function BadgerTabs(props) {
    // console.log('hi')
    // console.log(props.tags);
    return <>
        {/* <Text style={{paddingTop: 128}}>Hello World! I should make this tabs instead.</Text> */}
        <Tab.Navigator>
      <Tab.Screen name="News" component={BadgerNewsStack} options={{headerShown: false}} />
      <Tab.Screen name="Preferences" component={BadgerPreferencesScreen } />
    </Tab.Navigator>
    
    </>
   
}

export default BadgerTabs;