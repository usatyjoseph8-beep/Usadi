import React from 'react';
import { View, Text, ScrollView, RefreshControl, Button } from 'react-native';
import { dailyPlaybook } from '../lib/api';

export default function DashboardScreen(){
  const [data,setData]=React.useState<any>(null);
  const [loading,setLoading]=React.useState(false);

  async function load(){
    setLoading(true);
    try{ const d = await dailyPlaybook(); setData(d); } finally { setLoading(false); }
  }
  React.useEffect(()=>{ load(); }, []);

  return (
    <ScrollView style={{padding:16}} refreshControl={<RefreshControl refreshing={loading} onRefresh={load}/> }>
      <Text style={{fontSize:22, fontWeight:'700'}}>Today's Playbook</Text>
      <View style={{marginTop:12}}>
        <Text>Mean P/L: ${Number(data?.projection?.mean_pnl||0).toFixed(2)}</Text>
        <Text>P(>0): {Number(data?.projection?.prob_positive||0).toFixed(2)}</Text>
      </View>
      <View style={{marginTop:12}}>
        <Text style={{fontWeight:'600'}}>Events:</Text>
        {(data?.events||[]).map((e:any, i:number)=> (<Text key={i}>• [{e.time}] {e.action}</Text>))}
      </View>
      <View style={{marginTop:12}}>
        <Text style={{fontWeight:'600'}}>Narrative:</Text>
        <Text>{data?.narrative}</Text>
      </View>
      <View style={{height:16}}/>
      <Button title="Refresh" onPress={load} />
    </ScrollView>
  );
}
