import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { beginTdOAuth, setToken } from '../lib/auth';
import { exchangeTdCode } from '../lib/api';

export default function LoginScreen({ navigation }: any){
  React.useEffect(()=>{
    const sub = Linking.addEventListener('url', async ({ url }) => {
      const parsed = Linking.parse(url);
      if(parsed?.queryParams?.code){
        const code = String(parsed.queryParams.code);
        try{
          const res = await exchangeTdCode(code);
          await setToken(res.jwt);
          navigation.replace('Root');
        }catch(e:any){
          Alert.alert('Login failed', e.message || 'Unknown error');
        }
      }
    });
    return ()=>{ sub.remove(); };
  }, []);

  async function login(){
    try{ await beginTdOAuth(); }catch(e:any){ Alert.alert('Error', e.message || 'Could not start login'); }
  }

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', padding:24}}>
      <Text style={{fontSize:24, fontWeight:'600'}}>USADI</Text>
      <Text style={{marginVertical:8, textAlign:'center'}}>Sign in with your broker to enable trading features.</Text>
      <Button title="Continue with TD Ameritrade" onPress={login} />
    </View>
  );
}
