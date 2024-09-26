const GetColor = (username) => {
  const colors = [
    "#38bdf8", // sky-400
    "#FFA429", // custom color already in hex
    "#f87171", // red-400
    "#4ade80", // green-400
    "#a78bfa", // purple-400
    "#facc15", // yellow-400
  ];

  const index = username?.charCodeAt(0) % colors.length;

  return colors[index];
};
export default GetColor;
