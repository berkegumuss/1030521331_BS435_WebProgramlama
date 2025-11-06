import React, { useState } from 'react';

// Component'lerimizi import ediyoruz
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
// (İleride Sonuç ekranı için: import ResultScreen from './components/ResultScreen';)

import './App.css'; 

function App() {
  
  // 1. Benzersiz yapı: Component referansını state'te tutar
  const [ActiveComponent, setActiveComponent] = useState(() => StartScreen);

  // 2. Yeni ekleme: Hangi modun seçildiğini tutacak state.
  const [selectedMode, setSelectedMode] = useState(null);

  // 3. Güncellenen fonksiyon: Artık bu fonksiyon "modu" parametre olarak alıyor.
  const handleModeSelect = (mode) => {
    setSelectedMode(mode); // Hangi modun seçildiğini kaydeder
    setActiveComponent(() => GameScreen); // Oyun ekranına geçer
  };

  // Oyunu yeniden başlatan fonksiyon (İleride ResultScreen için)
  const showStartScreen = () => {
    setSelectedMode(null); // Mod seçimini sıfırlar
    setActiveComponent(() => StartScreen); // Başlangıç ekranına döner
  };

  // 4. Render (çizim):
  // Aktif component'i (ActiveComponent) doğrudan bir etiket gibi çağırıyoruz.
  return (
    <div className="App-container">
      <ActiveComponent 
        // Gerekli tüm fonksiyonları ve verileri props olarak tek seferde iletiyoruz.
        // StartScreen 'onModeSelect'i kullanacak.
        onModeSelect={handleModeSelect} 
        
        // GameScreen 'selectedMode'u ve 'onRestart'ı kullanacak.
        selectedMode={selectedMode} 
        onRestart={showStartScreen} 
      />
    </div>
  );
} 

export default App;
