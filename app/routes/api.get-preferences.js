import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');

    if (!shop) {
      return json(
        { success: false, error: 'Shop parameter is required' },
        { status: 400 }
      );
    }

    // Fetch preferences from Supabase
    const { data, error } = await supabase
      .from('shop')
      .select('fab_style, chat_style')
      .eq('shop', shop)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return json({
          success: true,
          data: null,
          message: 'No preferences found for this shop'
        });
      }
      throw error;
    }

    return json({
      success: true,
      data: data ? {
        fabStyle: data.fab_style || 'default',
        chatStyle: data.chat_style || 'default'
      } : null
    });

  } catch (error) {
    console.error('Error fetching preferences:', error);
    return json(
      { 
        success: false, 
        error: 'Failed to fetch preferences',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      },
      { status: 500 }
    );
  }
}
