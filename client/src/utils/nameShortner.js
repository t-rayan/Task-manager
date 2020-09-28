const nameShortner = (name) => {
  if (name) {
    const fullName = name.split(" ")[0];
    return fullName;
  }
};

export default nameShortner;
