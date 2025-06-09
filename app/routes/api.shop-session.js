import { json } from "@remix-run/node";

export async function loader({ context }) {
  try {
    // Get the shop from the session
    const session = await context.session;
    const shop = session?.shop;
    
    if (!shop) {
      return json(
        { error: 'No shop found in session' },
        { status: 400 }
      );
    }
    
    return json({ shop });
    
  } catch (error) {
    console.error('Error getting shop session:', error);
    return json(
      { 
        error: 'Failed to get shop session',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      },
      { status: 500 }
    );
  }
}
