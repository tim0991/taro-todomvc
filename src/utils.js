const onEnter = (e, cb) => {
  console.log(e);
  if (e.key === 'Enter') {
    cb(e);
  }
};


export {
  onEnter,
};