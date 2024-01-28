
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import UserForm from "./components/UserForm";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={({ navigation }) => {
            return {
              title: "Usuários Registrados",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("UserForm")}
                  type="clear"
                  icon={<Icon name="add" size={25} color="white" />}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            title: "Dados do Usuário",
          }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{
            title: "Formulário",
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: "#336699",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
