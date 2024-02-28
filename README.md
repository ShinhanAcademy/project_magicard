# project_magicard

마법카드(마이 법인 카드) 프로젝트 레포지토리입니다

배포주소: https://magicard.azurewebsites.net

<img src="image.png">

<br>
<br>

# 목차

- [project_magicard](#project_magicard)
- [목차](#목차)
- [개요](#개요)
- [기술 스택](#기술-스택)
- [프로젝트 설명](#프로젝트-설명)
  - [일반 사원](#일반-사원)
  - [상급자](#상급자)
  - [관리자](#관리자)
  - [승인 요청 과정](#승인-요청-과정)
  - [승인, 반려](#승인-반려)
  - [수정](#수정)
- [구현 기능](#구현-기능)
- [배운 점 \& 아쉬운 점](#배운-점--아쉬운-점)

# 개요

- 프로젝트 이름 : MagiCard
- 프로젝트 진행 기간 : 2024.01 - 2024.02
- 멤버 : 노승광, 민성환, 박정우, 신서영, 정문경, 정주영

<br><br>

# 기술 스택

- Front-End : <img src="https://img.shields.io/badge/react-%2320232a.svg?style=badge&logo=react&logoColor=%2361DAFB">, <img src="https://img.shields.io/badge/Javascript-ffb13b?style=bagde&logo=javascript&logoColor=white"/>
- Back-End : <img src="https://img.shields.io/badge/Java-007396?style=square&logo=Java&logoColor=white"/>, <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=square&logo=SpringBoot&logoColor=white"/>, <img src="https://img.shields.io/badge/JPA-%236DB33F.svg?style=badge&logo=spring&logoColor=white">
- DataBase : <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=badge&logo=postgresql&logoColor=white">
- 배포 : <img src="https://img.shields.io/badge/azure-%230072C6.svg?style=badge&logo=microsoftazure&logoColor=white">
  <br><br>

# 프로젝트 설명

<img src="image-14.png">

### 일반 사원

결제 내역
<img src="image-1.png">
결재 요청 내역
<img src="image-2.png">

카드 사용 시작가이드
<img src="image-3.png">

### 상급자

### 관리자

대시보드
<img src="image-4.png">
결제 내역과 결재 처리된 승인 건들의 통계를 볼 수 있다.

<br><br>

용도 관리
<img src="image-5.png">
각 회사에 맞는 용도를 설정할 수 있어, 개정처리에 용이하다.
<br><br>

카드 발급
<img src="image-6.png">
<img src="image-7.png">
관리자는 새로 회사를 등록하거나, 신입사원이 들어왔을 때 알맞은 카드를 신청할 수 있게 된다.
<br><br>

### 승인 요청 과정

<p align="center">
  <img src="image-8.png" width="41%">
  <img src="image-10.png" width="40%">
</p>

왼쪽고 같이 학습을 하면서 사용처에 맞는 용도를 추천해준다. <br>
알맞게 추천된 결과를 일반 사용자는 상급자에게, 상급자는 재무부에게 승인 요청을 하게 된다.
<br><br>

### 승인, 반려

<p align="center">
  <img src="image-11.png" width="40%">
  <img src="image-12.png" width="40%">
</p>
상급자, 관리자는 승인 요청을 받을 수도 있고, 반려를 할 수도 있게 된다.
<br><br>

### 수정

<p>
<img src="image-13.png" width="50%">
</p>
반려된 요청은 요청자가 수정하여 다시 요청할 수 있게 된다. <br>
단, 반려가 2번 이상인 요청건은 요청을 할 수 없다.
<br><br>

# 구현 기능

<br><br>

# 배운 점 & 아쉬운 점

- 노승광 :
- 민성환 :
- 박정우 :
- 신서영 :
- 정문경 :
- 정주영 :
