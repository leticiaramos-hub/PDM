import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Index() {
  const [nome, setNome] = useState('');
  const [lista, setLista] = useState([]);

  function adiciona(){
    setLista([...lista, {nome: nome}]);
  }

  function remove(nome) {
    setLista( lista.filter( item => item.nome !== nome ) );
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
          onPress={ () => remove(contato.nome) }
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
        <Button 
          title="+"
          onPress={ adiciona }
        />
      </View>
      <FlatList
        data={lista}
        renderItem={ ({item}) => <RenderItem contato={item} /> }
        ItemSeparatorComponent={ () => <View style={{ height: 2 }} />}
        style={{
          width: '100%'
        }}
      />
    </View>
  );
}