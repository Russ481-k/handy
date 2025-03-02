import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Next.js 13의 새로운 기능 살펴보기",
    excerpt:
      "Next.js 13에서 추가된 주요 기능들과 개선사항들을 자세히 알아봅니다.",
    thumbnail: "/images/blog/nextjs-13.jpg",
    content: `
# Next.js 13의 새로운 기능 살펴보기

Next.js 13은 많은 새로운 기능과 개선사항을 가져왔습니다. 이번 글에서는 주요 변경사항들을 자세히 살펴보겠습니다.

## App Directory
새로운 app 디렉토리는 더 나은 프로젝트 구조와 라우팅을 제공합니다.

## Server Components
리액트 서버 컴포넌트를 기본적으로 지원하여 성능이 크게 개선되었습니다.

## Streaming
점진적인 렌더링으로 사용자 경험이 향상되었습니다.
    `,
    date: "2024-03-15",
    readTime: "5분",
    tags: ["Next.js", "React", "Web Development"],
    category: "프론트엔드",
  },
  {
    id: "2",
    title: "타입스크립트로 더 안전한 코드 작성하기",
    excerpt:
      "타입스크립트의 고급 기능을 활용하여 더 안전하고 유지보수하기 좋은 코드를 작성하는 방법을 알아봅니다.",
    thumbnail: "/images/blog/typescript.jpg",
    content: `
# 타입스크립트로 더 안전한 코드 작성하기

타입스크립트는 자바스크립트에 정적 타입을 추가하여 더 안전한 코드를 작성할 수 있게 해줍니다.

## 제네릭 타입
제네릭을 활용하면 재사용 가능한 컴포넌트를 만들 수 있습니다.

## 유니온 타입과 교차 타입
여러 타입을 조합하여 더 복잡한 타입을 만들 수 있습니다.

## 타입 가드
런타임에 타입을 체크하여 더 안전한 코드를 작성할 수 있습니다.
    `,
    date: "2024-03-10",
    readTime: "8분",
    tags: ["TypeScript", "JavaScript", "Programming"],
    category: "프로그래밍",
  },
  {
    id: "3",
    title: "React Query로 상태 관리 최적화하기",
    excerpt:
      "React Query를 사용하여 서버 상태 관리를 최적화하고 사용자 경험을 향상시키는 방법을 알아봅니다.",
    thumbnail: "/images/blog/react-query.jpg",
    content: `
# React Query로 상태 관리 최적화하기

React Query는 서버 상태를 효율적으로 관리하는 라이브러리입니다. 이 글에서는 React Query의 주요 기능과 사용법을 살펴봅니다.

## 캐싱과 자동 리프레시
React Query의 캐싱 시스템으로 서버 요청 횟수를 줄이고 성능을 개선할 수 있습니다.

## 데이터 동기화
여러 컴포넌트 간 데이터 동기화를 쉽게 처리할 수 있습니다.

## 낙관적 업데이트
사용자 경험을 향상시키는 낙관적 업데이트 기법을 적용해봅니다.
    `,
    date: "2024-03-05",
    readTime: "7분",
    tags: ["React", "React Query", "상태 관리"],
    category: "프론트엔드",
  },
  {
    id: "4",
    title: "CSS Grid 레이아웃 마스터하기",
    excerpt:
      "CSS Grid를 사용하여 복잡한 레이아웃을 쉽게 구현하는 방법을 단계별로 알아봅니다.",
    thumbnail: "/images/blog/css-grid.jpg",
    content: `
# CSS Grid 레이아웃 마스터하기

CSS Grid는 웹 레이아웃을 위한 강력한 도구입니다. 이 글에서는 Grid의 기본 개념부터 고급 기법까지 다룹니다.

## Grid 기본 개념
Grid 컨테이너와 아이템의 개념, 그리고 기본 속성들을 살펴봅니다.

## 반응형 그리드 만들기
다양한 화면 크기에 대응하는 그리드 레이아웃을 만드는 방법을 알아봅니다.

## Grid vs Flexbox
상황에 따라 Grid와 Flexbox를 적절히 사용하는 방법을 비교합니다.
    `,
    date: "2024-03-01",
    readTime: "6분",
    tags: ["CSS", "Web Design", "레이아웃"],
    category: "웹 디자인",
  },
  {
    id: "5",
    title: "GraphQL과 REST API 비교 분석",
    excerpt:
      "GraphQL과 REST API의 장단점을 비교하고 프로젝트에 맞는 API 설계 방법을 알아봅니다.",
    thumbnail: "/images/blog/graphql.jpg",
    content: `
# GraphQL과 REST API 비교 분석

API 설계에서 GraphQL과 REST는 각각 다른 철학과 장단점을 가지고 있습니다. 이 글에서는 두 접근법을 비교 분석합니다.

## Over-fetching과 Under-fetching
REST API의 고질적인 문제와 GraphQL이 이를 해결하는 방법을 알아봅니다.

## 성능 최적화
각 방식에서 성능을 최적화하는 전략을 비교합니다.

## 보안 고려사항
GraphQL과 REST API에서의 보안 이슈와 대응 방안을 알아봅니다.
    `,
    date: "2024-02-28",
    readTime: "9분",
    tags: ["GraphQL", "REST API", "백엔드"],
    category: "백엔드",
  },
  {
    id: "6",
    title: "웹 성능 최적화 기법: 로딩 시간 단축하기",
    excerpt:
      "웹사이트 로딩 시간을 획기적으로 줄이는 다양한 최적화 기법을 알아봅니다.",
    thumbnail: "/images/blog/web-performance.jpg",
    content: `
# 웹 성능 최적화 기법: 로딩 시간 단축하기

웹사이트의 성능은 사용자 경험과 SEO에 큰 영향을 미칩니다. 이 글에서는 로딩 시간을 단축하는 다양한 기법을 살펴봅니다.

## 이미지 최적화
이미지 포맷, 크기, 지연 로딩 등 이미지 최적화 기법을 알아봅니다.

## 코드 스플리팅
필요한 코드만 로드하여 초기 로딩 시간을 단축하는 방법을 살펴봅니다.

## 브라우저 캐싱
효율적인 캐싱 전략으로 반복 방문자의 경험을 개선하는 방법을 알아봅니다.
    `,
    date: "2024-02-25",
    readTime: "10분",
    tags: ["웹 성능", "최적화", "사용자 경험"],
    category: "웹 개발",
  },
  {
    id: "7",
    title: "TDD(테스트 주도 개발)로 견고한 코드 작성하기",
    excerpt:
      "테스트 주도 개발 방법론을 이용해 버그가 적고 유지보수가 용이한 코드를 작성하는 방법을 알아봅니다.",
    thumbnail: "/images/blog/tdd.jpg",
    content: `
# TDD(테스트 주도 개발)로 견고한 코드 작성하기

테스트 주도 개발은 코드를 작성하기 전에 테스트를 먼저 작성하는 개발 방법론입니다. 이 글에서는 TDD의 개념과 실천 방법을 알아봅니다.

## Red-Green-Refactor 사이클
TDD의 핵심 사이클을 이해하고 적용하는 방법을 알아봅니다.

## 단위 테스트 작성하기
효과적인 단위 테스트 작성 방법과 도구를 살펴봅니다.

## TDD의 장단점
TDD 적용 시 얻을 수 있는 이점과 주의해야 할 점들을 알아봅니다.
    `,
    date: "2024-02-20",
    readTime: "12분",
    tags: ["TDD", "테스트", "소프트웨어 개발"],
    category: "개발 방법론",
  },
  {
    id: "8",
    title: "Docker를 활용한 개발 환경 구축하기",
    excerpt:
      "Docker를 사용하여 일관된 개발 환경을 구축하고 배포 프로세스를 간소화하는 방법을 알아봅니다.",
    thumbnail: "/images/blog/docker.jpg",
    content: `
# Docker를 활용한 개발 환경 구축하기

Docker는 애플리케이션을 컨테이너화하여 어디서나 동일하게 실행할 수 있게 해주는 도구입니다. 이 글에서는 Docker의 기본 개념과 활용법을 알아봅니다.

## Docker 기본 개념
컨테이너, 이미지, 볼륨 등 Docker의 핵심 개념을 이해합니다.

## Dockerfile 작성하기
효율적인 Dockerfile 작성법과 최적화 기법을 알아봅니다.

## Docker Compose로 다중 컨테이너 관리하기
여러 서비스를 포함한 애플리케이션을 Docker Compose로 관리하는 방법을 알아봅니다.
    `,
    date: "2024-02-15",
    readTime: "8분",
    tags: ["Docker", "DevOps", "컨테이너"],
    category: "개발 환경",
  },
  {
    id: "9",
    title: "웹 접근성: 모두를 위한 웹사이트 만들기",
    excerpt:
      "웹 접근성 표준을 준수하여 모든 사용자가 이용할 수 있는 웹사이트를 만드는 방법을 알아봅니다.",
    thumbnail: "/images/blog/accessibility.jpg",
    content: `
# 웹 접근성: 모두를 위한 웹사이트 만들기

웹 접근성은 모든 사용자가 웹사이트를 이용할 수 있도록 하는 중요한 요소입니다. 이 글에서는 접근성 향상을 위한 방법들을 알아봅니다.

## 시맨틱 HTML
의미 있는, 접근성 높은 HTML 요소를 사용하는 방법을 알아봅니다.

## ARIA 속성 활용하기
복잡한 UI 컴포넌트의 접근성을 향상시키는 ARIA 속성 사용법을 알아봅니다.

## 키보드 네비게이션
마우스를 사용하지 않는 사용자를 위한 키보드 네비게이션 최적화 방법을 알아봅니다.
    `,
    date: "2024-02-10",
    readTime: "7분",
    tags: ["웹 접근성", "HTML", "UI/UX"],
    category: "웹 개발",
  },
  {
    id: "10",
    title: "React 18의 새로운 동시성 기능 이해하기",
    excerpt:
      "React 18에서 도입된 동시성 기능과 이를 활용하여 사용자 경험을 개선하는 방법을 알아봅니다.",
    thumbnail: "/images/blog/react-18.jpg",
    content: `
# React 18의 새로운 동시성 기능 이해하기

React 18은 동시성 기능을 도입하여 UI 렌더링 방식을 혁신적으로 변화시켰습니다. 이 글에서는 주요 기능과 활용법을 알아봅니다.

## Concurrent Rendering
동시적 렌더링의 개념과 작동 원리를 이해합니다.

## Suspense 활용하기
데이터 로딩 상태를 선언적으로 처리하는 Suspense의 활용법을 알아봅니다.

## 자동 배치
여러 상태 업데이트를 효율적으로 배치 처리하는 방법을 알아봅니다.
    `,
    date: "2024-02-05",
    readTime: "9분",
    tags: ["React", "React 18", "동시성"],
    category: "프론트엔드",
  },
  {
    id: "11",
    title: "Redux vs Context API: 상태 관리 방법 비교",
    excerpt:
      "React 애플리케이션에서 Redux와 Context API를 활용한 상태 관리 전략을 비교 분석합니다.",
    thumbnail: "/images/blog/redux-context.jpg",
    content: `
# Redux vs Context API: 상태 관리 방법 비교

React 애플리케이션에서 전역 상태 관리는 중요한 이슈입니다. 이 글에서는 Redux와 Context API를 비교 분석합니다.

## 사용 사례 비교
어떤 상황에서 Redux가 유리하고, 어떤 상황에서 Context API가 적합한지 알아봅니다.

## 성능 고려사항
각 방식에서의 성능 이슈와 최적화 전략을 비교합니다.

## 코드 복잡성
코드 구조와 유지보수 측면에서 두 방식을 비교 평가합니다.
    `,
    date: "2024-02-01",
    readTime: "8분",
    tags: ["React", "Redux", "Context API", "상태 관리"],
    category: "프론트엔드",
  },
  {
    id: "12",
    title: "마이크로 프론트엔드 아키텍처 도입하기",
    excerpt:
      "마이크로 프론트엔드 접근법으로 대규모 웹 애플리케이션을 모듈화하고 확장성을 높이는 방법을 알아봅니다.",
    thumbnail: "/images/blog/micro-frontend.jpg",
    content: `
# 마이크로 프론트엔드 아키텍처 도입하기

마이크로 프론트엔드는 대규모 웹 애플리케이션을 독립적으로 개발, 테스트, 배포할 수 있는 작은 단위로 분할하는 아키텍처 접근법입니다.

## 모듈 페더레이션
Webpack 5의 모듈 페더레이션을 활용한 마이크로 프론트엔드 구현 방법을 알아봅니다.

## 통합 전략
다양한 프레임워크로 개발된 마이크로 프론트엔드를 통합하는 전략을 알아봅니다.

## 팀 구성 및 협업
마이크로 프론트엔드 환경에서 효과적인 팀 구성과 협업 방법을 살펴봅니다.
    `,
    date: "2024-01-28",
    readTime: "11분",
    tags: ["마이크로 프론트엔드", "아키텍처", "모듈 페더레이션"],
    category: "프론트엔드",
  },
];
