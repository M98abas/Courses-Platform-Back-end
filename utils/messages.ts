interface Message {
  ar: string;
  en: string;
}

interface MessageMap {
  [key: string]: Message;
}

let messages: MessageMap = {
 violanceBlocked: {
    ar: "نظرا لمخالفة الشروط والاحكام لقد تم ايقاف اشتراكك في هذا الكورس",
    en: "Due to violating the terms and conditions, your participation in this course has been suspended",
  },
  violanceError:{
    ar: "عذرا ممنوع تصوير الشاشة او التقاط الصور",
    en: "Sorry, screen recording or taking pictures is prohibited",
  },
  likedMessage: {
    ar: "عذرًا، غير مسموح باستخدام هذا الحساب وذلك لارتباطه بجهاز اخر.",
    en: "Sorry, you're not allowed to see this video. Kindly contact the support.",
  },
  success: {
    ar: "كل شيء على ما يرام",
    en: "All good",
  },
  verfiedSuccess: {
    ar: "تم التحقق من الحساب",
    en: "The account is verified",
  },
  dataNotFound: {
    ar: "لا توجد بيانات",
    en: "data not exist",
  },
  checkData: {
    ar: "تحقق مرة أخرى من البيانات التي قمت بإدخالها",
    en: "Double check the data you've entered",
  },
  checkSendData: {
    ar: "تحقق مرة أخرى من البيانات التي قمت بارسالها",
    en: "Double check the data you've sended",
  },
  passwordWrong: {
    ar: "لقد قمت بادخال الرمز بصورة خاطئة, الرجاء حاول مرة",
    en: "The password is wronge, try again.",
  },
  weakPassword: {
    ar: "كلمة المرور ضعيفة، يرجى تعزيز قوتها",
    en: "Password is too weak. Please make it stronger",
  },
  accountNotActive: {
    ar: "الحساب غير مفعل او محذوف, الرجاء التواصل مع القسم التقني",
    en: "The account is not active or deleted, check with the technical team.",
  },
  emailNotExist: {
    ar: "الايميل غير موجود",
    en: "The email not exist",
  },
  emailExist: {
    ar: "البريد الإلكتروني موجود بالفعل!",
    en: "The email already exists!",
  },
  wentWrong: {
    ar: "حدث خطأ ما",
    en: "Something went wrong",
  },
  wrongOtp: {
    ar: "رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى",
    en: "The OTP is wrong. Please try again",
  },
  notFound: {
    ar: "البريد الإلكتروني غير موجود، يرجى التحقق من البريد الإلكتروني أو الاتصال بفريق الدعم الفني",
    en: "The email is not found. Double check the email or contact the tech team",
  },
  activeError: {
    ar: "الحساب غير نشط، يرجى التحقق مع الفريق الفني",
    en: "The account is not active. Check with the technical team",
  },
  OtpWrongMsg: {
    ar: "لقد قمت بادخال الOTP بصورة خاطئة",
    en: "The OTP is wrong, Kindly try again.",
  },
usedMessage: {
    ar: "هذا الرمز غير صالح او مستخدم",
    en: "This code is invalid or used",
  },
  reachLimited: {
    ar: "عذرًا، غير مسموح لك بمشاهدة هذا الفيديو، يرجى التواصل مع الدعم الفني.",
    en: "Sorry, you're not allowed to see this video. Kindly contact the support.",
  },
};

const messageReturn = (title: keyof MessageMap): Message | undefined => {
  return messages[title];
};

export default messageReturn;
