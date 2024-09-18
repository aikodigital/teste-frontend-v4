const colors = ["#FFA07A"];
// "#A0522D ", "#8B4513 ","#FF8C00"
export const getRandomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)] || "#FF8C00";
};
