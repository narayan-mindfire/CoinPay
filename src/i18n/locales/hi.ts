const hi = {
  common: {
    appName: 'CoinPay',
    success: 'Success',
    error: 'Error',
    info: 'Information',
    warning: 'Warning',
  },
  onboarding: {
    slide1: "करोड़ों लोगों द्वारा भरोसेमंद, एक हिस्से का हिस्सा",
    slide2: "विदेश में पैसे खर्च करें, और अपने खर्च को ट्रैक करें",
    slide3: "दुनिया के किसी भी कोने से पैसे प्राप्त करें",
    next: "आगे"
  },
  otpVerification: {
    title: "अपने फ़ोन की पुष्टि करें",
    subtitle: "हमने एक 6-अंकों का कोड भेजा है",
    resend: "कोड नहीं मिला?",
    resendLink: "फिर से भेजें",
    verifyButton: "अपना नंबर सत्यापित करें"
  },
  registration: {
    title: "अपना\nCoinpay खाता बनाएं",
    subtitle:
      "Coinpay एक शक्तिशाली उपकरण है जो आपको आसानी से पैसे भेजने, प्राप्त करने और अपने लेन-देन को ट्रैक करने की सुविधा देता है।",
    signup: "साइन अप करें",
    login: "लॉग इन करें",
    termsAndPolicy:
      "जारी रखने पर आप हमारी सेवा की शर्तों और गोपनीयता नीति को स्वीकार करते हैं",
    terms: "सेवा की शर्तें",
    and: "और",
    privacy: "गोपनीयता नीति",
  },
  phoneVerification: {
    title: "खाता बनाएँ",
    subtitle: "अपने खाते को सत्यापित करने के लिए मोबाइल नंबर दर्ज करें",
    phoneLabel: "फ़ोन",
    passwordLabel: "पासवर्ड",
    mobilePlaceholder: "मोबाइल नंबर",
    passwordPlaceholder: "● ● ● ● ● ● ●",
    signUpButton: "साइन अप करें",
    modal: {
      confirm: "पुष्टि करें",
      cancel: "रद्द करें",
    },
  },
  verifyPhoneModal: {
    verifyTitle: "कोड भेजने से पहले अपना फ़ोन नंबर सत्यापित करें",
isThisCorrect: "क्या यह सही है?",
yes: "हाँ",
no: "नहीं",
  },
  addCountry: {
    countryOfResidence: "निवास देश",
  countrySubtitle: "यह जानकारी आपके पहचान दस्तावेज़ से मेल खानी चाहिए।",
  countryLabel: "देश",
  continue: "आगे बढ़ें",
  },
  addEmail: {
    title: "अपना ईमेल जोड़ें",
    subtitle: "यह जानकारी आपके पहचान पत्र से मेल खानी चाहिए",
    label: "ईमेल",
    placeholder: "name@example.com",
    button: "आगे बढ़ें",
  },
  homeAddress:{
    title: "घर का पता",
  subtitle: "यह जानकारी आपके पहचान पत्र से मेल खानी चाहिए",
  addressLabel: "पता लाइन",
  addressPlaceholder: "श्री जॉन डो",
  cityLabel: "शहर",
  cityPlaceholder: "शहर, राज्य",
  postCodeLabel: "पिनकोड",
  postCodePlaceholder: "उदाहरण: 00000",
  continue: "आगे बढ़ें",
  },
  personalInfo: {
    title: "अपनी व्यक्तिगत जानकारी जोड़ें",
    subtitle: "यह जानकारी आपके पहचान पत्र से मेल खाना चाहिए",
    fullName: "पूरा नाम",
    username: "उपयोगकर्ता नाम",
    usernamePlaceholder: "उपयोगकर्ता नाम",
    namePlaceholder: "श्री जॉन डो",
    dob: "जन्म तिथि",
    dobPlaceholder: "माह/दिन/वर्ष",
    confirm: "पुष्टि करें",
    continue: "आगे बढ़ें",
  },
  scanId: {
    title: "अपनी पहचान सत्यापित करने के लिए आईडी स्कैन करें",
    subtitle: "अपने फ़ोन से कुछ टैप में अपनी पहचान की पुष्टि करें",
    scanButton: "स्कैन करें",
  },
  takeSelfie: {
    title: "अपनी पहचान सत्यापित करने के लिए सेल्फ़ी लें",
    subtitle:
      "अपने फ़ोन के कैमरे से त्वरित और आसान पहचान सत्यापन। अपनी पहचान की पुष्टि के लिए एक सेल्फ़ी लें।",
    button: "सेल्फ़ी लें",
  },
  finishSetup: {
    title: "आपका खाता सेट किया जा रहा है",
    subtitle: "हम आपके डेटा का विश्लेषण कर रहे हैं सत्यापन के लिए",
    steps: {
      s1: "फ़ोन सत्यापित किया गया",
      s2: "दस्तावेज़ की जाँच की जा रही है",
      s3: "फ़ोटो सत्यापित की जा रही है",
    },
  },
  scanDoc: {
    message: "कैमरा दिखाने के लिए हमें आपकी अनुमति चाहिए",
    scantext: "कृपया अपने ID कार्ड का \n सामने वाला हिस्सा स्कैन करें",
    verificationText: "ID सत्यापन \n प्रगति में है",
    subtext: "थोड़ा इंतजार करें, यह ज़्यादा समय नहीं लेगा",
    next: "आगे",
    requestpermission: "अनुमति दें",
    scanButton: "स्कैन करें",
  },
  
  selfieCam: {
    subtext: "अपना फोटो हाथ की लंबाई से लें। सुनिश्चित करें कि\nआपका पूरा चेहरा दिखाई दे।"
  },
  welcome: {
    title: "बधाई हो! CoinPay में आपका स्वागत है",
    subtitle:
      "हमें खुशी है कि आप हमारे साथ हैं। अब समय है पैसे भेजने, प्राप्त करने और अपने खर्च को ट्रैक करने का।",
    continue: "जारी रखें",
  },
  login: {
    title: "कॉइनपे में लॉग इन करें",
    subtitle: "लॉग इन करने के लिए अपना रजिस्टर्ड फोन नंबर दर्ज करें।",
    phoneLabel: "फ़ोन",
    passwordLabel: "पासवर्ड",
    placeholderPhone: "मोबाइल नंबर",
    placeholderPassword: "◉ ◉ ◉ ◉ ◉ ◉ ◉",
    forgotPassword: "पासवर्ड भूल गए?",
    loginButton: "लॉग इन करें",
  },
  setupPin: {
    title: "पासकोड बनाएं",
    subtitle: "यह जानकारी आपके पहचान पत्र से मेल खानी चाहिए",
    continue: "जारी रखें",
  },
  addCard: {
    title: "अपना कार्ड जोड़ें",
    subtitle: "हमारे प्लेटफॉर्म के साथ वित्तीय संगठन की शक्ति का अनुभव करें",
    button: "+  अपना कार्ड जोड़ें",
  },
  cardForm: {
    title: "कार्ड जोड़ें",
    subtitle: "नीचे दिए गए बॉक्स में अपना क्रेडिट कार्ड दर्ज करें।",
    nameLabel: "खाता धारक का नाम",
    namePlaceholder: "पूरा नाम",
    emailLabel: "ईमेल",
    emailPlaceholder: "name@example.com",
    cardLabel: "कार्ड नंबर",
    cardPlaceholder: "1234 5678 9101 2345    एमएम/वायवाय       सीवीवी",
    button: "सत्यापित करें",
  },
  verifyCard: {
    title: "अपने कार्ड को सत्यापित करें",
    subtitle: "हमने 6 अंकों का कोड भेजा है ",
    resendText: "कोड नहीं मिला?",
    resendLink: " पुनः भेजें",
    verifyButton: "सत्यापित करें",
  },
  cardList: {
    title: "कार्ड सूची",
    subtitle: "आपके खाते में सभी कार्ड",
    successMessage: "आपका कार्ड सफलतापूर्वक जोड़ा गया",
    button: "जारी रखें",
  },
};

export default hi;
