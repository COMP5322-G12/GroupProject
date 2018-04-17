export default {
  convertBirthday: (birthday) => {
    const birthdayDateObject = new Date(birthday);
    // TODO:: if is not a object
    const day = (birthdayDateObject.getDate());
    const month = (birthdayDateObject.getMonth()) + 1;
    const year = (birthdayDateObject.getFullYear());
    return {
      BirthDay: day >= 10 ? day.toString() : `0${day}`,
      BirthMonth: month >= 10 ? month.toString() : `0${month}`,
      BirthYear: year.toString(),
    };
  },
};
