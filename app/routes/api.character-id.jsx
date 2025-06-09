import { json } from '@remix-run/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');

    if (!shop) {
      return json({ error: 'Shop parameter is required' }, { status: 400 });
    }

    // Fetch character_id from the shop table
    const { data, error } = await supabase
      .from('shop')
      .select('character_id')
      .eq('shop', shop)
      .single();

    if (error) {
      console.error('Error fetching character ID:', error);
      return json({ error: 'Failed to fetch character ID' }, { status: 500 });
    }

    if (!data) {
      return json({ error: 'Shop not found' }, { status: 404 });
    }

    return json({ characterId: data.character_id });
  } catch (error) {
    console.error('Error in character ID endpoint:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}
