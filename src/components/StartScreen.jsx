import React, { useState } from 'react';

function StartScreen({ onModeSelect }) {
  // Kontrol state
  // false = Bilgilendirme Ekranı, true = Mod Seçim Ekranı
  const [showModes, setShowModes] = useState(false);

  return (
    <div className="start-container">
      <header className="game-header">
        <h1>AI Tarafından Üretilen Görseli Bulma Oyunu</h1>
      </header>

      {/* AŞAMA 1: Bilgilendirme ve Başla Butonu */}
      {!showModes && (
        <>
          <section className="rules-section">
            <h2>👋 Hoş Geldiniz !</h2>
            <p>
              Gelişen yapay zeka teknolojileri ile gerçek ve sanal arasındaki ayrım giderek azalıyor. 
              Görsel algınızı test etmeye hazır mısınız ? Hazırsanız başlayalım !
            </p>
            
            <h2 style={{marginTop: '20px'}}>ℹ️ Nasıl Oynanır ?</h2>
            <p>
              1. Her turda karşınıza <strong>3 farklı görsel</strong> çıkacak.
            </p>
            <p>
              2. Bu görsellerden ikisi gerçek, <strong>biri ise AI (Yapay Zeka) üretimidir.</strong>
            </p>
            <p>
              3. Amacınız AI tarafından üretilen görseli bulmaktır.
            </p>
            <p>
              4. Oyunu 3 farklı modda oynayabilirsiniz.
            </p>
          </section>

          <div className="button-area">
  
            <button 
              className="start-button" 
              onClick={() => setShowModes(true)}
            >
              OYUNA BAŞLA
            </button>
          </div>
        </>
      )}

      {/* AŞAMA 2: Mod Seçimi */}
      {showModes && (
        <section className="mode-selection">
          <h3>Lütfen oynamak istediğiniz modu seçin:</h3>
          
          <div className="button-area">
            <button 
              className="start-button" 
              onClick={() => onModeSelect('KLASİK')}
            >
              Klasik Mod
            </button>
            
            <button 
              className="start-button" 
              onClick={() => onModeSelect('SÜRELİ')}
            >
              Zamana Karşı
            </button>
            
            <button 
              className="start-button" 
              onClick={() => onModeSelect('İPUCUSUZ')}
            >
              İpucusuz Zor Mod
            </button>
          </div>

          {/* Geri Dönme Linki */}
          <p 
            style={{
              marginTop: '25px', 
              cursor: 'pointer', 
              textDecoration: 'underline', 
              fontSize: '0.9rem',
              color: '#bdc3c7'
            }}
            onClick={() => setShowModes(false)}
          >
            &lt; Kurallara Geri Dön
          </p>
        </section>
      )}
    </div>
  );
}

export default StartScreen;

