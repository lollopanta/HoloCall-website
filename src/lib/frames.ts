export const FRAME_COUNT = 192;

export const getFrameSrc = (frame: number) => {
  const fileName = String(frame).padStart(6, "0");
  return `/img/animation/${fileName}.png`;
};
