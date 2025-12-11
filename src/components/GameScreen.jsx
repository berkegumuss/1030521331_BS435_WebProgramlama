import React, { useState, useEffect } from 'react';
import { realImages, aiImages } from '../data';

// GENEL İPUCU HAVUZU
const HINTS = [
  "Resimdeki nesnelerin dokuları ve yüzeyleri doğal mı?",
  "Işık ve gölge yönleri mantıklı görünüyor mu?",
  "Kenar hatlarında anlamsız bir bulanıklık veya bozulma var mı?",
  "Resmin genelinde fizik kurallarına aykırı bir detay var mı?",
  "Renk geçişleri ve parlaklıklar göze doğal geliyor mu?",
  "Arka plandaki detaylar net mi yoksa birbirine mi geçmiş?",
  "Nesnelerin birleşme noktalarında (eklem yerleri vb.) hata var mı?",
  "Görseldeki ince detaylarda (çizgiler, desenler) tutarsızlık var mı?"
];

// onRoundFinish özelliği eklendi
function GameScreen({ selectedMode, onRestart, onRoundFinish }) {
  
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentHint, setCurrentHint] = useState("");

  const [feedback, setFeedback] = useState(null); 
  const [selectedImageId, setSelectedImageId] = useState(null); 
  const [attempts, setAttempts] = useState(1); 
  const [eliminatedId, setEliminatedId] = useState(null); 

  // 1. YENİ TUR HAZIRLIĞI
  const startNewRound = () => {
    setFeedback(null);
    setSelectedImageId(null);
    setEliminatedId(null);
    setAttempts(1);

    if (selectedMode === 'SURELI') setTimeLeft(15);

    // Rastgele İpucu Seçer
    const randomHint = HINTS[Math.floor(Math.random() * HINTS.length)];
    setCurrentHint(randomHint);

    // Rastgele Resimler Seçer
    const randomAI = aiImages[Math.floor(Math.random() * aiImages.length)];
    const shuffledReal = [...realImages].sort(() => 0.5 - Math.random());
    const selectedReal = shuffledReal.slice(0, 2);

    const combined = [randomAI, ...selectedReal].sort(() => 0.5 - Math.random());
    setCurrentImages(combined);
  };

  useEffect(() => {
    startNewRound();
  }, []);


  // 2. TIKLAMA MANTIĞI
  const handleImageClick = (image) => {
    if (feedback === 'correct' || feedback === 'wrong') return; 
    if (image.id === eliminatedId) return; 

    setSelectedImageId(image.id);

    // SENARYO A: DOĞRU CEVAP (AI)
    if (image.isAI) {
      setFeedback('correct');
      setTimeout(() => {
        // App.jsx'e haber verir: "Doğru bildi (+10 Puan)"
        onRoundFinish(true); 
        startNewRound();
      }, 1500);
    } 
    
    // SENARYO B: YANLIŞ CEVAP 
    else {
      // Eğer mod "İPUCUSUZ" ise veya zaten 2. denemeyse -> KAYBETTİN
      if (selectedMode === 'IPUCUSUZ' || attempts === 2) {
        setFeedback('wrong');
        setTimeout(() => {
          // App.jsx'e haber verir: "Bilemedi (0 Puan)"
          onRoundFinish(false);
          startNewRound(); 
        }, 1500);
      } 
      
      // Eğer "KLASIK" veya "SURELI" ise ve ilk denememse -> İPUCU VER
      else {
        setFeedback('hint'); 
        setEliminatedId(image.id); 
        setAttempts(2); 
        
        setTimeout(() => {
           setSelectedImageId(null); 
        }, 1500);
      }
    }
  };

  // 3. ZAMANLAYICI
  useEffect(() => {
    if (selectedMode === 'SURELI') {
      if (timeLeft <= 0) {
        // Süre doldu -> Yanlış sayılır
        onRoundFinish(false); 
        startNewRound();
        return;
      }
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [selectedMode, timeLeft, onRoundFinish]); 


  // 4. GÖRÜNÜM
  return (
    <main className="game-area">
      <div className="game-info">
        <h3>Mod: {selectedMode === 'KLASIK' ? 'Klasik' : selectedMode === 'SURELI' ? 'Zamana Karşı' : 'İpucusuz'}</h3>

        {selectedMode === 'SURELI' && (
          <h2 style={{ color: timeLeft <= 5 ? 'crimson' : 'red' }}>{timeLeft}</h2>
        )}

        {/* MESAJLAR */}
        {feedback === 'correct' && <h2 style={{color: 'green'}}>✅ DOĞRU! +10 PUAN</h2>}
        {feedback === 'wrong' && <h2 style={{color: 'crimson'}}>❌ YANLIŞ CEVAP.</h2>}
        
        {/* İPUCU KUTUSU */}
        {feedback === 'hint' && (
          <div style={{backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', border: '1px solid #ffeeba', color: '#856404'}}>
            <strong>⚠️ YANLIŞ! İPUCU:</strong>
            <p style={{margin: '5px 0', fontStyle:'italic'}}>"{currentHint}"</p>
            <small>Kalan resimlerden tekrar dene.</small>
          </div>
        )}

        {!feedback && <p>Dikkatli bak! Hangisi yapay zeka?</p>}
      </div>
      
      <div className="image-selection-area">
        {currentImages.map((image) => {
          
          let borderStyle = '3px solid lightgray'; 
          let opacityValue = 1;

          if (image.id === eliminatedId) {
            opacityValue = 0.3;
            borderStyle = '3px solid #ccc';
          }

          if (feedback === 'wrong' && image.id === selectedImageId) borderStyle = '4px solid crimson';
          if (feedback === 'correct' && image.id === selectedImageId) borderStyle = '4px solid green';
          if (feedback === 'hint' && image.id === selectedImageId) borderStyle = '4px solid crimson';

          return (
            <img 
              key={image.id}
              src={image.url} 
              alt="Görsel" 
              className="placeholder-image"
              onClick={() => handleImageClick(image)}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200?text=Resim+Yok"; }}
              style={{ 
                objectFit: 'cover', 
                cursor: (feedback === 'correct' || feedback === 'wrong' || image.id === eliminatedId) ? 'default' : 'pointer', 
                border: borderStyle,
                opacity: opacityValue,
                transform: (image.id === selectedImageId) ? 'scale(1.05)' : 'scale(1)'
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