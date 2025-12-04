import React, { useState } from 'react';

function StartScreen({ onModeSelect }) {
  const [showModes, setShowModes] = useState(false);

  return (
    <div className="start-container">
      <header className="game-header">
        <h1>AI Tarafından Üretilen Görseli Bulma Oyunu</h1>
      </header>

      {/* AŞAMA 1: Bilgilendirme Ekranı */}
      {!showModes && (
        <>
          <section className="rules-section">
            <h2 style={{borderBottom: '1px solid gray', paddingBottom:'10px'}}>ℹ️ Nasıl Oynanır?</h2>
            
            <div style={{textAlign: 'left', lineHeight: '1.8', fontSize: '1.1rem'}}>
              <p>1. Her turda karşınıza <strong>3 farklı görsel</strong> çıkacak.</p>
              <p>2. Bu görsellerden ikisi gerçek, <strong>biri ise AI (Yapay Zeka) üretimidir.</strong></p>
              <p>3. Amacınız AI tarafından üretilen görseli bulmaktır.</p>
              <p>4. Oyunu <strong>3 farklı modda</strong> oynayabilirsiniz:</p>
              
              {/* --- EKSİK OLAN MOD AÇIKLAMALARI BURADA --- */}
              <ul style={{
                  backgroundColor: 'rgba(0,0,0,0.2)', 
                  padding: '15px 15px 15px 35px', 
                  borderRadius: '8px',
                  marginTop: '10px',
                  fontSize: '0.95rem',
                  color: '#e0e0e0'
                }}>
                <li style={{marginBottom: '8px'}}>
                  <strong style={{color: 'lightskyblue'}}>Klasik Mod:</strong> Yanlış bilirsen ipucu verilir, ikinci şansın olur.
                </li>
                <li style={{marginBottom: '8px'}}>
                  <strong style={{color: 'lightskyblue'}}>Zamana Karşı:</strong> Her tur için sadece 15 saniyen ve bir ipucun var !
                </li>
                <li>
                  <strong style={{color: 'lightskyblue'}}>İpucusuz Mod:</strong> Zorluk sevenlere. Yanlış bilirsen tur biter.
                </li>
              </ul>
              {}
            </div>
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

      {/* AŞAMA 2: Mod Seçim Ekranı */}
      {showModes && (
        <section className="mode-selection">
          <h3>Hangi modda oynamak istersiniz?</h3>
          
          <div className="button-area">
            <button className="start-button" onClick={() => onModeSelect('KLASIK')}>
              Klasik Mod
            </button>
            
            <button className="start-button" onClick={() => onModeSelect('SURELI')}>
              Zamana Karşı
            </button>
            
            <button className="start-button" onClick={() => onModeSelect('IPUCUSUZ')}>
              İpucusuz Mod
            </button>
          </div>

          <p 
            style={{marginTop: '30px', cursor: 'pointer', textDecoration: 'underline', color: 'lightgray'}}
            onClick={() => setShowModes(false)}
          >
            &lt; Bilgilere Geri Dön
          </p>
        </section>
      )}
    </div>
  );
}

export default StartScreen;

