const newChar = () => {
  //Return a random Character.
  //Math.random() * (max - min) + min;
  var r = Math.random() * (126 - 32) + 32;
  return String.fromCharCode(r);
};

export default newChar;
