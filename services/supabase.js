import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wvetfxilqqjxdknebwli.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZXRmeGlscXFqeGRrbmVid2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODg1NTMsImV4cCI6MjA4NzU2NDU1M30.ghsAy7_u4b9R2MjENftU9JHlQtZnGU9QIn7QV1fauuI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
