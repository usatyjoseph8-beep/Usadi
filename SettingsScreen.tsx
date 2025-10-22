import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

export default function SettingsScreen(){
  const [api, setApi] = React.useState((Constants.expoConfig?.extra as any)?.apiBase || 'https://api.usadi.app');
  function save(){ Alert.alert('Info','Change the API in app.json extra.apiBase and rebuild.'); }
  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:22, fontWeight:'700'}}>Settings</Text>
      <Text style={{marginTop:12}}>Backend API base URL</Text>
      <TextInput value={api} onChangeText={setApi} style={{borderWidth:1, padding:8}} />
      <View style={{height:8}}/>
      <Button title="Save" onPress={save} />
    </View>
  );
}
