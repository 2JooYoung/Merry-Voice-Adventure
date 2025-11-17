# MarryVoice Adventurer

음성 인식 기반으로 캐릭터를 조작하는 크리스마스 테마 러너 게임입니다.  
사용자의 목소리 크기(Volume) 에 따라 루돌프가 위,아래로 움직이며  
장애물(눈사람)을 피해 엔딩까지 도달하면 성공하는 방식입니다.

---

## About

MarryVoice Adventurer는 음성 입력 + 음악 분석(BGM 기반) 을 활용해  
시각적·청각적 몰입을 높이는 인터랙티브 게임입니다.

- 마이크로 입력된 소리 크기로 캐릭터 이동  
- BGM FFT 분석 → 피크 감지로 장애물 생성  
- 3종 배경 이미지 전환  
- 3종 눈사람 장애물 랜덤 생성  
- Title / Game Over / Win UI 화면  
- 시간·장애물·아이템을 기반으로 점수 계산

---

## Features

### 음성 인식 이동
- p5.AudioIn() 으로 음성 크기(volume) 실시간 측정  
- 소리가 커질수록 루돌프가 위로 상승  
- Gravity, Velocity 값을 조절해 자연스러운 이동감 구현

### 음악 분석 기반 장애물 시스템
- p5.FFT() 로 주파수 분석  
- PeakDetect 로 피크 발생 순간 장애물 등장  
- 곡 구간에 따라 게임 속도 변화

### 시각적 요소
- 크리스마스 테마의 AI 생성 이미지 사용  
- 3개의 배경 이미지가 자동으로 순차 전환  
- 눈사람 3종류를 랜덤 배치해 장애물 구성  
- 게임 상황에 따라 Title → Game Over → Win UI 전환

### 점수 시스템
- 시간 점수: 1초 = 1점  
- 눈사람 통과 수: 1개 = 1점  
- 아이템 점수: 특정 아이템 3개 획득 시 즉시 WIN  

---

## Code Link

- p5.js Web Editor  
  https://editor.p5js.org/clzlsfjq86/sketches/RKiI8LY8a  
  (로컬 파일: referenced code – :contentReference[oaicite:0]{index=0})

---

## Tech Stack

- JavaScript
- p5.js
- HTML5
- CSS3
- Audio Input: `p5.AudioIn()
- Audio Analysis: p5.FFT(), p5.PeakDetect()

---
