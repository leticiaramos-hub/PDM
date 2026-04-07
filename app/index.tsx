import Botao from "@/components/Botao";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import { Button, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { nextId } from "../util/geral";

export default function Index() {
  const [nome, setNome] = useState('');
  const [lista, setLista] = useState([]);

  function adiciona(){
    if (nome.trim()) {
      setLista([...lista, {id: nextId(lista), nome: nome}]);
      setNome('');
    }
  }

  function remove(id) {
    setLista( lista.filter( item => item.id !== id ) );
  }

  function RenderItem({contato}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#dddddd',
          width: '100%',
          padding: 5,
          alignItems: 'center'
        }}
      >
        <Text style={{flex: 1}}>{contato.nome}</Text>
        <Button
          title="-"
          onPress={ () => remove(contato.id) }
        />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: 'white'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%'
        }}
      >
        <TextInput
          placeholder="Digite um nome ..."
          value={nome}
          onChangeText={ t => setNome(t)}
          style={{
            flex: 1,
            borderWidth: 1,
            padding: 5
          }}
        />
        <Pressable 
          onPress={ adiciona }
        >
          <AntDesign name="plus-circle" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList
        data={lista}
        renderItem={ ({item}) => <RenderItem contato={item} /> }
        ItemSeparatorComponent={ () => <View style={{ height: 2 }} />}
        style={{
          width: '100%'
        }}
      />
      <Botao
        title="Limpar lista"
        onPress={ () => setLista([])}
        color="#0000ff"
        textColor="#ffffff"
        style={{ fontWeight: 'bold', marginBottom: 20}}
      />
    </View>
  );
}