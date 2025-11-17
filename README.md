# MarryVoice Adventurer

- p5.js Web Editor  
  https://editor.p5js.org/clzlsfjq86/sketches/RKiI8LY8a

- web
  https://2jooyoung.github.io/Merry-Voice-Adventure/MerryVoice_Adventure/

음성 인식 기반으로 캐릭터를 조작하는 크리스마스 테마 러너 게임입니다.  
사용자의 목소리 크기(Volume) 에 따라 루돌프가 위,아래로 움직이며  
장애물(눈사람)을 피해 엔딩까지 도달하면 성공하는 방식입니다.

---

## About

MarryVoice Adventurer는 음성 입력 + 음악 분석(BGM 기반) 을 활용해  
시각적·청각적 몰입을 높이는 인터랙티브 게임입니다.

- 마이크로 입력된 소리 크기로 캐릭터 이동  
- BGM FFT 분석 → 피크 감지로 장애물 생성  
- 3종의 배경 이미지 전환  
- 3종의 눈사람 장애물 랜덤 생성  
- Title / Game Over / Win UI 화면  
- 시간·장애물·아이템을 기반으로 점수 계산



---



## Tech Stack

- JavaScript
- p5.js
- HTML5
- CSS3
- Audio Input: p5.AudioIn()
- Audio Analysis: p5.FFT(), p5.PeakDetect()

---
