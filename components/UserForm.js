import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Button} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function UserForm({ route, navigation }) {
  let editando = route.params ? true : false;
  const [usuario, setUsuario] = useState(route.params ? route.params : {});

  const gerencia = async () => {
    try {
      if (editando) {
        // Modo de edição, atualizar o documento existente
        await updateDoc(doc(db, "users", usuario.id), {
          nome: usuario.nome,
          idade: usuario.idade,
          peso: usuario.peso,
          altura: usuario.altura,
          sexo: usuario.sexo,
          cidade: usuario.cidade,
        });
        alert("Usuário atualizado com sucesso!");
      } else {
        // Modo de criação, adicionar um novo documento
        await addDoc(collection(db, "users"), {
          nome: usuario.nome,
          idade: usuario.idade,
          peso: usuario.peso,
          altura: usuario.altura,
          sexo: usuario.sexo,
          cidade: usuario.cidade,
        });
        alert("Usuário criado com sucesso!");
      }

      navigation.navigate("UserList", usuario);
    } catch (e) {
      alert("Erro ao salvar o usuário!", "Verifique se preencheu todos os campos.");
      console.error("Deu erro: ", e);
    }
  };

  return (
    <View style={style.form}>
      <Text>Nome</Text>
      <TextInput
        style={style.input}
        onChangeText={(nome) => setUsuario({ ...usuario, nome })}
        placeholder="Informe o nome"
        value={usuario.nome}
      />

      <Text>Idade</Text>
      <TextInput
        style={style.input}
        onChangeText={(idade) => setUsuario({ ...usuario, idade })}
        placeholder="Idade"
        value={usuario.idade}
        keyboardType="numeric"
      />

      <Text>Peso</Text>
      <TextInput
        style={style.input}
        onChangeText={(peso) => setUsuario({ ...usuario, peso })}
        placeholder="Peso em kg"
        value={usuario.peso}
        keyboardType="numeric"
      />

      <Text>Altura</Text>
      <TextInput
        style={style.input}
        onChangeText={(altura) => setUsuario({ ...usuario, altura })}
        placeholder="Altura em metros"
        value={usuario.altura}
        keyboardType="numeric"
      />
      <Text style={style.label}>Sexo:</Text>
      <RNPickerSelect
        placeholder={{
          label: 'Selecione o gênero',
          value: null,
        }}
        onValueChange={(sexo) => setUsuario({...usuario, sexo})}
        items={[
          { label: 'Masculino', value: 'masculino' },
          { label: 'Feminino', value: 'feminino' },
        ]}
      />
       <Text>Cidade</Text>
      <TextInput
        style={style.input}
        onChangeText={(cidade) => setUsuario({ ...usuario, cidade })}
        placeholder="Cidade"
        value={usuario.cidade}
      />

      <Button title="Salvar" onPress={() => gerencia()} />
    </View>
  );
}

const style = StyleSheet.create({
  form: {
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 5,
    padding: 10,
  },
});
