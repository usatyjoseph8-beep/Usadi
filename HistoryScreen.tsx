import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { history } from '../lib/api';

export default function HistoryScreen(){
  const [data,setData]=React.useState<any>({summary:{}, chart:[], users:[]});
  const [loading,setLoading]=React.useState(false);
  async function load(){ setLoading(true); try{ setData(await history()); } finally{ setLoading(false); } }
  React.useEffect(()=>{ load(); }, []);
  return (
    <ScrollView style={{padding:16}} refreshControl={<RefreshControl refreshing={loading} onRefresh={load}/> }>
      <Text style={{fontSize:22, fontWeight:'700'}}>History (48h)</Text>
      <Text>Total P/L: ${Number(data.summary?.total_pl||0).toFixed(2)}</Text>
      <View style={{marginTop:12}}>
        <Text style={{fontWeight:'600'}}>Users:</Text>
        {data.users.map((u:any)=>(<Text key={u.user_id}>• {u.user_id}: {Number(u.pl_sum||0).toFixed(2)}</Text>))}
      </View>
    </ScrollView>
  );
}
