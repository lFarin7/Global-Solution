-- ainda sei muito pouco de SQL, então usei um pouco de IA para explicar como fazer 

create table public.reports (
  id         bigint generated always as identity primary key,
  type       text not null check (type in ('Alagamento','Deslizamento','Calor extremo','Queda de árvore','Sem energia','Outro')),
  text       text not null default '' check (char_length(text) <= 300),
  lat        double precision not null check (lat between -90 and 90),
  lon        double precision not null check (lon between -180 and 180),
  created_at timestamptz not null default now()
);

create index reports_recent_idx on public.reports (created_at desc);
create index reports_geo_idx on public.reports (lat, lon);

alter table public.reports enable row level security;

-- Qualquer pessoa pode ler e enviar. Ninguém pode editar ou apagar pelo app.
create policy "reports_read"   on public.reports for select using (true);
create policy "reports_insert" on public.reports for insert with check (true);

-- Permite atualizações em tempo real.
alter publication supabase_realtime add table public.reports;
