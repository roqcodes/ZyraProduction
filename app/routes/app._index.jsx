import { useEffect, useState } from 'react';

// Inline styles
const styles = {
  dashboard: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '32px 24px',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    // boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
    background: 'linear-gradient(90deg, #4a6cf7, #3a5bd9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  section: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '24px',
    // boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.1)', 
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: '0 0 24px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    color: '#1a1a1a',
  },
  button: {
    background: '#4a6cf7',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(74, 108, 247, 0.3)',
  },
  buttonHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 16px rgba(74, 108, 247, 0.4)',
  },
  buttonDisabled: {
    opacity: '0.7',
    cursor: 'not-allowed',
  },
  previewContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    margin: '16px 0',
  },
  previewOption: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  },
  previewOptionSelected: {
    border: '2px solid #4a6cf7',
    boxShadow: '0 10px 25px rgba(74, 108, 247, 0.2)',
    transform: 'translateY(-2px)',
  },
  previewImage: {
    width: '100%',
    height: '200px',
    borderRadius: '12px',
    objectFit: 'cover',
    marginBottom: '16px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    transition: 'transform 0.3s ease',
  },
  characterName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '12px 0 4px',
    color: '#1a1a1a',
  },
  characterRole: {
    fontSize: '14px',
    color: '#4a5568',
    marginBottom: '20px',
  },
}

function Dashboard() {
  const [stats, setStats] = useState({
    totalChats: 0,
    activeSessions: 0,
    avgResponseTime: '0s',
    customerSatisfaction: '0%'
  });

  // In a real app, you would fetch these stats from your API
  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      // Replace with actual API call
      setTimeout(() => {
        setStats({
          totalChats: 1243,
          activeSessions: 27,
          avgResponseTime: '24s',
          customerSatisfaction: '92%'
        });
      }, 500);
    };

    fetchStats();
  }, []);

  const [selectedFab, setSelectedFab] = useState('default');
  const [selectedChat, setSelectedChat] = useState('default');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [shop, setShop] = useState(null);
  
  // Fetch saved preferences when component mounts
  useEffect(() => {
    // This code runs only on the client side
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const shopParam = urlParams.get('shop');
      setShop(shopParam);
      
      if (!shopParam) {
        console.error('No shop parameter found in URL');
        setIsLoading(false);
        return;
      }
      
      const fetchPreferences = async () => {
        try {
          const response = await fetch(`/api/get-preferences?shop=${encodeURIComponent(shopParam)}`);
          const result = await response.json();
          
          if (result.success && result.data) {
            setSelectedFab(result.data.fabStyle || 'default');
            setSelectedChat(result.data.chatStyle || 'default');
          }
        } catch (error) {
          console.error('Error fetching preferences:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchPreferences();
    }
  }, []);
  
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '16px',
        color: '#6d7175'
      }}>
        Loading preferences...
      </div>
    );
  }

  const savePreferences = async () => {
    try {
      setIsSaving(true);
      
      // Get shop from state (already set in useEffect)
      if (!shop) {
        console.error('No shop parameter available');
        throw new Error('Could not determine shop domain. Please refresh the page and try again.');
      }
      
      // Map the position to the corresponding character name
      const characterMap = {
        left: 'alessandro',
        right: 'zoey'
      };
      
      const characterId = characterMap[selectedFab] || 'zoey';
      
      console.log('Saving character preference for shop:', shop, characterId);
      
      const response = await fetch('/api/save-theme-preferences', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          shop,
          selectedCharacter: characterId
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error('Failed to save character preference:', result);
        throw new Error(result.error || 'Failed to save character preference');
      }
      
      console.log('Save successful:', result);
      alert('Character selected successfully!');
    } catch (error) {
      console.error('Error saving character preference:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Shop Assistant Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: '500', color: '#4a5568' }}>Admin</span>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4a6cf7, #3a5bd9)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(74, 108, 247, 0.3)'
          }}>
            A
          </div>
          
        </div>
        
      </header>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Quick Actions
          <span style={styles.sectionTitleAfter}></span>
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '16px'
        }}>
          <button 
            className="btn-primary"
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
              <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99045 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.20871 19.5576 4.44239 17.7913 5.38285 16.2478C5.99045 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99045 8.74926 5.38285 7.75218C4.44239 6.2087 6.20871 4.44239 7.75219 5.38285C8.74926 5.99045 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Customize Responses
          </button>
          <button 
            style={{
              ...styles.button,
              background: 'rgba(255, 255, 255, 0.7)',
              color: '#4a6cf7',
              border: '1px solid rgba(74, 108, 247, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(74, 108, 247, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
              <path d="M3 3V17C3 18.1046 3.89543 19 5 19H21M21 19L17.5 15.5M21 19L17.5 22.5M21 7V13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View Analytics
          </button>
          <button 
            style={{
              ...styles.button,
              background: 'transparent',
              color: '#4a6cf7',
              border: '1px solid rgba(74, 108, 247, 0.5)',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(74, 108, 247, 0.05)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
              <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99045 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.20871 19.5576 4.44239 17.7913 5.38285 16.2478C5.99045 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99045 8.74926 5.38285 7.75218C4.44239 6.2087 6.20871 4.44239 7.75219 5.38285C8.74926 5.99045 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Settings
          </button>
        </div>
      </div>

{/* CUSTOMIZE */}


      <div style={{
      ...styles.section,
      background: selectedFab === 'left' 
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)' 
        : 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffb3b3 100%)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      height: '550px',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: selectedFab === 'left' 
        ? '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
        : '0 20px 40px rgba(255, 107, 107, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: selectedFab === 'left' 
          ? `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)`
          : `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
             radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
        transition: 'all 0.8s ease'
      }} />
      
      {/* Floating Decorative Elements */}
      {selectedFab === 'left' && (
        <>
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '4px',
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)',
            transform: 'rotate(45deg)',
            animation: 'float 6s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            width: '2px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent)',
            transform: 'rotate(-30deg)',
            animation: 'float 8s ease-in-out infinite reverse'
          }} />
        </>
      )}
      
      {selectedFab === 'right' && (
        <>
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
            animation: 'bounce 4s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '12%',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'bounce 6s ease-in-out infinite reverse'
          }} />
        </>
      )}

      <h2 style={{
        ...styles.sectionTitle,
        fontSize: selectedFab === 'left' ? '32px' : '28px',
        fontWeight: selectedFab === 'left' ? '200' : '600',
        letterSpacing: selectedFab === 'left' ? '2px' : '0.5px',
        color: selectedFab === 'left' ? '#ffffff' : '#ffffff',
        textAlign: 'center',
        marginBottom: '10px',
        fontFamily: selectedFab === 'left' 
          ? "'Cormorant Garamond', 'Times New Roman', serif" 
          : "'Poppins', 'Inter', sans-serif",
        textShadow: selectedFab === 'left' 
          ? '0 2px 4px rgba(0, 0, 0, 0.5)' 
          : '0 2px 4px rgba(255, 107, 107, 0.3)',
        transition: 'all 0.6s ease',
        position: 'relative',
        zIndex: 2
      }}>
        Choose Your Assistant
      </h2>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '32px 0',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Left Navigation Button */}
        <button 
          style={{
            ...styles.button,
            minWidth: '56px',
            minHeight: '56px',
            borderRadius: '50%',
            padding: '0',
            background: selectedFab === 'left' 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: selectedFab === 'left' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: selectedFab === 'left' 
              ? '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
              : '0 8px 24px rgba(255, 107, 107, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)',
            ':hover': {
              transform: 'scale(1.05)',
              boxShadow: selectedFab === 'left' 
                ? '0 12px 32px rgba(0, 0, 0, 0.4)' 
                : '0 12px 32px rgba(255, 107, 107, 0.3)'
            }
          }}
          onClick={() => setSelectedFab('left')}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Character Display Container */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '48px',
          padding: '0 64px',
          height: '300px',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Character Image */}
          <div style={{ 
            width: '240px',
            height: '360px',
            borderRadius: selectedFab === 'left' ? '8px' : '24px',
            overflow: 'hidden',
            border: selectedFab === 'left' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '3px solid rgba(255, 255, 255, 0.3)',
            boxShadow: selectedFab === 'left' 
              ? '0 16px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
              : '0 16px 32px rgba(255, 107, 107, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            position: 'relative',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)',
            ':hover': {
              transform: 'scale(1.02)'
            }
          }}>
            <img 
              src={`app/public/characters/images/${selectedFab === 'left' ? 'C1.png' : 'C2.png'}`} 
              alt="Assistant" 
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'all 0.8s ease',
                filter: selectedFab === 'left' 
                  ? 'contrast(1.1) brightness(0.95)' 
                  : 'contrast(1.05) brightness(1.05) saturate(1.1)'
              }} 
            />
            
            {/* Character Image Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: selectedFab === 'left' 
                ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%)'
                : 'linear-gradient(to bottom, rgba(255, 107, 107, 0) 0%, rgba(255, 107, 107, 0.1) 100%)',
              transition: 'all 0.8s ease'
            }} />
          </div>
          
          {/* Character Information */}
          <div style={{ 
            minWidth: '320px',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <h3 style={{ 
              fontSize: selectedFab === 'left' ? '36px' : '32px',
              fontWeight: selectedFab === 'left' ? '300' : '700',
              color: '#ffffff',
              textAlign: 'left',
              marginBottom: '24px',
              fontFamily: selectedFab === 'left' 
                ? "'Cormorant Garamond', 'Times New Roman', serif" 
                : "'Poppins', 'Inter', sans-serif",
              letterSpacing: selectedFab === 'left' ? '1px' : '0.5px',
              transition: 'all 0.6s ease',
              textShadow: selectedFab === 'left' 
                ? '0 2px 4px rgba(0, 0, 0, 0.5)' 
                : '0 2px 4px rgba(255, 107, 107, 0.3)'
            }}>
              {selectedFab === 'left' ? 'Alessandro' : 'Zoey'}
            </h3>
            
            {/* Character Badge */}
            <div style={{
              display: 'inline-block',
              padding: selectedFab === 'left' ? '6px 16px' : '8px 16px',
              borderRadius: selectedFab === 'left' ? '4px' : '20px',
              background: selectedFab === 'left' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.2)',
              border: selectedFab === 'left' 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : 'none',
              fontSize: '12px',
              fontWeight: selectedFab === 'left' ? '400' : '600',
              color: '#ffffff',
              letterSpacing: selectedFab === 'left' ? '1px' : '0.5px',
              marginBottom: '20px',
              fontFamily: selectedFab === 'left' 
                ? "'Cormorant Garamond', serif" 
                : "'Poppins', sans-serif",
              textTransform: selectedFab === 'left' ? 'uppercase' : 'none',
              transition: 'all 0.6s ease'
            }}>
              {selectedFab === 'left' ? 'LUXURY CONCIERGE' : 'Creative Companion'}
            </div>
            
            <p style={{ 
              fontSize: '16px',
              color: selectedFab === 'left' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              textAlign: 'left',
              maxWidth: '320px',
              lineHeight: '1.6',
              fontFamily: selectedFab === 'left' 
                ? "'Inter', sans-serif" 
                : "'Poppins', sans-serif",
              fontWeight: selectedFab === 'left' ? '300' : '400',
              transition: 'all 0.6s ease'
            }}>
              {selectedFab === 'left' ? 
                'An exclusive AI concierge delivering sophisticated solutions with unparalleled precision and discretion.' : 
                'Your vibrant AI companion ready to spark creativity and make every conversation delightfully engaging!'}
            </p>
            
            {/* Feature Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '24px'
            }}>
              {(selectedFab === 'left' 
                ? ['Precision', 'Sophisticated', 'Exclusive'] 
                : ['Creative', 'Playful', 'Energetic']
              ).map((feature, index) => (
                <span key={feature} style={{
                  padding: selectedFab === 'left' ? '4px 12px' : '6px 14px',
                  fontSize: '11px',
                  fontWeight: selectedFab === 'left' ? '400' : '500',
                  color: selectedFab === 'left' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  background: selectedFab === 'left' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.15)',
                  borderRadius: selectedFab === 'left' ? '2px' : '12px',
                  border: selectedFab === 'left' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  letterSpacing: selectedFab === 'left' ? '0.5px' : '0px',
                  fontFamily: selectedFab === 'left' 
                    ? "'Inter', sans-serif" 
                    : "'Poppins', sans-serif",
                  transition: 'all 0.6s ease',
                  animationDelay: `${index * 0.1}s`
                }}>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Navigation Button */}
        <button 
          style={{
            ...styles.button,
            minWidth: '56px',
            minHeight: '56px',
            borderRadius: '50%',
            padding: '0',
            background: selectedFab === 'right' 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
              : selectedFab === 'left' 
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            border: selectedFab === 'left' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: selectedFab === 'left' 
              ? '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
              : '0 8px 24px rgba(255, 107, 107, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)',
            ':hover': {
              transform: 'scale(1.05)',
              boxShadow: selectedFab === 'left' 
                ? '0 12px 32px rgba(0, 0, 0, 0.4)' 
                : '0 12px 32px rgba(255, 107, 107, 0.3)'
            }
          }}
          onClick={() => setSelectedFab('right')}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Select Button */}
      <button 
        style={{
          ...styles.button,
          background: selectedFab === 'left' 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
            : 'linear-gradient(135deg, #ff8e8e 0%, #ff6b6b 100%)',
          color: '#ffffff',
          padding: '16px 48px',
          display: 'block',
          margin: '32px auto',
          borderRadius: selectedFab === 'left' ? '8px' : '24px',
          border: selectedFab === 'left' 
            ? '1px solid rgba(255, 255, 255, 0.2)' 
            : 'none',
          boxShadow: selectedFab === 'left' 
            ? '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
            : '0 8px 24px rgba(255, 107, 107, 0.3)',
          fontSize: '16px',
          fontWeight: selectedFab === 'left' ? '400' : '600',
          letterSpacing: selectedFab === 'left' ? '1px' : '0.5px',
          fontFamily: selectedFab === 'left' 
            ? "'Cormorant Garamond', serif" 
            : "'Poppins', sans-serif",
          textTransform: selectedFab === 'left' ? 'uppercase' : 'none',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          zIndex: 2, 
        }}
        onClick={savePreferences}
      >
        {selectedFab === 'left' ? 'SELECT ALESSANDRO' : 'Choose Zoey'}
      </button>
      
      <style jsx>{"`\n        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');\n\n        @keyframes float {\n          0%, 100% { transform: translateY(0px) rotate(45deg); }\n          50% { transform: translateY(-10px) rotate(45deg); }\n        }\n        \n        @keyframes bounce {\n          0%, 100% { transform: translateY(0px); }\n          50% { transform: translateY(-8px); }\n        }\n      `"}</style>
    </div>
    </div>
  );
}     

export default Dashboard;