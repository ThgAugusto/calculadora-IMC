import { FlatList, View } from "react-native";
import { ListItem } from "react-native-elements";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";

export default function UserList({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    const userList = [];
    querySnapshot.forEach((doc) => {
      userList.push({
        id: doc.id,
        nome: doc.data().nome,
        idade: doc.data().idade,
        altura: doc.data().altura,
        peso: doc.data().peso,
        sexo: doc.data().sexo,
        cidade: doc.data().cidade
      });
    });

    setUsers(userList);
  };

  useEffect(() => {
    getUsers();
    console.log("Executou a atualização da lista");
  }, [route.params]);

  const renderusuarioItem = ({ item: usuario }) => (
    <ListItem
      key={usuario.id}
      bottomDivider
      onPress={() => navigation.navigate("UserDetails", usuario)}
    >
      <ListItem.Content>
        <ListItem.Title>{usuario.nome}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(usuario) => usuario.id}
        renderItem={renderusuarioItem}
      />
    </View>
  );
}
