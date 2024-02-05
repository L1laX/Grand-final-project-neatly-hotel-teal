import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://ppfpndjicdaxjtvgtlxw.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabaseneung = createClient(supabaseURL, supabaseKey);
