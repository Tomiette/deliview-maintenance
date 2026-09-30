create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null check (char_length(nom) between 2 and 120),
  restaurant text not null check (char_length(restaurant) between 2 and 160),
  ville text not null check (char_length(ville) between 2 and 120),
  telephone text not null,
  email text not null,
  points_de_vente text not null check (points_de_vente in ('1','2-5','6-10','11-19','20+')),
  utm_source text, utm_medium text, utm_campaign text, utm_content text,
  page_origine text, section_cta text,
  statut text not null default 'nouveau' check (statut in ('nouveau','contacte','demo_planifiee','demo_faite','pilote','perdu'))
);

create index leads_email_restaurant_created_at_idx on public.leads (email, restaurant, created_at desc);

alter table public.leads enable row level security;
-- Aucune policy pour le rôle anon : seule la fonction serveur (service_role) écrit et lit.
