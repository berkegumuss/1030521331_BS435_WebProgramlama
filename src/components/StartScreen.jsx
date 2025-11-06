import React from 'react';

// 1. App.jsx'ten gönderilen 'onModeSelect' fonksiyonunu props olarak alıyoruz
function StartScreen({ onModeSelect }) {
  return (
    <div className="start-container">
      <header className="game-header">
        <h1>AI Tarafından Üretilen Görseli Bulma Oyunu</h1>
      </header>
      
      <section className="rules-section">
        <h2>ℹ️ Oyun Kuralları ve Amaç</h2>
        <p>
          Her turda size sunulacak 3 görselden <b>sadece biri</b> yapay zeka (AI) tarafından üretilmiştir diğer ikisi gerçektir.
        </p>
      </section>

      {/* 2. MOD SEÇİM ALANI */}
      <section className="mode-selection">
        <h3>Lütfen Bir Oyun Modu Seçin:</h3>
        
        {/*
          Buradaki 3 buton da .start-button sınıfını kullanıyor.
          Her buton, 'onModeSelect' fonksiyonunu farklı bir mod adıyla çağırıyor.
        */}
        <div className="button-area">
          <button 
            className="start-button" 
            onClick={() => onModeSelect('KLASIK')}
          >
            Klasik Mod (İpuculu)
          </button>
          
          <button 
            className="start-button" 
            onClick={() => onModeSelect('SURELI')}
          >
            Zamana Karşı
          </button>
          
          <button 
            className="start-button" 
            onClick={() => onModeSelect('IPUCUSUZ')}
          >
            Zor Mod (İpucusuz)
          </button>
        </div>
      </section>
    </div>
  );
}

export default StartScreen;