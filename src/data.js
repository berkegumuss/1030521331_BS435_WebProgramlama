


const REAL_IMAGE_COUNT = 50; 
const AI_IMAGE_COUNT = 9; 

// 1. GERÇEK RESİMLER LİSTESİ
export const realImages = Array.from({ length: REAL_IMAGE_COUNT }, (_, i) => ({
  id: `r${i + 1}`,
  url: `/images/realimages/r${i + 1}.jpg`, 
  isAI: false
}));

// 2. YAPAY ZEKA RESİMLERİ LİSTESİ
export const aiImages = Array.from({ length: AI_IMAGE_COUNT }, (_, i) => ({
  id: `a${i + 1}`,
  url: `/images/aiimages/a${i + 1}.jpg`, 
  isAI: true
}));