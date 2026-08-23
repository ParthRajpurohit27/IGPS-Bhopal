// Supabase configuration for IGPS Bhopal Student Data Portal
// This file loads the Supabase client using the public (publishable) key.
// The publishable/anon key is SAFE to expose in frontend code, as long as
// Row Level Security (RLS) is enabled on your tables in Supabase, so that
// only logged-in (authenticated) users can read the data.

const SUPABASE_URL = "https://ciqdppliqmpvwueofacl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_N73Wjtfp8ox6O0_O-znfZA_TtvVwurE";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
