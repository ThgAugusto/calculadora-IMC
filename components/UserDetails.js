import {Text, View, SafeAreaView, StyleSheet, Button, Alert} from "react-native";
  
  import { useState } from "react";
  
  import { deleteDoc, doc } from "firebase/firestore";
  import { db } from "./firebase";
  
  export default function UserDetails(props) {
    const [usuario, setUsuario] = useState(
      props.route.params ? props.route.params : {}
    );
  
    const calcularIMC = (usuario) => {
      return parseFloat((parseFloat(usuario.peso) / parseFloat(usuario.altura ** 2)).toFixed(2));
    };
  
    const classificacao = (usuario) => {
      const imc = calcularIMC(usuario);
  
      if (imc <= 18.5) {
        return "Abaixo do peso";
      } else if (imc >= 18.5 && imc < 25) {
        return "Peso normal";
      }
      else if (imc >= 25 && imc < 30){
        return "Sobrepeso"
      } else if (imc >= 30 && imc < 35){
        return "Obesidade grau 1"
      } else if (imc >= 35 && imc < 40){
        return "Obesidade grau 2"
      }
      else if (imc >= 40){
        return "Obesidade grau 3"
      }
      
    };
  
    const handleExcluirusuario = async () => {
      try {
        // Excluir o usuario do Firestore usando o ID do usuario
        await deleteDoc(doc(db, "users", usuario.id));
        Alert.alert("usuário excluído com sucesso");
        props.navigation.navigate("UserList", usuario);
      } catch (error) {
        console.error("Erro ao excluir usuário: ", error);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textoPadrao}>Nome: {usuario.nome}</Text>
        <Text style={styles.textoPadrao}>Idade: {usuario.idade}</Text>
        <Text style={styles.textoPadrao}>Peso: {usuario.peso}</Text>
        <Text style={styles.textoPadrao}>Altura: {usuario.altura}</Text>
        <Text style={styles.textoPadrao}>sexo: {usuario.sexo}</Text>
        <Text style={styles.textoPadrao}>Cidade: {usuario.cidade}</Text>
        <Text style={styles.textoPadrao}>IMC: {calcularIMC(usuario)}</Text>
        <Text style={[styles.textoPadrao, styles.textoDestaque]}>
          Classificação: {classificacao(usuario)}
        </Text>
        <View style={styles.fixToText}>
          <Button
            title="Editar"
            onPress={() => props.navigation.navigate("UserForm", usuario)}
          />
          <Text> </Text>
          <Button
            title="Excluir"
            onPress={() =>
              Alert.alert("Confirmação", "Deseja realmente excluir este usuario?", [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: () => handleExcluirusuario() },
              ])
            }
            color="red"
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
    textoPadrao: {
      fontSize: 20,
      padding: 10,
    },
    textoDestaque: {
      fontWeight: "bold",
    },
    botao: {
      margin: 10,
    },
    fixToText: {
      flexDirection: "row",
      justifyContent: "flex-start",
      margin: 10,
    },
  });
  