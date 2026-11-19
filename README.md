# Alerta Cidadão

Aplicativo pensado em cima das mudanças climaticas que estão ocorrendo decorrente a vinda do el nino, script foi corrigido pelo claude 5.5 da anthropic, feito em cima de React + Vite + React Router, APIS usadas foram Open-Meteo Forecast, Open-Meteo Geocoding e Google Weather API alem de tambem supabase. O usuário escolhe uma cidade ou usa o GPS, e tudo (previsão, alertas, relatos) segue esse local.

## Rodar

```bash
npm install
npm run dev
```

Sem configurar nada já funciona: previsão real (Open-Meteo), busca de cidades, alertas de exemplo e relatos salvos no navegador.

## Ligar cada recurso

| Recurso | O que fazer | Sem isso |
|---|---|---|
| Previsão e busca de cidade | Nada. Ajuste limites em `src/config.js`. | - |
| Relatos compartilhados | Crie projeto no Supabase, rode `supabase/schema.sql`, copie `.env.example` para `.env` e preencha. | Relatos só no navegador |
| Alertas oficiais | Chave da Weather API do Google, deploy na Vercel, variável `GOOGLE_WEATHER_KEY`. Local: `vercel dev`. | Alertas de exemplo |

## Mapa dos arquivos

| Arquivo | Função | Mexa aqui para... |
|---|---|---|
| `src/config.js` | Números e limites | mudar limites de chuva/calor, raio, validade dos relatos, cidade inicial |
| `src/data.js` | Textos e listas | editar tipos de relato, guias, telefones, alertas de exemplo |
| `src/utils.js` | Cálculos puros | distância, "há 5 min", arredondar coordenadas |
| `src/LocationContext.jsx` | Local do usuário (GPS/cidade) | mudar como o local é guardado |
| `src/ReportsContext.jsx` | Relatos (Supabase ou navegador) | mudar filtros, raio ou o banco |
| `src/services/` | Chamadas a APIs | trocar de provedor (weather, alerts, geocode, supabase) |
| `src/hooks/` | Carregamento, erro e atualização | mudar frequência ou regras de atualização |
| `src/pages/` | Uma tela por arquivo | mudar o visual ou o conteúdo de uma tela |
| `src/components/` | Peças reutilizáveis | abas (`TabBar`), seletor de local, aviso (`Toast`) |
| `src/App.jsx` | Lista de rotas | adicionar ou remover páginas |
| `src/styles.css` | Cores e estilos | mudar o tema (variáveis no topo) |
| `api/alerts.js` | Função de servidor | trocar a fonte de alertas |
| `supabase/schema.sql` | Tabela e regras | mudar campos ou segurança |

## Fluxo dos dados

```
Usuário escolhe local → LocationContext (lat, lon)
   ├─ useWeather → services/weather.js → Open-Meteo → status na Home
   ├─ useAlerts  → services/alerts.js  → api/alerts.js → Google Weather API
   └─ ReportsContext → Supabase (ou localStorage) → aba "Perto de mim"
```
