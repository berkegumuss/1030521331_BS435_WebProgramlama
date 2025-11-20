import React, { useState, useEffect } from 'react';
import { realImages, aiImages } from '../data';

function GameScreen({ selectedMode, onRestart }) {
  
  // Süre 15 saniyeye ayarlanır.
  const [timeLeft, setTimeLeft] = useState(15);
  
  const [currentImages, setCurrentImages] = useState([]);
  const [feedback, setFeedback] = useState(null); 
  const [selectedImageId, setSelectedImageId] = useState(null); 

  // 1. Yeni Tur Başlatma
  const startNewRound = () => {
    setFeedback(null);
    setSelectedImageId(null); 
    
    // Her yeni turda süreyi tekrar 15 saniyeye ayarlar.
    if (selectedMode === 'SURELI') {
       setTimeLeft(15);
    }

    const randomAI = aiImages[Math.floor(Math.random() * aiImages.length)];
    const shuffledReal = [...realImages].sort(() => 0.5 - Math.random());
    const selectedReal = shuffledReal.slice(0, 2);

    const combined = [randomAI, ...selectedReal];
    const finalMix = combined.sort(() => 0.5 - Math.random());

    setCurrentImages(finalMix);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  // 2. Tıklama Mantığı
  const handleImageClick = (image) => {
    if (feedback) return;

    setSelectedImageId(image.id);

    if (image.isAI) {
      // DOĞRU
      setFeedback('correct'); 
      setTimeout(() => {
        startNewRound();
      }, 1500);
    } else {
      // YANLIŞ
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedImageId(null);
      }, 1500);
    }
  };

  // 3. Zamanlayıcı
  useEffect(() => {
    if (selectedMode === 'SURELI') {
      if (timeLeft <= 0) {
        alert("Süre Doldu!"); 
        onRestart(); 
        return;
      }
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [selectedMode, timeLeft, onRestart]);

  // 4. Görünüm
  return (
    <main className="game-area">
      <div className="game-info">
        <h3>Mod: {selectedMode === 'KLASIK' ? 'Klasik' : selectedMode === 'SURELI' ? 'Zamana Karşı' : 'İpucusuz'}</h3>

        {selectedMode === 'SURELI' && (
          // Son 5 saniyede kırmızı yanar.
          <h2 style={{ color: timeLeft <= 5 ? 'crimson' : 'inherit' }}>
            {timeLeft}
          </h2>
        )}

        {feedback === 'correct' && <h2 style={{color: 'green'}}>✅ TEBRİKLER!</h2>}
        {feedback === 'wrong' && <h2 style={{color: 'crimson'}}>❌ YANLIŞ! BU GERÇEK FOTOĞRAF.</h2>}
        {!feedback && <p>Dikkatli bak! Hangisi yapay zeka?</p>}
      </div>
      
      <div className="image-selection-area">
        {currentImages.map((image) => {
          
          let borderStyle = '3px solid lightgray'; 

          if (feedback === 'wrong' && image.id === selectedImageId) {
            borderStyle = '4px solid crimson'; 
          } else if (feedback === 'correct' && image.id === selectedImageId) {
            borderStyle = '4px solid green'; 
          }

          return (
            <img 
              key={image.id}
              src={image.url} 
              alt="Görsel" 
              className="placeholder-image"
              onClick={() => handleImageClick(image)}
              onError={(e) => {
                 e.target.onerror = null; 
                 e.target.src = "https://placehold.co/200x200?text=Resim+Yok";
              }}
              style={{ 
                objectFit: 'cover', 
                cursor: feedback ? 'default' : 'pointer', 
                border: borderStyle, 
                transform: (image.id === selectedImageId && feedback) ? 'scale(1.05)' : 'scale(1)'
              }} 
            />
          );
        })}
      </div>

      <button onClick={onRestart}>Ana Menüye Dön</button>
    </main>
  );
}

export default GameScreen;