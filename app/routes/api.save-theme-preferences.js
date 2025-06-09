import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function action({ request }) {
  try {
    // Parse request body
    const { shop, selectedCharacter } = await request.json();
    
    // Validate input
    if (!shop) {
      return json(
        { success: false, error: 'Shop domain is required' },
        { status: 400 }
      );
    }
    
    if (!selectedCharacter) {
      return json(
        { success: false, error: 'Please select a character' },
        { status: 400 }
      );
    }
    
    let fab_style, chat_style;
    if (selectedCharacter === 'alessandro') {
      fab_style = 'minimal';
      chat_style = 'minimal';
    } else if (selectedCharacter === 'zoey') {
      fab_style = 'floating';
      chat_style = 'floating';
    }

    // Prepare data for Supabase
    const shopData = {
      shop,
      character_id: selectedCharacter,
      updated_at: new Date().toISOString(),
      fab_style:fab_style,
      chat_style:chat_style,
    };
    
    // Upsert data into shop table
    const { data, error } = await supabase
      .from('shop')
      .upsert(shopData, { onConflict: 'shop' })
      .select();
    
    if (error) throw error;
    
    return json({ 
      success: true, 
      message: 'Character preference updated successfully',
      data: data[0]
    });
    
  } catch (error) {
    console.error('Error saving character preference:', error);
    return json(
      { 
        success: false, 
        error: error.message || 'Failed to save character preference',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
      { status: 500 }
    );
  }
}