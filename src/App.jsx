import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen'; // Yeni ekranımızı çağırdık

function App() {
  // DURUMLAR (STATES)
  const [activeScreen, setActiveScreen] = useState('START'); // START, GAME, RESULT
  const [selectedMode, setSelectedMode] = useState(null);
  
  const [score, setScore] = useState(0);       // Puanımız
  const [rounds, setRounds] = useState(0);     // Kaçıncı turdayız?
  
  const TOTAL_ROUNDS = 10;

  // 1. MOD SEÇİLİNCE OYUNU BAŞLATIR
  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setScore(0);   // Puanı sıfırlar
    setRounds(0);  // Turu sıfırlar
    setActiveScreen('GAME'); // Oyun ekranına geçer
  };

  // 2. HER TUR BİTTİĞİNDE ÇALIŞACAK FONKSİYON
  const handleRoundFinish = (isCorrect) => {
    // Eğer doğru bildiyse 10 puan ekler
    if (isCorrect) {
      setScore((prevScore) => prevScore + 10);
    }
    
    // Tur sayısını 1 arttırır
    const nextRound = rounds + 1;
    setRounds(nextRound);

    // Eğer 10. tura geldiysek oyunu bitirir
    if (nextRound >= TOTAL_ROUNDS) {
      setActiveScreen('RESULT'); // Sonuç ekranına geçer
    }
  };

  // 3. OYUNU YENİDEN BAŞLATIR
  const handleRestart = () => {
    setActiveScreen('START');
    setSelectedMode(null);
    setScore(0);
    setRounds(0);
  };

  return (
    <div className="App-container">
      
      {/* GİRİŞ EKRANI */}
      {activeScreen === 'START' && (
        <StartScreen onModeSelect={handleModeSelect} />
      )}

      {/* OYUN EKRANI */}
      {activeScreen === 'GAME' && (
        <GameScreen 
          selectedMode={selectedMode} 
          onRestart={handleRestart}
          onRoundFinish={handleRoundFinish} // <--- Bu fonksiyonu GameScreen'e gönderiyoruz
        />
      )}

      {/* SONUÇ EKRANI */}
      {activeScreen === 'RESULT' && (
        <ResultScreen 
          score={score} 
          totalRounds={TOTAL_ROUNDS} 
          onRestart={handleRestart} 
        />
      )}
      
    </div>
  );
}

export default App;
