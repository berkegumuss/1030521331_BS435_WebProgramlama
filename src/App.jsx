import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  // DURUMLAR (STATES)
  const [activeScreen, setActiveScreen] = useState('START');
  const [selectedMode, setSelectedMode] = useState(null);
  
  const [score, setScore] = useState(0);// Puanımız
  const [rounds, setRounds] = useState(0);     // Kaçıncı turdayız?

  //  Rekor puan için eklenen kısım
  const [highScore, setHighScore] = useState(() => {
    const savedScore = localStorage.getItem('highScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  
  const TOTAL_ROUNDS = 10; 

  // 1. MOD SEÇİLİNCE OYUNU BAŞLATIR
  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setScore(0);   // Puanı sıfırlar
    setRounds(0);  // Turu sıfırlar
    setActiveScreen('GAME'); // Oyun ekranına geçer
  };

  // 2. ekleme
  const handleRoundFinish = (isCorrect) => {
    // 1. State güncellenmeden puan hesaplanır
    let newScore = score;
    if (isCorrect) {
      newScore = score + 10;
      setScore(newScore);
    }
    
    // 2. Tur arttırılır
    const nextRound = rounds + 1;
    setRounds(nextRound);

    // 3. Oyunun bitip bitmediğini kontrol eder
    if (nextRound >= TOTAL_ROUNDS) {
      // Eğer rekor kırıldıysa kaydeder
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('highScore', newScore);
      }
      setActiveScreen('RESULT');
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
        <StartScreen onModeSelect={handleModeSelect}
        highScore={highScore} />
      )}

      {/* OYUN EKRANI */}
      {activeScreen === 'GAME' && (
        <GameScreen 
          key={rounds} 
          
          selectedMode={selectedMode} 
          onRestart={handleRestart}
          onRoundFinish={handleRoundFinish} // Tur bitince App'e haber verir
          currentRound={rounds + 1}   
          totalRounds={TOTAL_ROUNDS}       
        />
      )}

      {/* SONUÇ EKRANI */}
      {activeScreen === 'RESULT' && (
        <ResultScreen 
          score={score} 
          totalRounds={TOTAL_ROUNDS} 
          onRestart={handleRestart} 
          highScore={highScore}
        />
      )}
      
    </div>
  );
}

export default App;
