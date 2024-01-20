import { BookmarkCategory } from "../types";

export const bmOfAssets = (): BookmarkCategory => {
  return {
    title: "资源",
    children: [
      bmOfImages,
      bmOfIcons,
      bmOfVectors,
      bmOfEbooks,
      bmOfMovies,
      bmOfFonts,
      bmOfVideos,
      bmOfSounds,
    ]
  }
}

const bmOfEbooks = {
  title: "电子书",
  children: []
}
const bmOfIcons = {
  title: "图标",
  children: []
}
const bmOfImages = {
  title: "图片",
  children: []
}
const bmOfVectors = {
  title: "矢量图",
  children: []
}
const bmOfSounds = {
  title: "声音",
  children: []
}
const bmOfMovies = {
  title: "电影",
  children: []
}
const bmOfVideos = {
  title: "视频",
  children: []
}
const bmOfFonts = {
  title: "字体",
  children: []
}