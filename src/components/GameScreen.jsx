// 1. useState ve useEffect'i React'ten import ediyoruz
import React, { useState, useEffect } from 'react';

// App.jsx'ten gönderilen 'selectedMode' ve 'onRestart' verilerini props olarak alıyoruz
function GameScreen({ selectedMode, onRestart }) {
  
  // 2. Kalan süreyi tutmak için YENİ BİR STATE (DURUM) ekliyoruz.
  const [timeLeft, setTimeLeft] = useState(30); 

  // 3. Zamanlayıcı mantığı (useEffect Hook'u)
  useEffect(() => {
    
    // Zamanlayıcıyı sadece "süreli" mod seçildiyse çalıştır
    if (selectedMode === 'SURELI') {
      
      // Eğer süre 0'a ulaşırsa, oyunu durdurur (ana menüye döner)
      if (timeLeft <= 0) {
        alert("Süreniz Doldu!"); // (İleride ResultScreen için gerekli)
        onRestart(); // Ana menüye döner
        return; // Bu effect'i durdurur
      }

      // 1 saniyelik (1000ms) aralıklarla çalışacak zamanlayıcıyı kurar
      const timerInterval = setInterval(() => {
        // Kalan süreyi 1 azaltır
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // 4. Temizleme Fonksiyonu ( ÖNEMLİ!)
      // Bu component ekrandan kaldırılırsa (örn: "Ana Menüye Dön" butonuna basılırsa)
      // bu zamanlayıcının arka planda çalışmasını durdurur.
      return () => {
        clearInterval(timerInterval);
      };
    }

  // Bu effect'in ne zaman tekrar çalışacağını belirleyen bağımlılıklar:
  }, [selectedMode, timeLeft, onRestart]);


  // 5. Render (çizim)
  return (
    <main className="game-area">
      <div className="game-info">
        <h3>Mod: {selectedMode}</h3>
        
        {/* 6. Zamanlayıcıyı ekranda gösterme
            Sadece "süreli" mod seçildiyse bu başlık gösterilir
        */}
        {selectedMode === 'SURELI' && (
          <h2 style={{ color: timeLeft <= 10 ? 'red' : 'black' }}>
            Kalan Süre: {timeLeft}s
          </h2>
        )}
        
        <p>Tahmininizi yapın: Hangi görsel yapay zeka ürünü?</p>
      </div>
      
      <div className="image-selection-area">
        <div className="placeholder-image">Görsel 1</div>
        <div className="placeholder-image">Görsel 2</div>
        <div className="placeholder-image">Görsel 3</div>
      </div>

      <button onClick={onRestart}>Ana Menüye Dön</button>
    </main>
  );
}

export default GameScreen;