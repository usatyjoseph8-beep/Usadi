import axios from 'axios';
import { API_BASE } from './config';
import { getToken } from './auth';

const client = axios.create({ baseURL: API_BASE });

client.interceptors.request.use(async (cfg) => {
  const t = await getToken();
  if(t){ cfg.headers = cfg.headers || {}; (cfg.headers as any)['Authorization'] = `Bearer ${t}`; }
  return cfg;
});

export async function startTdLogin(){ const resp = await client.get('/auth/td/login'); return resp.data; }
export async function exchangeTdCode(code: string){ const resp = await client.post('/auth/td/callback', { code }); return resp.data; }
export async function dailyPlaybook(){ const { data } = await client.post('/daily_playbook', { portfolio:[{type:'EQUITY', symbol:'AAPL', price:180, position:10}], prices:{} }); return data; }
export async function history(hours=48){ const { data } = await client.get('/canary/report', { params: { hours } }); return data; }
export async function listStrategies(){ const { data } = await client.get('/strategies'); return data; }
export async function toggleStrategy(id: string, enabled: boolean){ const { data } = await client.patch(`/strategies/${id}`, { enabled }); return data; }
