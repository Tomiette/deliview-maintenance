create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null check (char_length(nom) between 2 and 120),
  enseigne text not null check (char_length(enseigne) between 2 and 160),
  telephone text not null,
  email text not null,
  nombre_restaurants text not null check (nombre_restaurants in ('1','2-5','6-20','21-100','100+')),
  utm_source text, utm_medium text, utm_campaign text, utm_content text,
  page_origine text, section_cta text,
  statut text not null default 'nouveau' check (statut in ('nouveau','contacte','demo_planifiee','demo_faite','pilote','perdu'))
);

create index leads_email_enseigne_created_at_idx on public.leads (email, enseigne, created_at desc);

alter table public.leads enable row level security;
-- Aucune policy pour le rôle anon : seule la fonction serveur (service_role) écrit et lit.
