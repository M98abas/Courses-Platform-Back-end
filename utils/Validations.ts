export default class Validation {
  constructor(parameters: any) {}
  static adminRegister = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static login = (must = true) => ({
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static otpAdmin = (must = true) => ({
    otp: {
      presence: must,
      type: "string",
    },
  
  });
  static otp = (must = true) => ({
    otp: {
      presence: must,
      type: "number",
    },
  });
  static userRegister = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },

    address: {
      presence: must,
      type: "string",
    },
    phoneNumber: {
      presence: must,
      type: "string",
    },
    description: {
      presence: must,
      type: "string",
    },
    contactWith: {
      presence: must,
      type: "string",
    },
    contry: {
      presence: must,
      type: "string",
    },
    city: {
      presence: must,
      type: "string",
    },
    levelOfExperience: {
      presence: must,
      type: "string",
    },
  });
  static OTPChecking = (must = true) => ({
    email: {
      presence: must,
      type: "string",
    },
    otp: {
      presence: must,
      type: "number",
    },
  });
  static courses = (must = true) => ({
    titleAr: {
      presence: must,
      type: "string",
    },
    descriptionAr: {
      presence: must,
      type: "string",
    },
    imgUrl: {
      presence: must,
      type: "string",
    },
    titleEn: {
      presence: must,
      type: "string",
    },
    descriptionEn: {
      presence: must,
      type: "string",
    },
  });
  static content = (must = true) => ({
    titleAr: {
      presence: must,
      type: "string",
    },
    descriptionAr: {
      presence: must,
      type: "string",
    },
    videoURL: {
      presence: must,
      type: "string",
    },
    titleEn: {
      presence: must,
      type: "string",
    },
    descriptionEn: {
      presence: must,
      type: "string",
    },
  });
  static token = (must = true) => ({
    expire_at: {
      presence: must,
      type: "string",
    },
    subCoursesId: {
      presence: must,
      type: "number",
    },
  });
  static visitor = (must = true) => ({
    mobileID: {
      presence: must,
      type: "string",
    },
  });
  static copon = (must = true) => ({
    text: {
      presence: must,
      type: "string",
    },
    percentage: {
      presence: must,
      type: "number",
    },
  });
  static anno = (must = true) => ({
    imgURL: {
      presence: must,
      type: "string",
    },
  });
  static venom = (must = true) => ({
    traders: {
      presence: must,
      type: "number",
    },
    users: {
      presence: must,
      type: "number",
    },
    toper: {
      presence: must,
      type: "number",
    },
  });
  static discount = (must = true) => ({
    target: {
      presence: must,
      type: "string",
    },
    value: {
      presence: must,
      type: "number",
    },
  });
  static payments = (must = true) => ({
    title: {
      presence: must,
      type: "string",
    },
    description: {
      presence: must,
      type: "string",
    },
    detail1: {
      presence: must,
      type: "string",
    },
    detail2: {
      presence: must,
      type: "string",
    },
  });

  static contract = (must = true) => ({
    amount: {
      presence: must,
      type: "number",
    },
  });
  static ads = (must = true) => ({
    company: {
      presence: must,
      type: "string",
    },
    url: {
      presence: must,
      type: "string",
    },
    titleAr: {
      presence: must,
      type: "string",
    },
    titleEn: {
      presence: must,
      type: "string",
    },
    imgUrl: {
      presence: must,
      type: "string",
    },
    descriptionAr: {
      presence: must,
      type: "string",
    },
    descriptionEn: {
      presence: must,
      type: "string",
    },
  });
  static feedback = (must = true) => ({
    title: {
      presence: must,
      type: "string",
    },
    target: {
      presence: must,
      type: "string",
    },
  });

  static notification = (must = true) => ({
    message: {
      presence: must,
      type: "string",
    },
    target: {
      presence: must,
      type: "string",
    },
  });
  static commonQuestion = (must = true) => ({
    questionEn: {
      presence: must,
      type: "string",
    },
    questionAr: {
      presence: must,
      type: "string",
    },
    answerEn: {
      presence: must,
      type: "string",
    },
    answerAr: {
      presence: must,
      type: "string",
    },
  });
}
