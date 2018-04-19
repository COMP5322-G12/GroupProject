export default {
  encode: image => new Promise((resolve) => {
    const reader = new FileReader();//eslint-disable-line
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(image);
  }),
};
