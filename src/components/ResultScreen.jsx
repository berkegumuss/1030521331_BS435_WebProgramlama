import React from 'react';

function ResultScreen({ score, totalRounds, onRestart }) {
  
  // Puan hesaplama (Her soru 10 puan)
  const maxScore = totalRounds * 10;
  const successRate = (score / maxScore) * 100;

  // Başarı durumuna göre mesaj belirle
  let message = "";
  let messageColor = "";

  if (successRate >= 80) {
    message = "🔥 Mükemmel! Tam bir AI Avcısısın !";
    messageColor = "green";
  } else if (successRate >= 50) {
    message = "👏 Gayet iyi! Çoğunu doğru bildin.";
    messageColor = "orange";
  } else {
    message = "⚠️ Geliştirilebilir. Biraz daha dikkatli bakmalısın.";
    messageColor = "red";
  }

  return (
    // 'game-area' sınıfını kullanarak oyun ekranıyla aynı beyaz kutu tasarımını alıyoruz
    <div className="game-area" style={{ justifyContent: 'center', textAlign: 'center' }}>
      
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50', margin: '0 0 10px 0', fontSize: '2.5rem' }}>OYUN BİTTİ!</h1>
        <p style={{ color: 'gray', fontSize: '1.2rem' }}>Toplam Puanın:</p>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '15px', 
        border: '3px solid lightgray',
        width: '80%',
        maxWidth: '400px'
      }}>
        {/* SKOR GÖSTERGESİ */}
        <h2 style={{ fontSize: '4rem', margin: '10px 0', color: '#3498db' }}>
          {score}
          <span style={{ fontSize: '1.5rem', color: 'gray' }}> / {maxScore}</span>
        </h2>
        
        <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '20px 0' }} />
        
        {/* MESAJ */}
        <h3 style={{ color: messageColor, margin: '0' }}>{message}</h3>
      </div>

      {/* TEKRAR OYNA BUTONU */}
      <button 
        onClick={onRestart} 
        style={{ 
          marginTop: '30px', 
          backgroundColor: '#3498db', 
          color: 'white', 
          border: 'none',
          padding: '15px 40px',
          fontSize: '1.1rem',
          borderRadius: '50px'
        }}
      >
        🔄 Tekrar Oyna
      </button>

    </div>
  );
}

export default ResultScreen;