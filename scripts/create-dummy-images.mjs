#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { createCanvas } from "canvas";

// 팀 더미 이미지 생성을 위한 설정
const teamMembers = [
  {
    name: "CEO",
    filename: "ceo.jpg",
    bgColor: "#4F46E5",
    textColor: "#FFFFFF",
  },
  {
    name: "CFO",
    filename: "cfo.jpg",
    bgColor: "#10B981",
    textColor: "#FFFFFF",
  },
  {
    name: "CTO",
    filename: "cto.jpg",
    bgColor: "#F59E0B",
    textColor: "#FFFFFF",
  },
];

// 디렉토리 생성
const publicDir = path.join(process.cwd(), "public");
const teamDir = path.join(publicDir, "team");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir);
}

// 이미지 생성 함수
function createDummyImage(text, outputPath, bgColor, textColor) {
  const width = 400;
  const height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // 배경
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 텍스트
  ctx.font = "bold 100px Arial";
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  // 파일 저장
  const buffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync(outputPath, buffer);

  console.log(`Created dummy image: ${outputPath}`);
}

// 팀 멤버 이미지 생성
teamMembers.forEach((member) => {
  const outputPath = path.join(teamDir, member.filename);

  // 이미지가 이미 존재하는지 확인
  if (!fs.existsSync(outputPath)) {
    createDummyImage(member.name, outputPath, member.bgColor, member.textColor);
  } else {
    console.log(`Image already exists: ${outputPath}`);
  }
});

console.log("Dummy image creation complete!");
