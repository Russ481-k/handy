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
];
