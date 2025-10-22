import React from 'react';
import { View, Text, ScrollView, Switch, RefreshControl } from 'react-native';
import { listStrategies, toggleStrategy } from '../lib/api';

export default function StrategiesScreen(){
  const [items,setItems]=React.useState<any[]>([]);
  const [loading,setLoading]=React.useState(false);
  async function load(){ setLoading(true); try{ setItems(await listStrategies()); } finally{ setLoading(false);} }
  React.useEffect(()=>{ load(); }, []);
  async function flip(id:string, v:boolean){
    await toggleStrategy(id, v);
    setItems(s=> s.map(it=> it.id===id? {...it, enabled:v}: it));
  }
  return (
    <ScrollView style={{padding:16}} refreshControl={<RefreshControl refreshing={loading} onRefresh={load}/> }>
      <Text style={{fontSize:22, fontWeight:'700'}}>Strategies</Text>
      <View style={{height:8}}/>
      {items.map((s:any)=>(
        <View key={s.id} style={{padding:12, borderWidth:1, borderRadius:8, marginBottom:10}}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{fontSize:16, fontWeight:'600'}}>{s.name}</Text>
            <Switch value={s.enabled} onValueChange={v=>flip(s.id, v)} />
          </View>
          <Text>{s.description}</Text>
          <Text>Risk Profile: {s.risk_profile}</Text>
          <Text>Greeks Caps: Δ {s.delta_cap} | ν {s.vega_cap}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
