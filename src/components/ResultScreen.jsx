import React from 'react';

// Props kısmına 'highScore' eklendi.
function ResultScreen({ score, totalRounds, onRestart, highScore }) {
  
  const isNewRecord = score === highScore && score > 0;

  return (
    <div className="result-container" style={{ textAlign: 'center', padding: '40px' }}>
      
      {/* REKOR KUTLAMASI */}
      {isNewRecord && (
        <div style={{
          fontSize: '1.8rem', 
          marginBottom:'20px', 
          animation: 'pulse 1s infinite'
        }}>
          🎉 🌟 <strong style={{color:'gold', textShadow: '2px 2px 4px #000'}}>YENİ REKOR!</strong> 🌟 🎉
        </div>
      )}

      <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🏁 OYUN BİTTİ</h2>
      
      <div className="score-box" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        padding: '20px', 
        borderRadius: '15px', 
        display: 'inline-block',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0 }}>Toplam Puanın</p>
        <h1 style={{ fontSize: '4rem', margin: '10px 0', color: '#4ecdc4' }}>{score}</h1>
      </div>

      <p style={{ fontSize: '1.2rem' }}>
        Toplam <strong>{totalRounds}</strong> soruda performansın bu şekilde.
      </p>

      {/* REKOR HATIRLATMASI */}
      {!isNewRecord && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f1c40f',
          color: '#2c3e50',
          display: 'inline-block',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          🏆 Hedeflenen Rekor: {highScore}
        </div>
      )}

      <div style={{ marginTop: '40px' }}>
        <button 
          onClick={onRestart} 
          className="restart-btn"
          style={{
            padding: '15px 40px',
            fontSize: '1.2rem',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
          }}
        >
          🔄 Tekrar Oyna
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;