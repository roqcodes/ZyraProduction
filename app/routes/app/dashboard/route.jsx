import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Character data
const characters = [
  {
    id: 'alessandro',
    name: 'Alessandro',
    description: 'An elegant Italian gentleman with a passion for luxury and fine details. Perfect for high-end stores.',
    image: '/characters/images/alessandro.gif',
    fabStyle: 'minimal',
    chatStyle: 'elegant',
    theme: {
      primary: '#2C3E50',
      secondary: '#E2B979',
      font: 'Playfair Display, serif',
    },
  },
  {
    id: 'zoey',
    name: 'Zoey',
    description: 'A friendly and energetic assistant who loves helping customers with enthusiasm and a big smile!',
    image: '/characters/images/zoey.gif',
    fabStyle: 'floating',
    chatStyle: 'modern',
    theme: {
      primary: '#6C63FF',
      secondary: '#FF6584',
      font: 'Inter, sans-serif',
    },
  },
  {
    id: 'max',
    name: 'Max',
    description: 'A tech-savvy professional who provides quick and efficient support with a modern touch.',
    image: '/characters/images/max.gif',
    fabStyle: 'minimal',
    chatStyle: 'modern',
    theme: {
      primary: '#2563EB',
      secondary: '#7C3AED',
      font: 'Inter, sans-serif',
    },
  },
];

// Glassmorphism styles
const glassEffect = {
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
};

const styles = {
  dashboard: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '30px 20px',
    color: '#2D3748',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    padding: '20px 30px',
    borderRadius: '16px',
    ...glassEffect,
  },
  headerTitle: {
    margin: 0,
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 16px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(8px)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.4)',
    },
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  statCard: {
    padding: '24px',
    borderRadius: '16px',
    ...glassEffect,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.2)',
    },
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '12px 0 6px',
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statLabel: {
    color: '#4A5568',
    fontSize: '14px',
    fontWeight: '500',
    opacity: 0.9,
  },
  section: {
    padding: '30px',
    marginBottom: '32px',
    borderRadius: '20px',
    ...glassEffect,
    transition: 'all 0.3s ease',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: '0 0 24px',
    color: '#2D3748',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sectionTitleIcon: {
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  button: {
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
  buttonSecondary: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#4F46E5',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.3)',
      boxShadow: '0 4px 20px rgba(79, 70, 229, 0.2)',
    },
  },
  buttonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed',
    transform: 'none !important',
    boxShadow: 'none !important',
  },
  charactersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  characterCard: {
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
    },
  },
  characterCardSelected: {
    boxShadow: '0 0 0 3px #4F46E5, 0 20px 40px -10px rgba(79, 70, 229, 0.3)',
    transform: 'translateY(-5px)',
  },
  characterImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
  },
  characterContent: {
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  characterName: {
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 8px',
    color: '#1F2937',
  },
  characterDescription: {
    fontSize: '14px',
    color: '#4B5563',
    margin: '0 0 16px',
    lineHeight: '1.5',
  },
  selectedBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
  },
  previewContainer: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: '1000',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  previewFab: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    position: 'relative',
    '::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.1)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    ':hover::after': {
      opacity: 1,
    },
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  },
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    flexDirection: 'column',
    gap: '16px',
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #4F46E5',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalConversations: 0,
    activeChats: 0,
    avgResponseTime: '0s',
    satisfactionRate: '0%',
  });
  
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewCharacter, setPreviewCharacter] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch these from your API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalConversations: 124,
          activeChats: 8,
          avgResponseTime: '42s',
          satisfactionRate: '92%',
        });
        
        // Load saved character preference
        // In a real app, this would come from your API
        const savedCharacterId = 'alessandro'; // Default to Alessandro
        const character = characters.find(c => c.id === savedCharacterId) || characters[0];
        
        setSelectedCharacter(character);
        setPreviewCharacter(character);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleCharacterSelect = (character) => {
    setPreviewCharacter(character);
  };

  const savePreferences = async () => {
    if (!previewCharacter) return;
    
    setIsSaving(true);
    try {
      // In a real app, you would save these preferences to your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the selected character
      setSelectedCharacter(previewCharacter);
      
      // Show success message with animation
      const successMessage = document.createElement('div');
      successMessage.textContent = 'Preferences saved successfully!';
      successMessage.style.position = 'fixed';
      successMessage.style.bottom = '20px';
      successMessage.style.left = '50%';
      successMessage.style.transform = 'translateX(-50%)';
      successMessage.style.backgroundColor = '#10B981';
      successMessage.style.color = 'white';
      successMessage.style.padding = '12px 24px';
      successMessage.style.borderRadius = '8px';
      successMessage.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      successMessage.style.zIndex = '1000';
      successMessage.style.opacity = '0';
      successMessage.style.transition = 'opacity 0.3s ease';
      
      document.body.appendChild(successMessage);
      
      // Trigger reflow
      void successMessage.offsetWidth;
      
      // Fade in
      successMessage.style.opacity = '1';
      
      // Remove after delay
      setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 300);
      }, 3000);
      
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loadingOverlay}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Chat Widget Customization</h1>
        <div style={styles.userProfile}>
          <div style={styles.avatar}>AD</div>
          <span>Admin</span>
        </div>
      </header>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Conversations</div>
          <div style={styles.statValue}>{stats.totalConversations.toLocaleString()}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Active Chats</div>
          <div style={styles.statValue}>{stats.activeChats}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Avg. Response Time</div>
          <div style={styles.statValue}>{stats.avgResponseTime}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Satisfaction Rate</div>
          <div style={styles.statValue}>{stats.satisfactionRate}</div>
        </div>
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <div style={styles.sectionTitleIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"/>
              <path d="M13 7H11V13H17V11H13V7Z" fill="white"/>
            </svg>
          </div>
          Select Your Chat Assistant
        </h2>
        <p style={{ marginBottom: '24px', color: '#4B5563' }}>
          Choose a character that best represents your brand's personality. This will be the face of your chat widget.
        </p>
        
        <div style={styles.charactersGrid}>
          {characters.map((character) => (
            <motion.div
              key={character.id}
              style={{
                ...styles.characterCard,
                ...(previewCharacter?.id === character.id ? styles.characterCardSelected : {}),
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCharacterSelect(character)}
            >
              <img 
                src={character.image} 
                alt={character.name} 
                style={styles.characterImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=Character+Image';
                }}
              />
              <div style={styles.characterContent}>
                <h3 style={styles.characterName}>{character.name}</h3>
                <p style={styles.characterDescription}>{character.description}</p>
                {previewCharacter?.id === character.id && (
                  <div style={styles.selectedBadge}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                    </svg>
                    Selected
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={styles.actionButtons}>
          <button 
            style={{
              ...styles.button,
              ...styles.buttonSecondary,
              marginRight: 'auto',
            }}
            onClick={() => window.location.reload()}
          >
            Reset Changes
          </button>
          <button 
            style={{
              ...styles.button,
              ...(isSaving ? styles.buttonDisabled : {}),
            }}
            onClick={savePreferences}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </section>

      {previewCharacter && (
        <div style={styles.previewContainer}>
          <button style={styles.previewFab}>
            <img 
              src={previewCharacter.image} 
              alt={previewCharacter.name}
              style={styles.previewImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200?text=Preview';
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
}
