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
];
