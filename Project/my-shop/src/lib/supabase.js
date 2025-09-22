// supabase.js
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ofzxkfemmrstloashnre.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY; // put your anon key in .env
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
