import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eutvazwqlaoiadvnmffy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1dHZhendxbGFvaWFkdm5tZmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5OTk1MjgsImV4cCI6MjAyMjU3NTUyOH0.R9rG1e8xq20TU4xexwiDGu-xcDU0RUAWPh5SmzwVuJU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
