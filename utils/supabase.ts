import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://iwthzkkvsxxkhjkxdbsy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dGh6a2t2c3h4a2hqa3hkYnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMTM0NDcsImV4cCI6MjA2MzU4OTQ0N30.HkcG7kz2Ab9aIFd0ursXbw05X3Gxo-bi5ualDkvn-cI"
);
