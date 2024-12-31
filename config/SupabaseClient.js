import { createClient } from '@supabase/supabase-js';

// URL y clave pública del proyecto Supabase
const SUPABASE_URL = 'https://wslxisnooluphjdmctov.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbHhpc25vb2x1cGhqZG1jdG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTcxOTEsImV4cCI6MjA1MDg3MzE5MX0.oLhHyPjjhGCETtFneYPHxfGqpj8i09BHimMrJAHIltA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
