import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "포트폴리오 웹사이트",
    description:
      "Next.js와 TypeScript를 사용한 개인 포트폴리오 웹사이트입니다.",
    thumbnail: "/images/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/username/portfolio",
    demoUrl: "https://portfolio.demo.com",
    content: `
# 포트폴리오 웹사이트

## 프로젝트 소개
이 프로젝트는 개인 포트폴리오 웹사이트로, Next.js와 TypeScript를 기반으로 제작되었습니다.

## 주요 기능
- 반응형 디자인
- 다크 모드 지원
- 프로젝트 갤러리
- 블로그 기능

## 기술 스택
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
    `,
    createdAt: "2024-01-01",
    updatedAt: "2024-03-15",
  },
  {
    id: "2",
    title: "AI 챗봇 서비스",
    description: "OpenAI API를 활용한 지능형 챗봇 서비스입니다.",
    thumbnail: "/images/projects/chatbot.jpg",
    technologies: ["React", "Node.js", "OpenAI API", "Socket.io"],
    githubUrl: "https://github.com/username/chatbot",
    demoUrl: "https://chatbot.demo.com",
    content: `
# AI 챗봇 서비스

## 프로젝트 소개
OpenAI API를 활용한 실시간 대화형 챗봇 서비스입니다.

## 주요 기능
- 실시간 채팅
- AI 기반 응답 생성
- 대화 기록 저장
- 사용자 맞춤 설정

## 기술 스택
- React
- Node.js
- OpenAI API
- Socket.io
    `,
    createdAt: "2024-02-01",
    updatedAt: "2024-03-10",
  },
  {
    id: "3",
    title: "전자상거래 플랫폼",
    description: "사용자 친화적인 온라인 쇼핑몰 플랫폼입니다.",
    thumbnail: "/images/projects/ecommerce.jpg",
    technologies: ["Next.js", "MongoDB", "Stripe API", "Redux"],
    githubUrl: "https://github.com/username/ecommerce",
    demoUrl: "https://ecommerce.demo.com",
    content: `
# 전자상거래 플랫폼

## 프로젝트 소개
사용자 친화적인 인터페이스와 안전한 결제 시스템을 갖춘 온라인 쇼핑몰 플랫폼입니다.

## 주요 기능
- 상품 검색 및 필터링
- 장바구니 및 결제 시스템
- 사용자 계정 관리
- 주문 내역 조회

## 기술 스택
- Next.js
- MongoDB
- Stripe API
- Redux
    `,
    createdAt: "2024-01-15",
    updatedAt: "2024-03-05",
  },
  {
    id: "4",
    title: "실시간 협업 툴",
    description: "팀 프로젝트를 위한 실시간 협업 도구입니다.",
    thumbnail: "/images/projects/collaboration.jpg",
    technologies: ["React", "Firebase", "WebRTC", "Tailwind CSS"],
    githubUrl: "https://github.com/username/collaboration-tool",
    demoUrl: "https://collab.demo.com",
    content: `
# 실시간 협업 툴

## 프로젝트 소개
팀 프로젝트를 위한 실시간 협업 도구로, 화상 회의, 문서 공유, 타임라인 등의 기능을 제공합니다.

## 주요 기능
- 실시간 화상 회의
- 문서 공동 편집
- 프로젝트 타임라인
- 알림 시스템

## 기술 스택
- React
- Firebase
- WebRTC
- Tailwind CSS
    `,
    createdAt: "2024-02-10",
    updatedAt: "2024-03-01",
  },
  {
    id: "5",
    title: "헬스케어 모바일 앱",
    description: "개인 건강 관리를 위한 모바일 애플리케이션입니다.",
    thumbnail: "/images/projects/healthcare.jpg",
    technologies: ["React Native", "TypeScript", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/username/healthcare-app",
    demoUrl: "https://healthcare.demo.com",
    content: `
# 헬스케어 모바일 앱

## 프로젝트 소개
사용자의 건강 데이터를 추적하고 분석하여 개인화된 건강 관리를 제공하는 모바일 애플리케이션입니다.

## 주요 기능
- 활동 및 운동 추적
- 식단 관리
- 수면 패턴 분석
- 건강 보고서 생성

## 기술 스택
- React Native
- TypeScript
- Express.js
- MongoDB
    `,
    createdAt: "2024-01-20",
    updatedAt: "2024-02-28",
  },
  {
    id: "6",
    title: "부동산 중개 플랫폼",
    description: "효율적인 부동산 거래를 위한 중개 플랫폼입니다.",
    thumbnail: "/images/projects/realestate.jpg",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Google Maps API"],
    githubUrl: "https://github.com/username/realestate",
    demoUrl: "https://realestate.demo.com",
    content: `
# 부동산 중개 플랫폼

## 프로젝트 소개
부동산 매물을 검색하고, 중개인과 연결하며, 계약 프로세스를 간소화하는 플랫폼입니다.

## 주요 기능
- 위치 기반 매물 검색
- 가상 투어 예약
- 실시간 중개인 연결
- 계약서 전자 서명

## 기술 스택
- Vue.js
- Node.js
- PostgreSQL
- Google Maps API
    `,
    createdAt: "2024-01-05",
    updatedAt: "2024-02-25",
  },
  {
    id: "7",
    title: "온라인 교육 플랫폼",
    description: "인터랙티브한 온라인 학습 경험을 제공하는 교육 플랫폼입니다.",
    thumbnail: "/images/projects/elearning.jpg",
    technologies: ["React", "Django", "AWS", "Redis"],
    githubUrl: "https://github.com/username/elearning",
    demoUrl: "https://elearning.demo.com",
    content: `
# 온라인 교육 플랫폼

## 프로젝트 소개
다양한 교육 콘텐츠와 인터랙티브한 학습 경험을 제공하는 온라인 교육 플랫폼입니다.

## 주요 기능
- 코스 검색 및 등록
- 실시간 강의 스트리밍
- 퀴즈 및 과제 제출
- 진도 추적 시스템

## 기술 스택
- React
- Django
- AWS
- Redis
    `,
    createdAt: "2024-02-05",
    updatedAt: "2024-02-20",
  },
  {
    id: "8",
    title: "시간 관리 애플리케이션",
    description: "생산성 향상을 위한 시간 관리 애플리케이션입니다.",
    thumbnail: "/images/projects/timemanagement.jpg",
    technologies: ["Flutter", "Firebase", "Riverpod", "Material Design"],
    githubUrl: "https://github.com/username/time-manager",
    demoUrl: "https://timemanager.demo.com",
    content: `
# 시간 관리 애플리케이션

## 프로젝트 소개
할 일 관리, 시간 추적, 생산성 분석 등의 기능을 제공하는 시간 관리 애플리케이션입니다.

## 주요 기능
- 할 일 관리 및 우선순위 설정
- 포모도로 타이머
- 시간 사용 분석
- 목표 설정 및 추적

## 기술 스택
- Flutter
- Firebase
- Riverpod
- Material Design
    `,
    createdAt: "2024-01-25",
    updatedAt: "2024-02-15",
  },
  {
    id: "9",
    title: "SNS 클론 프로젝트",
    description: "주요 SNS 기능을 구현한 소셜 네트워크 서비스입니다.",
    thumbnail: "/images/projects/social.jpg",
    technologies: ["React", "GraphQL", "Apollo", "MongoDB"],
    githubUrl: "https://github.com/username/social-network",
    demoUrl: "https://socialnetwork.demo.com",
    content: `
# SNS 클론 프로젝트

## 프로젝트 소개
사용자 프로필, 게시물, 댓글, 좋아요 등의 주요 SNS 기능을 구현한 클론 프로젝트입니다.

## 주요 기능
- 사용자 프로필 관리
- 게시물 및 댓글 작성
- 좋아요 및 팔로우
- 실시간 알림

## 기술 스택
- React
- GraphQL
- Apollo
- MongoDB
    `,
    createdAt: "2024-01-10",
    updatedAt: "2024-02-10",
  },
  {
    id: "10",
    title: "여행 계획 애플리케이션",
    description: "여행 계획 수립 및 관리를 위한 애플리케이션입니다.",
    thumbnail: "/images/projects/travel.jpg",
    technologies: ["Angular", "Firebase", "RxJS", "Bootstrap"],
    githubUrl: "https://github.com/username/travel-planner",
    demoUrl: "https://travelplanner.demo.com",
    content: `
# 여행 계획 애플리케이션

## 프로젝트 소개
여행 일정 계획, 예산 관리, 장소 추천 등 여행자를 위한 종합 서비스를 제공합니다.

## 주요 기능
- 여행 일정 계획
- 예산 관리
- 장소 검색 및 추천
- 여행 메모 및 사진 저장

## 기술 스택
- Angular
- Firebase
- RxJS
- Bootstrap
    `,
    createdAt: "2024-02-15",
    updatedAt: "2024-03-01",
  },
  {
    id: "11",
    title: "음악 스트리밍 서비스",
    description: "개인 취향에 맞는 음악을 제공하는 스트리밍 서비스입니다.",
    thumbnail: "/images/projects/music.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/username/music-stream",
    demoUrl: "https://musicstream.demo.com",
    content: `
# 음악 스트리밍 서비스

## 프로젝트 소개
사용자의 취향을 분석하여 개인화된 음악 추천과 스트리밍 서비스를 제공합니다.

## 주요 기능
- 음악 검색 및 재생
- 개인화 플레이리스트
- 추천 알고리즘
- 실시간 인기 차트

## 기술 스택
- React
- Node.js
- PostgreSQL
- Redis
    `,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-28",
  },
  {
    id: "12",
    title: "비디오 편집 웹 애플리케이션",
    description: "브라우저에서 동작하는 비디오 편집 애플리케이션입니다.",
    thumbnail: "/images/projects/video-editor.jpg",
    technologies: ["Vue.js", "WebAssembly", "FFmpeg", "IndexedDB"],
    githubUrl: "https://github.com/username/video-editor",
    demoUrl: "https://videoeditor.demo.com",
    content: `
# 비디오 편집 웹 애플리케이션

## 프로젝트 소개
웹 브라우저에서 직접 비디오를 편집할 수 있는 애플리케이션으로, 기본적인 편집 기능부터 고급 효과까지 지원합니다.

## 주요 기능
- 비디오 트리밍 및 자르기
- 텍스트 및 이미지 오버레이
- 트랜지션 효과
- 오디오 믹싱

## 기술 스택
- Vue.js
- WebAssembly
- FFmpeg
- IndexedDB
    `,
    createdAt: "2024-02-20",
    updatedAt: "2024-03-05",
  },
];
