/**
 *
 * @param res
 * @param err
 * @param code
 * @param key
 * @returns
 */
const errRes = (res: any, err: any, code = 400, key = "err") => {
  return res.json({ status: false, errMsg: err });
};

/**
 *
 * @param res
 * @param data
 * @param code
 * @returns
 */
const okRes = (res: any, data: any, code = 200) => {
  // Success Web Response
  let sendData = { status: true, errMsg: "" };

  if (typeof data == "object") {
    sendData = Object.assign(data, sendData); //merge the objects
  }
  if (typeof code !== "undefined") res.statusCode = code;
  return res.json(sendData);
};

/**
 *
 * @returns
 */
const getOtp = () => Math.floor(100000 + Math.random() * 900000);

const makeid = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result +=
      result.length % 5 != 0
        ? characters[randomIndex]
        : `-${characters[randomIndex]}`;
  }

  return `${result}`;
};

const generateNickname: any = (input: string) => {
  let nickname = '';

  // Check if the input contains Arabic characters
  const arabicRegex = /[\u0600-\u06FF]/;
  if (arabicRegex.test(input)) {
    // If Arabic characters are present, generate an 8-character alphanumeric nickname
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      nickname += alphanumericChars.charAt(randomIndex);
    }
  } else {
    // If the input is in English, use the input as the nickname (or truncate if it's longer than 8 characters)
    nickname = input.substring(0, 8);
  }

  return nickname;
};


const sixMonthsLaterFunction = (date: any) => {
  const startDate = new Date(date); // Replace this with your actual start date
  const sixMonthsLater = new Date(startDate);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

  return sixMonthsLater;
};

export {generateNickname, okRes, errRes, getOtp, makeid, sixMonthsLaterFunction };
