import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import BadgerNewsScreen from "./screens/BadgerNewsScreen"
import SpecificArticleScreen  from "./screens/SpecificArticleScreen";
const BadgerStack = createNativeStackNavigator();
export default function BadgerNewsStack(props){
return<>

    <BadgerStack.Navigator>
        <BadgerStack.Screen name = "Articles" component ={BadgerNewsScreen}/>
         <BadgerStack.Screen name = "Article" component ={SpecificArticleScreen}></BadgerStack.Screen> 

    </BadgerStack.Navigator>

</>
}