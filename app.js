const CITY_PRESETS = [
  // Tamil Nadu
  { name: 'Chennai',           region: 'Tamil Nadu',        lat: 13.0827,  lon: 80.2707  },
  { name: 'Madurai',           region: 'Tamil Nadu',        lat: 9.9252,   lon: 78.1198  },
  { name: 'Thanjavur',         region: 'Tamil Nadu',        lat: 10.7870,  lon: 79.1378  },
  { name: 'Kanchipuram',       region: 'Tamil Nadu',        lat: 12.8333,  lon: 79.7000  },
  { name: 'Tiruchirapalli',    region: 'Tamil Nadu',        lat: 10.7905,  lon: 78.7047  },
  { name: 'Coimbatore',        region: 'Tamil Nadu',        lat: 11.0168,  lon: 76.9558  },
  { name: 'Tirunelveli',       region: 'Tamil Nadu',        lat: 8.7139,   lon: 77.7567  },
  // Andhra Pradesh / Telangana
  { name: 'Tirupati',          region: 'Andhra Pradesh',    lat: 13.6288,  lon: 79.4192  },
  { name: 'Vijayawada',        region: 'Andhra Pradesh',    lat: 16.5062,  lon: 80.6480  },
  { name: 'Visakhapatnam',     region: 'Andhra Pradesh',    lat: 17.6868,  lon: 83.2185  },
  { name: 'Hyderabad',         region: 'Telangana',         lat: 17.3850,  lon: 78.4867  },
  { name: 'Warangal',          region: 'Telangana',         lat: 17.9784,  lon: 79.5941  },
  // Karnataka
  { name: 'Bengaluru',         region: 'Karnataka',         lat: 12.9716,  lon: 77.5946  },
  { name: 'Mysuru',            region: 'Karnataka',         lat: 12.2958,  lon: 76.6394  },
  { name: 'Udupi',             region: 'Karnataka',         lat: 13.3409,  lon: 74.7421  },
  { name: 'Mangaluru',         region: 'Karnataka',         lat: 12.9141,  lon: 74.8560  },
  { name: 'Dharwad',           region: 'Karnataka',         lat: 15.4589,  lon: 75.0078  },
  // Kerala
  { name: 'Thiruvananthapuram',region: 'Kerala',            lat: 8.5241,   lon: 76.9366  },
  { name: 'Kochi',             region: 'Kerala',            lat: 9.9312,   lon: 76.2673  },
  { name: 'Kozhikode',         region: 'Kerala',            lat: 11.2588,  lon: 75.7804  },
  { name: 'Thrissur',          region: 'Kerala',            lat: 10.5276,  lon: 76.2144  },
  { name: 'Guruvayur',         region: 'Kerala',            lat: 10.5938,  lon: 76.0417  },
  // Diaspora
  { name: 'Singapore',         region: 'Singapore',         lat: 1.3521,   lon: 103.8198 },
  { name: 'Kuala Lumpur',      region: 'Malaysia',          lat: 3.1390,   lon: 101.6869 },
  { name: 'New York',          region: 'USA',               lat: 40.7128,  lon: -74.0060 },
  { name: 'London',            region: 'UK',                lat: 51.5074,  lon: -0.1278  },
  { name: 'Sydney',            region: 'Australia',         lat: -33.8688, lon: 151.2093 }
];

const RSS_SOURCES = [
  { name: 'Hinduism Today',        url: 'https://www.hinduismtoday.com/feed/',                        tag: 'Featured'   },
  { name: 'Indica Today',          url: 'https://www.indica.today/feed/',                             tag: 'Indic'      },
  { name: 'Speaking Tree',         url: 'https://www.speakingtree.in/rss',                            tag: 'Spiritual'  },
  { name: 'TemplePurohit',         url: 'https://www.templepurohit.com/feed/',                        tag: 'Temples'    },
  { name: 'Sadhguru Wisdom',       url: 'https://isha.sadhguru.org/in/en/wisdom/rss.xml',             tag: 'Spiritual'  },
  { name: 'Ramakrishna Math',      url: 'https://belurmath.org/feed/',                                tag: 'Mutt'       },
  { name: 'Sringeri Mutt',         url: 'https://www.sringeri.net/feed/',                             tag: 'Mutt'       },
  { name: 'Aanmeegam',             url: 'https://aanmeegam.in/feed/',                                 tag: 'Tamil'      },
  { name: 'Tamil and Vedas',       url: 'https://tamilandvedas.com/feed/',                            tag: 'Tamil'      },
  { name: 'Tamil Brahmins Forum',  url: 'https://www.tamilbrahmins.com/forums/-/index.rss',           tag: 'Community'  },
  { name: 'Mathrubhumi Astrology', url: 'https://english.mathrubhumi.com/rss/astrology.xml',          tag: 'Jyotish'    }
];

// Astronomical term names per language (ta / te / kn / ml / en)
const TITHI_NAMES = {
  ta: ['பிரதமை','துதியை','திருதியை','சதுர்த்தி','பஞ்சமி','சஷ்டி','சப்தமி','அஷ்டமி','நவமி','தசமி','ஏகாதசி','துவாதசி','திரயோதசி','சதுர்தசி','பௌர்ணமி','பிரதமை','துதியை','திருதியை','சதுர்த்தி','பஞ்சமி','சஷ்டி','சப்தமி','அஷ்டமி','நவமி','தசமி','ஏகாதசி','துவாதசி','திரயோதசி','சதுர்தசி','அமாவாசை'],
  te: ['పాడ్యమి','విదియ','తదియ','చవితి','పంచమి','షష్ఠి','సప్తమి','అష్టమి','నవమి','దశమి','ఏకాదశి','ద్వాదశి','త్రయోదశి','చతుర్దశి','పౌర్ణమి','పాడ్యమి','విదియ','తదియ','చవితి','పంచమి','షష్ఠి','సప్తమి','అష్టమి','నవమి','దశమి','ఏకాదశి','ద్వాదశి','త్రయోదశి','చతుర్దశి','అమావాస్య'],
  kn: ['ಪಾಡ್ಯಮಿ','ಬಿದಿಗೆ','ತದಿಗೆ','ಚವಿತಿ','ಪಂಚಮಿ','ಷಷ್ಠಿ','ಸಪ್ತಮಿ','ಅಷ್ಟಮಿ','ನವಮಿ','ದಶಮಿ','ಏಕಾದಶಿ','ದ್ವಾದಶಿ','ತ್ರಯೋದಶಿ','ಚತುರ್ದಶಿ','ಹುಣ್ಣಿಮೆ','ಪಾಡ್ಯಮಿ','ಬಿದಿಗೆ','ತದಿಗೆ','ಚವಿತಿ','ಪಂಚಮಿ','ಷಷ್ಠಿ','ಸಪ್ತಮಿ','ಅಷ್ಟಮಿ','ನವಮಿ','ದಶಮಿ','ಏಕಾದಶಿ','ದ್ವಾದಶಿ','ತ್ರಯೋದಶಿ','ಚತುರ್ದಶಿ','ಅಮಾವಾಸ್ಯೆ'],
  ml: ['പ്രതിപദം','ദ്വിതീയ','തൃതീയ','ചതുർത്ഥി','പഞ്ചമി','ഷഷ്ഠി','സപ്തമി','അഷ്ടമി','നവമി','ദശമി','ഏകാദശി','ദ്വാദശി','ത്രയോദശി','ചതുർദശി','പൗർണമി','പ്രതിപദം','ദ്വിതീയ','തൃതീയ','ചതുർത്ഥി','പഞ്ചമി','ഷഷ്ഠി','സപ്തമി','അഷ്ടമി','നവമി','ദശമി','ഏകാദശി','ദ്വാദശി','ത്രയോദശി','ചതുർദശി','അമാവാസ്യ'],
  en: ['Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashti','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Pournami','Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashti','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Amavasya']
};

const NAKSHATRA = {
  ta: ['அஸ்வினி','பரணி','கார்த்திகை','ரோகிணி','மிருகசிரிஷம்','திருவாதிரை','புனர்பூசம்','பூசம்','ஆயில்யம்','மகம்','பூரம்','உத்திரம்','ஹஸ்தம்','சித்திரை','சுவாதி','விசாகம்','அனுஷம்','கேட்டை','மூலம்','பூராடம்','உத்திராடம்','திருவோணம்','அவிட்டம்','சதயம்','பூரட்டாதி','உத்திரட்டாதி','ரேவதி'],
  te: ['అశ్వని','భరణి','కృత్తిక','రోహిణి','మృగశిర','ఆర్ద్ర','పునర్వసు','పుష్యమి','ఆశ్లేష','మఖ','పుబ్బ','ఉత్తర','హస్త','చిత్త','స్వాతి','విశాఖ','అనూరాధ','జ్యేష్ఠ','మూల','పూర్వాషాఢ','ఉత్తరాషాఢ','శ్రవణ','ధనిష్ఠ','శతభిష','పూర్వాభాద్ర','ఉత్తరాభాద్ర','రేవతి'],
  kn: ['ಅಶ್ವಿನಿ','ಭರಣಿ','ಕೃತ್ತಿಕೆ','ರೋಹಿಣಿ','ಮೃಗಶಿರ','ಆರ್ದ್ರ','ಪುನರ್ವಸು','ಪುಷ್ಯ','ಆಶ್ಲೇಷ','ಮಘ','ಪೂರ್ವ','ಉತ್ತರ','ಹಸ್ತ','ಚಿತ್ತ','ಸ್ವಾತಿ','ವಿಶಾಖ','ಅನುರಾಧ','ಜ್ಯೇಷ್ಠ','ಮೂಲ','ಪೂರ್ವಾಷಾಢ','ಉತ್ತರಾಷಾಢ','ಶ್ರವಣ','ಧನಿಷ್ಠ','ಶತಭಿಷ','ಪೂರ್ವಭಾದ್ರ','ಉತ್ತರಭಾದ್ರ','ರೇವತಿ'],
  ml: ['അശ്വതി','ഭരണി','കാർത്തിക','രോഹിണി','മകയിരം','തിരുവാതിര','പുണർതം','പൂയം','ആയില്യം','മകം','പൂരം','ഉത്രം','അത്തം','ചിത്ര','ചോതി','വിശാഖം','അനിഴം','തൃക്കേട്ട','മൂലം','പൂരാടം','ഉത്രാടം','തിരുവോണം','അവിട്ടം','ചതയം','പൂരുരുട്ടാതി','ഉത്രട്ടാതി','രേവതി'],
  en: ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Moola','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati']
};

const RASI = {
  ta: ['மேஷம்','ரிஷபம்','மிதுனம்','கர்கடகம்','சிம்மம்','கன்னி','துலாம்','விருச்சிகம்','தனுசு','மகரம்','கும்பம்','மீனம்'],
  te: ['మేష','వృషభ','మిధున','కర్కాటక','సింహ','కన్య','తుల','వృశ్చిక','ధను','మకర','కుంభ','మీన'],
  kn: ['ಮೇಷ','ವೃಷಭ','ಮಿಥುನ','ಕರ್ಕಾಟಕ','ಸಿಂಹ','ಕನ್ಯ','ತುಲ','ವೃಶ್ಚಿಕ','ಧನು','ಮಕರ','ಕುಂಭ','ಮೀನ'],
  ml: ['മേടം','ഇടവം','മിഥുനം','കർക്കിടകം','ചിങ്ങം','കന്നി','തുലാം','വൃശ്ചികം','ധനു','മകരം','കുംഭം','മീനം'],
  en: ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']
};

const I18N = {
  ta: {
    appTitle: 'தக்ஷிண பஞ்சாங்கம்', calc: 'கணக்கிடு', date: 'தேதி', city: 'நகரம்', lat: 'அகலாங்கம் (Lat)', lon: 'நெட்டாங்கம் (Lon)',
    useLoc: 'என் இருப்பிடம்', calculate: 'கணக்கு', reminders: 'நினைவூட்டு இயக்கு', results: 'இன்றைய பலன்கள்', news: 'பக்தி செய்திகள்',
    footer: 'ஆஃப்லைன் PWA • client-side மட்டும்', monthTitle: 'மாத பஞ்சாங்கம்',
    rahu: 'ராகு காலம்', yama: 'யமகண்டம்', abhijit: 'அபிஜித் முஹூர்த்தம்', shashti: 'சஷ்டி நிலை', amrita: 'அமிர்த காலம்', brahma: 'பிரஹ்ம முகூர்த்தம்',
    tivaraatri: 'திவராத்திரி', ausp: 'மங்கள நாள்', shashtiMsg: 'சஷ்டி விரதம் ({paksha}) — காலை பூஜை மறக்காதீங்க!', noShashti: 'இன்று சஷ்டி இல்லை',
    mondayTuesday: 'ஆம்', no: 'இல்லை', goodNak: 'மங்கல நட்சத்திரம்!', notMarked: 'சாதாரண நாள்', rssLoad: 'புதுப்பி',
    shuklaPaksha: 'சுக்ல பக்ஷம்', krishnaPaksha: 'கிருஷ்ண பக்ஷம்',
    remSet: 'ராகு காலம் தொடங்க 30 நிமிடங்களுக்கு முன் நினைவூட்டு அமைக்கப்பட்டது', remNow: 'ராகு காலம் தொடங்க போகுது—பூஜை தள்ளி வைக்கலாம்',
    weekdays: ['Sun<br>ஞா', 'Mon<br>தி', 'Tue<br>செ', 'Wed<br>பு', 'Thu<br>வி', 'Fri<br>வெ', 'Sat<br>ச'], festival: 'விழா'
  },
  te: {
    appTitle: 'దక్షిణ పంచాంగం', calc: 'లెక్కించు', date: 'తేది', city: 'నగరం', lat: 'అక్షాంశం (Lat)', lon: 'రేఖాంశం (Lon)',
    useLoc: 'నా స్థానం', calculate: 'లెక్కించు', reminders: 'రిమైండర్ ప్రారంభించు', results: 'నేటి పంచాంగం', news: 'భక్తి వార్తలు',
    footer: 'Offline PWA • క్లయింట్ సైడ్ మాత్రమే', monthTitle: 'నెల పంచాంగం',
    rahu: 'రాహు కాలం', yama: 'యమగండం', abhijit: 'అభిజిత్ ముహూర్తం', shashti: 'షష్ఠి', amrita: 'అమృత కాలం', brahma: 'బ్రహ్మ ముహూర్తం',
    tivaraatri: 'శివరాత్రి', ausp: 'శుభ దినం', shashtiMsg: 'షష్ఠి వ్రతం ({paksha}) — ఉదయం పూజ మర్చిపోకండి!', noShashti: 'నేడు షష్ఠి లేదు',
    mondayTuesday: 'అవును', no: 'కాదు', goodNak: 'మంగళ నక్షత్రం!', notMarked: 'సాధారణ రోజు', rssLoad: 'రిఫ్రెష్',
    shuklaPaksha: 'శుక్ల పక్షం', krishnaPaksha: 'కృష్ణ పక్షం',
    remSet: 'రాహు కాలానికి 30 నిమిషాల ముందు రిమైండర్ సెట్ చేయబడింది', remNow: 'రాహు కాలం మొదలవుతోంది—పూజ వాయిదా వేయండి',
    weekdays: ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'], festival: 'పండుగ'
  },
  kn: {
    appTitle: 'ದಕ್ಷಿಣ ಪಂಚಾಂಗ', calc: 'ಲೆಕ್ಕಿಸು', date: 'ದಿನಾಂಕ', city: 'ನಗರ', lat: 'ಅಕ್ಷಾಂಶ (Lat)', lon: 'ರೇಖಾಂಶ (Lon)',
    useLoc: 'ನನ್ನ ಸ್ಥಳ', calculate: 'ಲೆಕ್ಕಿಸು', reminders: 'ರಿಮೈಂಡರ್ ಪ್ರಾರಂಭಿಸು', results: 'ಇಂದಿನ ಪಂಚಾಂಗ', news: 'ಭಕ್ತಿ ಸುದ್ದಿ',
    footer: 'Offline PWA • ಕ್ಲೈಂಟ್ ಸೈಡ್ ಮಾತ್ರ', monthTitle: 'ಮಾಸಿಕ ಪಂಚಾಂಗ',
    rahu: 'ರಾಹು ಕಾಲ', yama: 'ಯಮಗಂಡ', abhijit: 'ಅಭಿಜಿತ್ ಮುಹೂರ್ತ', shashti: 'ಷಷ್ಠಿ', amrita: 'ಅಮೃತ ಕಾಲ', brahma: 'ಬ್ರಹ್ಮ ಮುಹೂರ್ತ',
    tivaraatri: 'ಶಿವರಾತ್ರಿ', ausp: 'ಶುಭ ದಿನ', shashtiMsg: 'ಷಷ್ಠಿ ವ್ರತ ({paksha}) — ಬೆಳಿಗ್ಗೆ ಪೂಜೆ ಮರೆಯಬೇಡಿ!', noShashti: 'ಇಂದು ಷಷ್ಠಿ ಇಲ್ಲ',
    mondayTuesday: 'ಹೌದು', no: 'ಇಲ್ಲ', goodNak: 'ಮಂಗಳ ನಕ್ಷತ್ರ!', notMarked: 'ಸಾಮಾನ್ಯ ದಿನ', rssLoad: 'ರಿಫ್ರೆಶ್',
    shuklaPaksha: 'ಶುಕ್ಲ ಪಕ್ಷ', krishnaPaksha: 'ಕೃಷ್ಣ ಪಕ್ಷ',
    remSet: 'ರಾಹು ಕಾಲಕ್ಕೆ 30 ನಿಮಿಷ ಮೊದಲು ರಿಮೈಂಡರ್ ಹೊಂದಿಸಲಾಗಿದೆ', remNow: 'ರಾಹು ಕಾಲ ಪ್ರಾರಂಭವಾಗಲಿದೆ—ಪೂಜೆ ಮುಂದೂಡಿ',
    weekdays: ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'], festival: 'ಹಬ್ಬ'
  },
  ml: {
    appTitle: 'ദക്ഷിണ പഞ്ചാംഗം', calc: 'കണക്കാക്കുക', date: 'തീയതി', city: 'നഗരം', lat: 'അക്ഷാംശം (Lat)', lon: 'രേഖാംശം (Lon)',
    useLoc: 'എൻ്റെ സ്ഥാനം', calculate: 'കണക്കാക്കുക', reminders: 'റിമൈൻഡർ പ്രവർത്തനക്ഷമമാക്കുക', results: 'ഇന്നത്തെ പഞ്ചാംഗം', news: 'ഭക്തി വാർത്തകൾ',
    footer: 'Offline PWA • ക്ലൈൻ്റ് സൈഡ് മാത്രം', monthTitle: 'മാസ പഞ്ചാംഗം',
    rahu: 'രാഹു കാലം', yama: 'യമഗണ്ഡം', abhijit: 'അഭിജിത് മുഹൂർത്തം', shashti: 'ഷഷ്ഠി', amrita: 'അമൃത കാലം', brahma: 'ബ്രഹ്മ മുഹൂർത്തം',
    tivaraatri: 'ശിവരാത്രി', ausp: 'ശുഭ ദിനം', shashtiMsg: 'ഷഷ്ഠി വ്രതം ({paksha}) — രാവിലെ പൂജ മറക്കരുത്!', noShashti: 'ഇന്ന് ഷഷ്ഠി ഇല്ല',
    mondayTuesday: 'അതെ', no: 'ഇല്ല', goodNak: 'മംഗള നക്ഷത്രം!', notMarked: 'സാധാരണ ദിവസം', rssLoad: 'റിഫ്രഷ്',
    shuklaPaksha: 'ശുക്ല പക്ഷം', krishnaPaksha: 'കൃഷ്ണ പക്ഷം',
    remSet: 'രാഹു കാലത്തിന് 30 മിനിറ്റ് മുമ്പ് റിമൈൻഡർ സജ്ജമാക്കി', remNow: 'രാഹു കാലം തുടങ്ങാൻ പോകുന്നു—പൂജ മാറ്റിവക്കൂ',
    weekdays: ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'], festival: 'ഉത്സവം'
  },
  en: {
    appTitle: 'Dakshin Panchangam', calc: 'Calculate', date: 'Date', city: 'City', lat: 'Latitude (Lat)', lon: 'Longitude (Lon)',
    useLoc: 'Use My Location', calculate: 'Calculate', reminders: 'Enable Reminder', results: "Today's Panchangam", news: 'Bhakti News',
    footer: 'Offline-ready PWA • Client-side only', monthTitle: 'Monthly Panchangam',
    rahu: 'Rahu Kalam', yama: 'Yamagandam', abhijit: 'Abhijit Muhurta', shashti: 'Shashti', amrita: 'Amrita Kalam', brahma: 'Brahma Muhurta',
    tivaraatri: 'Shivaratri', ausp: 'Auspicious Day', shashtiMsg: 'Shashti fasting ({paksha}) — Morning puja reminder!', noShashti: 'No Shashti today',
    mondayTuesday: 'Yes', no: 'No', goodNak: 'Mangala nakshatra!', notMarked: 'Regular day', rssLoad: 'Refresh',
    shuklaPaksha: 'Shukla Paksha', krishnaPaksha: 'Krishna Paksha',
    remSet: 'Reminder set for 30 mins before Rahu Kalam', remNow: 'Rahu Kalam starts soon—consider postponing puja',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], festival: 'Festival'
  }
};

let currentLang = 'ta';
let notifyTimeout;
let currentMonthDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let newsArticles = [];
let activeNewsTag = 'All';

// Cache for /api/panchangam responses keyed by "date:lat:lon" or "month:start:end:lat:lon".
const apiCache = {};

const LOCALE_MAP = { ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN', en: 'en-IN' };
const t = (k) => (I18N[currentLang] || I18N.en)[k] || k;
const fmtTime = (d) => d.toLocaleTimeString(LOCALE_MAP[currentLang] || 'en-IN', { hour: '2-digit', minute: '2-digit' });

function showView(name) {
  // Hide all views
  document.querySelectorAll('[data-view]').forEach((el) => el.classList.remove('active'));
  // Show target view
  const target = document.querySelector(`[data-view="${name}"]`);
  if (target) target.classList.add('active');

  // Update sidebar active state
  document.querySelectorAll('.sidebar-item').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-view-btn') === name);
  });
  // Update bottom nav active state
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-view-btn') === name);
  });

  // Update header view title
  const viewTitles = { today: t('results'), calendar: t('monthTitle'), festivals: t('festival'), temples: 'Temples', news: t('news') };
  const viewTitleEl = document.getElementById('view-title');
  if (viewTitleEl) viewTitleEl.textContent = viewTitles[name] || name;

  // If switching to calendar, render it
  if (name === 'calendar') renderMonthViewFromInputs();

  // Update URL hash
  history.replaceState(null, '', `#${name}`);
}

function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  const overlay = document.getElementById('settings-overlay');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  overlay.classList.toggle('hidden', isOpen);
}

function updateTodayHeroDate() {
  const now = new Date();
  const dateNumEl = document.getElementById('today-date-num');
  if (dateNumEl) dateNumEl.textContent = now.getDate();

  // Tamil month display using the sun longitude
  const d = new Date(now);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  const sunDeg = getSunLongitude(jd);
  const rasiIdx = Math.floor(sunDeg / 30);
  const tamilMonthNames = ['Chithirai','Vaikasi','Aani','Aadi','Aavani','Purattasi','Aippasi','Karthigai','Margazhi','Thai','Maasi','Panguni'];
  const tamilDay = Math.floor(sunDeg % 30) + 1;
  const tamilMonthEl = document.getElementById('today-tamil-month');
  if (tamilMonthEl) tamilMonthEl.textContent = `${tamilMonthNames[rasiIdx]} ${tamilDay}`;

  // Location pill
  const citySelect = document.getElementById('city-select');
  const cityName = citySelect && citySelect.value !== '' ? (CITY_PRESETS[citySelect.value] || {}).name || 'Location' : 'Chennai';
  const dayStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const locationPillEl = document.getElementById('today-location-pill');
  if (locationPillEl) locationPillEl.textContent = `${cityName} · ${dayStr}`;
}

function updateLocationDisplay() {
  const citySelect = document.getElementById('city-select');
  if (!citySelect || citySelect.value === '') return;
  const city = CITY_PRESETS[citySelect.value];
  if (!city) return;
  const locDisplay = document.getElementById('current-location-display');
  if (locDisplay) locDisplay.textContent = `${city.name}, ${city.region}`;
  updateTodayHeroDate();
}

function initUI() {
  // Set date input to today
  const dateInput = document.getElementById('date-input');
  const today = new Date();
  dateInput.value = today.toISOString().slice(0, 10);

  // Populate city select
  const citySelect = document.getElementById('city-select');
  CITY_PRESETS.forEach((c, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${c.region} — ${c.name}`;
    citySelect.appendChild(opt);
  });
  citySelect.addEventListener('change', () => {
    applyCity(CITY_PRESETS[citySelect.value]);
    updateLocationDisplay();
    calculateAndRender();
    renderMonthViewFromInputs();
  });
  applyCity(CITY_PRESETS[0]);
  updateLocationDisplay();

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentLang = btn.getAttribute('data-lang');
      // Update active state on lang buttons
      document.querySelectorAll('.lang-btn').forEach((b) => {
        b.classList.toggle('bg-primary', b === btn);
        b.classList.toggle('text-on-primary', b === btn);
        b.classList.toggle('bg-surface-container', b !== btn);
        b.classList.toggle('text-on-surface-variant', b !== btn);
      });
      hydrateLabels();
      calculateAndRender();
      renderMonthViewFromInputs();
    });
  });

  // Geo button
  document.getElementById('geo-btn').addEventListener('click', useGeolocation);
  // Notify button
  document.getElementById('notify-btn').addEventListener('click', scheduleReminder);

  // News search + refresh
  document.getElementById('news-search').addEventListener('input', renderNewsCards);

  // Calendar nav buttons
  document.getElementById('cal-prev-btn').addEventListener('click', () => moveMonth(-1));
  document.getElementById('cal-next-btn').addEventListener('click', () => moveMonth(1));

  // Hash-based routing
  const initialView = (window.location.hash || '#today').replace('#', '') || 'today';
  showView(initialView);

  hydrateLabels();
  renderNewsChips();
  loadAllFeeds();

  // Auto-calculate today on load
  calculateAndRender();
}

function hydrateLabels() {
  const safeSet = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  };
  safeSet('app-title', 'appTitle');
  safeSet('rss-load-btn', 'rssLoad');
  safeSet('footer-note', 'footer');

  const searchEl = document.getElementById('news-search');
  if (searchEl) searchEl.placeholder = currentLang === 'ta' ? 'கட்டுரை தேடல்' : 'Search your articles';

  // Update view title if current view is visible
  const activeView = document.querySelector('[data-view].active');
  if (activeView) {
    const name = activeView.getAttribute('data-view');
    const viewTitles = { today: t('results'), calendar: t('monthTitle'), festivals: t('festival'), temples: 'Temples', news: t('news') };
    const titleEl = document.getElementById('view-title');
    if (titleEl) titleEl.textContent = viewTitles[name] || name;
  }

  updateTodayHeroDate();
}

function applyCity(city) {
  document.getElementById('lat-input').value = city.lat;
  document.getElementById('lon-input').value = city.lon;
}

function useGeolocation() {
  if (!navigator.geolocation) return alert('Geolocation not supported');
  navigator.geolocation.getCurrentPosition((pos) => {
    document.getElementById('lat-input').value = pos.coords.latitude.toFixed(4);
    document.getElementById('lon-input').value = pos.coords.longitude.toFixed(4);
    renderMonthViewFromInputs();
  }, (err) => alert(err.message));
}

// NOAA solar calculator — returns UTC Date objects for sunrise and sunset
function calcSunriseSunset(date, lat, lon) {
  const jd = 2440587.5 + date.getTime() / 86400000;
  const T = (jd - 2451545.0) / 36525;
  let L0 = ((280.46646 + 36000.76983 * T) % 360 + 360) % 360;
  let M = ((357.52911 + 35999.05029 * T) % 360 + 360) % 360;
  const Mrad = M * Math.PI / 180;
  const C = (1.914602 - 0.004817 * T) * Math.sin(Mrad)
    + 0.019993 * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad);
  const sunLon = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const lambda = sunLon - 0.00569 - 0.00478 * Math.sin(omega * Math.PI / 180);
  const epsilon = (23.439291111 - 0.013004167 * T) * Math.PI / 180;
  const decl = Math.asin(Math.sin(epsilon) * Math.sin(lambda * Math.PI / 180));
  const L0rad = L0 * Math.PI / 180;
  const e = 0.016708634 - 0.000042037 * T;
  const y = Math.tan(epsilon / 2) ** 2;
  const eot = 4 * (180 / Math.PI) * (
    y * Math.sin(2 * L0rad) - 2 * e * Math.sin(Mrad)
    + 4 * e * y * Math.sin(Mrad) * Math.cos(2 * L0rad)
    - 0.5 * y * y * Math.sin(4 * L0rad)
    - 1.25 * e * e * Math.sin(2 * Mrad)
  );
  const latRad = lat * Math.PI / 180;
  const cosH = (Math.cos(90.833 * Math.PI / 180) - Math.sin(latRad) * Math.sin(decl))
    / (Math.cos(latRad) * Math.cos(decl));
  const solarNoonUTC = 720 - 4 * lon - eot;
  if (cosH < -1 || cosH > 1) {
    const noon = new Date(date.getTime() + solarNoonUTC * 60000);
    return { sunrise: new Date(noon.getTime() - 6 * 3600000), sunset: new Date(noon.getTime() + 6 * 3600000) };
  }
  const H = Math.acos(cosH) * 180 / Math.PI;
  return {
    sunrise: new Date(date.getTime() + (solarNoonUTC - H * 4) * 60000),
    sunset: new Date(date.getTime() + (solarNoonUTC + H * 4) * 60000)
  };
}

function getSunrise(date, lat, lon) {
  return calcSunriseSunset(date, lat, lon).sunrise;
}

// Moon rasi from real moon longitude (language-aware)
function calcMoonRasi(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  return (RASI[currentLang] || RASI.ta)[Math.floor(getMoonLongitude(jd) / 30)];
}

// Tamil solar calendar day: Sun's degree within current rasi (~1°/day)
function calcTamilDay(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  return Math.floor(getSunLongitude(jd) % 30) + 1;
}
const addMinutes = (date, mins) => new Date(date.getTime() + mins * 60000);
const getRahuKalam = (sunrise) => ({ start: addMinutes(sunrise, 90), end: addMinutes(sunrise, 180) });
const getYamagandam = (sunrise) => ({ start: addMinutes(sunrise, 450), end: addMinutes(sunrise, 540) });
const getAbhijitMuhurta = (sunrise) => ({ start: addMinutes(sunrise, 504), end: addMinutes(sunrise, 552) });

// Real astronomical calculations (Meeus, Astronomical Algorithms 2nd ed.)
function getSunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  L0 = ((L0 % 360) + 360) % 360;
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  M = ((M % 360) + 360) % 360;
  const Mrad = M * Math.PI / 180;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad);
  return ((( L0 + C) % 360) + 360) % 360;
}

function getMoonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const T2 = T * T; const T3 = T2 * T; const T4 = T3 * T;
  const r = Math.PI / 180;
  const L = ((218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000) % 360 + 360) % 360;
  const D = ((297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000) % 360 + 360) % 360;
  const M = ((357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000) % 360 + 360) % 360;
  const Mp = ((134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000) % 360 + 360) % 360;
  const F = ((93.2720950 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000) % 360 + 360) % 360;
  const Dr = D * r; const Mr = M * r; const Mpr = Mp * r; const Fr = F * r;
  const dL = (6288774 * Math.sin(Mpr)
    + 1274027 * Math.sin(2 * Dr - Mpr)
    + 658314 * Math.sin(2 * Dr)
    + 213618 * Math.sin(2 * Mpr)
    - 185116 * Math.sin(Mr)
    - 114332 * Math.sin(2 * Fr)
    + 58793 * Math.sin(2 * Dr - 2 * Mpr)
    + 57066 * Math.sin(2 * Dr - Mr - Mpr)
    + 53322 * Math.sin(2 * Dr + Mpr)
    + 45758 * Math.sin(2 * Dr - Mr)
    - 40923 * Math.sin(Mr - Mpr)
    - 34720 * Math.sin(Dr)
    - 30383 * Math.sin(Mr + Mpr)
    + 15327 * Math.sin(2 * Dr - 2 * Fr)
    + 10980 * Math.sin(Mpr - 2 * Fr)
    + 10675 * Math.sin(4 * Dr - Mpr)
    + 10034 * Math.sin(3 * Mpr)
    + 8548 * Math.sin(4 * Dr - 2 * Mpr)
    - 7888 * Math.sin(2 * Dr + Mr - Mpr)
    - 6766 * Math.sin(2 * Dr + Mr)
    - 5163 * Math.sin(Dr - Mpr)
    + 4987 * Math.sin(Dr + Mr)
    + 4036 * Math.sin(2 * Dr - Mr + Mpr)
    + 3994 * Math.sin(2 * Dr + 2 * Mpr)
    + 3861 * Math.sin(4 * Dr)
    + 3665 * Math.sin(2 * Dr - 3 * Mpr)
    - 2689 * Math.sin(Mr - 2 * Mpr)
    + 2390 * Math.sin(2 * Dr - Mr - 2 * Mpr)
    - 2348 * Math.sin(Dr + Mpr)
    + 2236 * Math.sin(2 * Dr - 2 * Mr)
    - 2120 * Math.sin(Mr + 2 * Mpr)
    + 2048 * Math.sin(2 * Dr - 2 * Mr - Mpr)
    - 1773 * Math.sin(2 * Dr + Mpr - 2 * Fr)
    + 1215 * Math.sin(4 * Dr - Mr - Mpr)
    - 892 * Math.sin(3 * Dr - Mpr)
    - 810 * Math.sin(2 * Dr + Mr + Mpr)
    + 759 * Math.sin(4 * Dr - Mr - 2 * Mpr)
    - 713 * Math.sin(2 * Mr - Mpr)
    + 691 * Math.sin(2 * Dr + Mr - 2 * Mpr)
    + 549 * Math.sin(4 * Dr + Mpr)
    + 537 * Math.sin(4 * Mpr)
    + 520 * Math.sin(4 * Dr - Mr)
    - 487 * Math.sin(Dr - 2 * Mpr)
    - 381 * Math.sin(2 * Mpr - 2 * Fr)
    + 351 * Math.sin(Dr + Mr + Mpr)
    - 340 * Math.sin(3 * Dr - 2 * Mpr)
    + 330 * Math.sin(4 * Dr - 3 * Mpr)
    - 323 * Math.sin(2 * Mr + Mpr)
    + 299 * Math.sin(Dr + Mr - Mpr)) * 1e-6;
  return ((( L + dL) % 360) + 360) % 360;
}

// Tithi = Moon-Sun elongation / 12°, 1-indexed (30 = Amavasai)
function calcTithi(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0); // approximate sunrise
  const jd = 2440587.5 + d.getTime() / 86400000;
  let elong = getMoonLongitude(jd) - getSunLongitude(jd);
  if (elong < 0) elong += 360;
  return Math.floor(elong / 12) + 1;
}

// Nakshatra = Moon longitude / (360/27)°, 1-indexed
function calcNakshatra(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  return Math.floor(getMoonLongitude(jd) / (360 / 27)) + 1;
}

function getShashti(tithi) {
  if (tithi === 6 || tithi === 21) {
    const paksha = tithi <= 15 ? t('shuklaPaksha') : t('krishnaPaksha');
    return t('shashtiMsg').replace('{paksha}', paksha);
  }
  return t('noShashti');
}
function getAuspicious(nak) {
  return [5, 6, 10, 13, 14, 18].includes(nak) ? t('goodNak') : t('notMarked');
}

function calculatePanchangam(date, lat, lon, precomputed) {
  let sunrise;
  if (precomputed) {
    sunrise = new Date(precomputed.sunriseMs);
  } else {
    sunrise = getSunrise(date, lat, lon);
  }
  const tithi = precomputed ? precomputed.tithi : calcTithi(date);
  const nak   = precomputed ? precomputed.nakshatra : calcNakshatra(date);
  const rahu  = getRahuKalam(sunrise);
  const shashtiStr = getShashti(tithi);
  return {
    date: date.toISOString(), lat, lon, rahu,
    yama: getYamagandam(sunrise), abhijit: getAbhijitMuhurta(sunrise),
    shashti: shashtiStr, auspicious: getAuspicious(nak),
    amrita: { start: addMinutes(sunrise, 240), end: addMinutes(sunrise, 288) },
    brahma: { start: addMinutes(sunrise, -96), end: addMinutes(sunrise, -48) },
    tivaraatri: [1, 2].includes(date.getDay()) && (tithi === 6 || tithi === 21)
  };
}

function renderResults(data) {
  const fmt = (interval) => {
    if (!interval || !interval.start) return '—';
    return `${fmtTime(new Date(interval.start))} – ${fmtTime(new Date(interval.end))}`;
  };

  // Alert banner (shashti)
  const alertWrap = document.getElementById('alert-banner-wrap');
  const alertEl = document.getElementById('alert-banner');
  if (alertEl && alertWrap) {
    if (data.shashti && data.shashti !== t('noShashti')) {
      alertEl.textContent = data.shashti;
      alertWrap.classList.remove('hidden');
    } else {
      alertWrap.classList.add('hidden');
    }
  }

  // Moon rasi + auspicious
  const moonRasiEl = document.getElementById('today-moon-rasi');
  if (moonRasiEl) {
    const dateObj = new Date(data.date || new Date());
    moonRasiEl.textContent = calcMoonRasi(dateObj);
  }
  const auspEl = document.getElementById('today-moon-auspicious');
  if (auspEl) auspEl.textContent = data.auspicious || t('notMarked');

  // Nakshatra
  const nakEl = document.getElementById('today-nakshatra-chip');
  if (nakEl) {
    const dateObj = new Date(data.date || new Date());
    const nakIdx = calcNakshatra(dateObj) - 1;
    nakEl.textContent = (NAKSHATRA[currentLang] || NAKSHATRA.ta)[nakIdx];
  }

  // Sunrise / Sunset
  const srEl = document.getElementById('today-sunrise');
  const ssEl = document.getElementById('today-sunset');
  if (data.rahu && data.rahu.start) {
    // derive sunrise as rahu.start - 90min
    const sunriseMs = new Date(data.rahu.start).getTime() - 90 * 60000;
    const sunsetMs = sunriseMs + 12 * 3600000;
    if (srEl) srEl.textContent = fmtTime(new Date(sunriseMs));
    if (ssEl) ssEl.textContent = fmtTime(new Date(sunsetMs));
  }

  // Paksha + tithi chips
  const chipsEl = document.getElementById('today-paksha-tithi-chips');
  if (chipsEl) {
    const dateObj = new Date(data.date || new Date());
    const tithi = calcTithi(dateObj);
    const paksha = tithi <= 15 ? t('shuklaPaksha') : t('krishnaPaksha');
    const tithiName = (TITHI_NAMES[currentLang] || TITHI_NAMES.ta)[tithi - 1];
    chipsEl.innerHTML = `
      <span class="px-3 py-1 bg-on-primary/20 rounded-full text-xs font-bold text-primary-fixed">${paksha}</span>
      <span class="px-3 py-1 bg-on-primary/20 rounded-full text-xs font-bold text-primary-fixed">${tithiName}</span>
    `;
  }

  // Auspicious badges row (festival tags)
  const badgesEl = document.getElementById('auspicious-badges');
  if (badgesEl) {
    const dateObj = new Date(data.date || new Date());
    const tithi = calcTithi(dateObj);
    const tags = getFestivalTags(dateObj, tithi);
    if (data.auspicious && data.auspicious !== t('notMarked')) tags.push(data.auspicious);
    if (data.tivaraatri) tags.push(t('tivaraatri'));
    badgesEl.innerHTML = tags.map((tag) =>
      `<span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-full text-xs font-bold text-primary">
        <span class="material-symbols-outlined text-sm">star</span>${tag}
      </span>`
    ).join('');
  }

  // Muhurta grid (6 cards)
  const muhurtaGrid = document.getElementById('muhurta-grid');
  if (muhurtaGrid) {
    const muhurtaCards = [
      { label: t('rahu'),    time: fmt(data.rahu),    icon: 'dangerous',      colorClass: 'bg-error-container text-on-error-container',           desc: 'Inauspicious' },
      { label: t('yama'),    time: fmt(data.yama),    icon: 'timer_off',      colorClass: 'bg-inverse-surface text-inverse-on-surface',            desc: 'Avoid Ventures' },
      { label: t('amrita'),  time: fmt(data.amrita),  icon: 'spa',            colorClass: 'bg-tertiary-container/30 text-tertiary',                desc: 'Golden Auspicious' },
      { label: t('abhijit'), time: fmt(data.abhijit), icon: 'auto_awesome',   colorClass: 'bg-primary/10 text-primary',                            desc: 'Victory Muhurta' },
      { label: t('brahma'),  time: fmt(data.brahma),  icon: 'self_improvement', colorClass: 'bg-secondary-container/20 text-secondary',            desc: 'Ideal for Prayer' },
      { label: t('shashti'), time: data.shashti && data.shashti !== t('noShashti') ? data.shashti.slice(0, 40) : t('noShashti'),
                                                       icon: 'festival',       colorClass: 'bg-primary-fixed/30 text-on-primary-fixed-variant',     desc: 'Shashti Status' },
    ];
    muhurtaGrid.innerHTML = muhurtaCards.map((c) => `
      <div class="rounded-xl p-3 ${c.colorClass} flex flex-col gap-1.5 editorial-shadow">
        <div class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-base">${c.icon}</span>
          <span class="text-[11px] font-bold uppercase tracking-tight">${c.label}</span>
        </div>
        <div class="font-headline font-bold text-sm leading-tight">${c.time}</div>
        <div class="text-[10px] opacity-70">${c.desc}</div>
      </div>
    `).join('');
  }

  updateTodayHeroDate();
}

/**
 * Fetch Swiss Ephemeris data for a single date from the CF Function.
 * Returns the precomputed object on success, null on failure (triggers local fallback).
 */
async function fetchDayData(dateStr, lat, lon) {
  const key = `${dateStr}:${lat}:${lon}`;
  if (apiCache[key]) return apiCache[key];
  try {
    const res = await fetch(`/api/panchangam?date=${encodeURIComponent(dateStr)}&lat=${lat}&lon=${lon}`);
    if (res.ok) {
      const data = await res.json();
      if (!data.error) { apiCache[key] = data; return data; }
    }
  } catch (_) {}
  return null;
}

/**
 * Fetch Swiss Ephemeris data for all days in the month-grid window (batch).
 * Returns a map of { "YYYY-MM-DD": dayObj } on success, null on failure.
 */
async function fetchMonthData(year, month, lat, lon) {
  // Compute the full grid window (Sun → Sat rows covering the month).
  const firstOfMonth = new Date(year, month, 1);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const lastOfMonth = new Date(year, month + 1, 0);
  const gridEnd = new Date(lastOfMonth);
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));

  const startStr = gridStart.toISOString().slice(0, 10);
  const endStr   = gridEnd.toISOString().slice(0, 10);
  const cacheKey = `month:${startStr}:${endStr}:${lat}:${lon}`;

  if (apiCache[cacheKey]) return apiCache[cacheKey];
  try {
    const res = await fetch(
      `/api/panchangam?date=${encodeURIComponent(startStr)}&endDate=${encodeURIComponent(endStr)}&lat=${lat}&lon=${lon}`
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const map = {};
        data.forEach((d) => {
          map[d.date] = d;
          apiCache[`${d.date}:${lat}:${lon}`] = d;
        });
        apiCache[cacheKey] = map;
        return map;
      }
    }
  } catch (_) {}
  return null;
}

async function calculateAndRender() {
  const dateValue = document.getElementById('date-input').value;
  const lat = Number.parseFloat(document.getElementById('lat-input').value);
  const lon = Number.parseFloat(document.getElementById('lon-input').value);
  if (!dateValue || Number.isNaN(lat) || Number.isNaN(lon)) return;
  const selectedDate = new Date(`${dateValue}T00:00:00`);
  const precomputed = await fetchDayData(dateValue, lat, lon);
  const result = calculatePanchangam(selectedDate, lat, lon, precomputed);
  localStorage.setItem('panchangam:last', JSON.stringify(result));
  renderResults(result);
  currentMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  renderMonthViewFromInputs();
}

function renderFromCache() {
  const raw = localStorage.getItem('panchangam:last');
  if (!raw) return;
  const parsed = JSON.parse(raw);
  renderResults(parsed);
}

function scheduleReminder() {
  const raw = localStorage.getItem('panchangam:last');
  if (!raw) return alert('Run calculation first');
  const data = JSON.parse(raw);
  const ms = new Date(data.rahu.start).getTime() - (30 * 60 * 1000) - Date.now();
  if (notifyTimeout) clearTimeout(notifyTimeout);
  if (ms <= 0) return alert('Reminder time already passed for selected date');
  notifyTimeout = setTimeout(() => alert(t('remNow')), ms);
  alert(t('remSet'));
}

function extractImageFromItem(item, description) {
  const media = item.querySelector('media\:content, content');
  if (media?.getAttribute('url')) return media.getAttribute('url');
  const enclosure = item.querySelector('enclosure');
  if (enclosure?.getAttribute('url')) return enclosure.getAttribute('url');
  const match = description.match(/<img[^>]+src=["']([^"']+)/i);
  return match ? match[1] : '';
}

function parseRSSItems(xmlDoc, sourceMeta) {
  if (!xmlDoc) return [];
  return Array.from(xmlDoc.querySelectorAll('item')).slice(0, 12).map((item) => {
    const title = item.querySelector('title')?.textContent?.trim() || 'Untitled';
    const link = item.querySelector('link')?.textContent?.trim() || '#';
    const description = item.querySelector('description')?.textContent || '';
    const clean = description.replace(/<[^>]+>/g, '').trim();
    const pub = item.querySelector('pubDate')?.textContent || '';
    return {
      title, link,
      summary: clean.slice(0, 120),
      pubMs: pub ? new Date(pub).getTime() : 0,
      dateText: pub ? new Date(pub).toLocaleDateString(currentLang === 'en' ? 'en-US' : (LOCALE_MAP[currentLang] || 'en-IN'), { month: 'long', day: 'numeric', year: 'numeric' }) : '',
      image: extractImageFromItem(item, description),
      tag: sourceMeta.tag,
      source: sourceMeta.name
    };
  });
}

async function fetchFeed(source) {
  const parse = (text) => parseRSSItems(new DOMParser().parseFromString(text, 'application/xml'), source);
  try {
    const res = await fetch(`/api/rss?url=${encodeURIComponent(source.url)}`);
    if (res.ok) return parse(await res.text());
  } catch {}
  try {
    const res = await fetch(source.url);
    if (res.ok) return parse(await res.text());
  } catch {}
  return [];
}

async function loadAllFeeds() {
  const output = document.getElementById('news-feed');
  output.innerHTML = '<p>Loading…</p>';
  const results = await Promise.all(RSS_SOURCES.map(fetchFeed));
  newsArticles = results.flat().sort((a, b) => b.pubMs - a.pubMs);
  renderNewsCards();
}

function renderNewsChips() {
  const container = document.getElementById('news-chips');
  if (!container) return;
  const tags = ['All', ...new Set(RSS_SOURCES.map((s) => s.tag))];
  container.innerHTML = tags.map((tag) => {
    const isActive = tag === activeNewsTag;
    const cls = isActive
      ? 'px-6 py-2 rounded-full bg-primary text-on-primary font-medium text-sm shrink-0'
      : 'px-6 py-2 rounded-full bg-surface-container text-on-surface-variant font-medium text-sm hover:bg-surface-container-high transition-all shrink-0';
    return `<button type="button" class="${cls}" data-tag="${tag}">${tag}</button>`;
  }).join('');
  container.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', () => {
    activeNewsTag = btn.getAttribute('data-tag');
    renderNewsChips();
    renderNewsCards();
  }));
}

function renderNewsCards() {
  const searchEl = document.getElementById('news-search');
  const q = searchEl ? searchEl.value.trim().toLowerCase() : '';
  const output = document.getElementById('news-feed');
  if (!output) return;

  const filtered = newsArticles.filter((a) => {
    const tagOk = activeNewsTag === 'All' || a.tag === activeNewsTag;
    const qOk = !q || (`${a.title} ${a.summary} ${a.source}`.toLowerCase().includes(q));
    return tagOk && qOk;
  });

  if (!filtered.length) {
    output.innerHTML = `<div class="col-span-full flex flex-col items-center gap-3 py-16 text-on-surface-variant">
      <span class="material-symbols-outlined text-5xl">newspaper</span>
      <p class="text-sm">No articles found.</p>
    </div>`;
    return;
  }

  output.innerHTML = filtered.map((a) => {
    const imgBlock = a.image
      ? `<div class="aspect-video overflow-hidden"><img src="${a.image}" alt="${a.title.replace(/"/g, '&quot;')}" loading="lazy" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>`
      : `<div class="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"><span class="material-symbols-outlined text-4xl text-primary/30">auto_stories</span></div>`;
    return `<article class="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-[0_24px_48px_-12px_rgba(26,27,33,0.12)] transition-all duration-500 flex flex-col">
      ${imgBlock}
      <div class="p-5 flex flex-col flex-grow">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-[11px] font-bold text-secondary uppercase tracking-tighter">${a.source}</span>
          <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
          <time class="text-[11px] text-on-surface-variant">${a.dateText || ''}</time>
        </div>
        <h3 class="text-base font-bold font-headline text-on-surface leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">${a.title}</h3>
        <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-3 mb-4 flex-grow">${a.summary}</p>
        <div class="pt-3 flex justify-between items-center border-t border-surface-container">
          <a href="${a.link}" target="_blank" rel="noopener" class="text-xs font-bold text-primary flex items-center gap-1 group/link hover:gap-2 transition-all">
            Read Article <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <span class="px-2 py-1 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant uppercase">${a.tag}</span>
        </div>
      </div>
    </article>`;
  }).join('');
}


function getFestivalTags(date, tithi) {
  const tags = [];
  if ([6, 21].includes(tithi)) tags.push('Shasti Vratam');
  if (tithi === 15) tags.push('Pournami');
  if (tithi === 30) tags.push('Amavasai');
  if (date.getDay() === 1 && [13, 28].includes(tithi)) tags.push('Soma Pradosh');
  return tags;
}

function getMonthCellData(date, lat, lon, apiDay) {
  let sunrise, sunset, tithi, nak, moonRasi, tamilDay;
  if (apiDay) {
    sunrise  = new Date(apiDay.sunriseMs);
    sunset   = new Date(apiDay.sunsetMs);
    tithi    = apiDay.tithi;
    nak      = apiDay.nakshatra;
    moonRasi = (RASI[currentLang] || RASI.ta)[apiDay.moonRasi];
    tamilDay = apiDay.tamilDay;
  } else {
    const ss = calcSunriseSunset(date, lat, lon);
    sunrise  = ss.sunrise;
    sunset   = ss.sunset;
    tithi    = calcTithi(date);
    nak      = calcNakshatra(date);
    moonRasi = calcMoonRasi(date);
    tamilDay = calcTamilDay(date);
  }
  const paksha    = tithi <= 15 ? 'S' : 'K';
  const langTithi = (TITHI_NAMES[currentLang] || TITHI_NAMES.ta)[tithi - 1];
  const langNak   = (NAKSHATRA[currentLang]   || NAKSHATRA.ta)[nak - 1];
  return { sunrise: fmtTime(sunrise), sunset: fmtTime(sunset), tithi: `${langTithi} ${paksha}`, nakshatra: langNak, moon: moonRasi, tamilDay, festivals: getFestivalTags(date, tithi) };
}

function renderWeekdayRail() {
  // No-op: weekday header row is now static HTML in index.html
}

function moveMonth(step) {
  currentMonthDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + step, 1);
  renderMonthViewFromInputs();
}

function renderMonthViewFromInputs() {
  const lat = Number.parseFloat(document.getElementById('lat-input').value);
  const lon = Number.parseFloat(document.getElementById('lon-input').value);
  if (Number.isNaN(lat) || Number.isNaN(lon)) return;
  renderMonthGrid(currentMonthDate, lat, lon);
}

async function renderMonthGrid(anchorDate, lat, lon) {
  const localeKey = LOCALE_MAP[currentLang] || 'en-IN';
  const title = anchorDate.toLocaleDateString(localeKey, { month: 'long', year: 'numeric' });
  const calTitleEl = document.getElementById('cal-month-title');
  if (calTitleEl) calTitleEl.textContent = title;

  const first = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
  const start = new Date(first);
  start.setDate(start.getDate() - start.getDay());

  const apiMonthData = await fetchMonthData(anchorDate.getFullYear(), anchorDate.getMonth(), lat, lon);

  const today = new Date();
  const selectedDateStr = document.getElementById('date-input').value || today.toISOString().slice(0, 10);
  const body = document.getElementById('cal-grid-body');
  if (!body) return;

  let html = '';
  let cursor = new Date(start);

  for (let w = 0; w < 6; w += 1) {
    for (let d = 0; d < 7; d += 1) {
      const sameMonth = cursor.getMonth() === anchorDate.getMonth();
      const dateStr = cursor.toISOString().slice(0, 10);
      const isToday = dateStr === today.toISOString().slice(0, 10);
      const isSelected = dateStr === selectedDateStr;
      const isHoliday = cursor.getDay() === 0;
      const apiDay = apiMonthData ? apiMonthData[dateStr] : null;
      const cell = getMonthCellData(cursor, lat, lon, apiDay);

      let cellClasses = 'p-1.5 border border-surface-container hover:bg-surface-container transition-colors cursor-pointer group relative min-h-[70px]';
      if (!sameMonth) cellClasses += ' opacity-40 bg-surface-container-low/30';
      if (isToday) cellClasses += ' ring-2 ring-inset ring-primary bg-primary/5';
      if (isSelected && !isToday) cellClasses += ' bg-primary/10';

      const dayNumClass = isHoliday ? 'text-sm font-bold text-error' : 'text-sm font-bold text-on-surface';
      const festivalDot = cell.festivals.length
        ? `<span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-secondary"></span>`
        : '';

      html += `<div class="${cellClasses}" data-date="${dateStr}">
        ${festivalDot}
        <div class="flex justify-between items-start mb-0.5">
          <span class="${dayNumClass}">${cursor.getDate()}</span>
          <span class="text-[8px] text-on-surface-variant leading-tight text-right hidden sm:block">${cell.sunrise}<br>${cell.sunset}</span>
        </div>
        <div class="text-[9px] text-primary font-bold leading-tight truncate">${cell.tithi}</div>
        <div class="text-[8px] text-on-surface-variant truncate">${cell.nakshatra}</div>
      </div>`;

      cursor.setDate(cursor.getDate() + 1);
    }
  }

  body.innerHTML = html;

  // Click handler: show day detail + update date input
  body.querySelectorAll('[data-date]').forEach((node) => {
    node.addEventListener('click', async () => {
      const dateValue = node.getAttribute('data-date');
      document.getElementById('date-input').value = dateValue;

      // Update selected cell highlight
      body.querySelectorAll('[data-date]').forEach((n) => {
        n.classList.remove('bg-primary/10');
        const nDate = n.getAttribute('data-date');
        if (nDate === today.toISOString().slice(0, 10)) return;
        if (nDate === dateValue) n.classList.add('bg-primary/10');
      });

      // Fill right-panel detail
      const titleEl = document.getElementById('cal-day-detail-title');
      const timingsEl = document.getElementById('cal-day-detail-timings');
      if (titleEl && timingsEl) {
        const clickedDate = new Date(`${dateValue}T00:00:00`);
        titleEl.textContent = clickedDate.toLocaleDateString(localeKey, { weekday: 'long', day: 'numeric', month: 'long' });
        timingsEl.innerHTML = '<p class="text-xs text-on-surface-variant">Loading…</p>';
        const precomputed = await fetchDayData(dateValue, lat, lon);
        const result = calculatePanchangam(clickedDate, lat, lon, precomputed);
        const cellData = getMonthCellData(clickedDate, lat, lon, precomputed);
        const fmtI = (interval) => interval ? `${fmtTime(new Date(interval.start))} – ${fmtTime(new Date(interval.end))}` : '—';
        timingsEl.innerHTML = [
          ['Tithi', cellData.tithi],
          ['Nakshatra', cellData.nakshatra],
          ['Moon Rasi', cellData.moon],
          [t('rahu'), fmtI(result.rahu)],
          [t('yama'), fmtI(result.yama)],
          [t('abhijit'), fmtI(result.abhijit)],
          [t('amrita'), fmtI(result.amrita)],
          [t('brahma'), fmtI(result.brahma)],
          ['Sunrise', cellData.sunrise],
          ['Sunset', cellData.sunset],
        ].map(([label, val]) => `
          <div class="flex justify-between items-center py-1.5 border-b border-outline-variant/30">
            <span class="text-xs text-on-surface-variant">${label}</span>
            <span class="text-xs font-bold text-on-surface text-right">${val}</span>
          </div>
        `).join('');
      }

      // Also trigger main renderResults if on today view
      calculateAndRender();
    });
  });
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
initUI();
