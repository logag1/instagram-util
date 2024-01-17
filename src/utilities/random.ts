import fs from 'fs';

export function getRandomNum(a: number = 500, b: number = 2000): number {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export function getRandomComment() {
  const data = fs.readFileSync('./src/comment.json', 'utf8');
  const emoji = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😎', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '😝', '🤑', '🤗', '🤔', '🤭', '🤫', '😺', '😻', '😸', '😽', '🙀', '😿', '😹', '😾', '🐱', '🐈', '🐾', '🐅', '🐆', '🐯', '🦁', '🐱‍🚀'];
  const comments = JSON.parse(data);

  return `${comments[getRandomNum(0, comments.length)]} ${emoji[getRandomNum(0, emoji.length)]}`
}