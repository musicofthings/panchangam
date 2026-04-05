/**
 * Dakshin Panchangam — Shared Module
 * Imported by every page. Contains data tables, API calls, utilities.
 */

// ---------------------------------------------------------------------------
// Data Tables (verbatim from app.js)
// ---------------------------------------------------------------------------

export const CITY_PRESETS = [
  { name: 'Chennai',            region: 'Tamil Nadu',     lat: 13.0827,  lon: 80.2707  },
  { name: 'Madurai',            region: 'Tamil Nadu',     lat: 9.9252,   lon: 78.1198  },
  { name: 'Thanjavur',          region: 'Tamil Nadu',     lat: 10.7870,  lon: 79.1378  },
  { name: 'Kanchipuram',        region: 'Tamil Nadu',     lat: 12.8333,  lon: 79.7000  },
  { name: 'Tiruchirapalli',     region: 'Tamil Nadu',     lat: 10.7905,  lon: 78.7047  },
  { name: 'Coimbatore',         region: 'Tamil Nadu',     lat: 11.0168,  lon: 76.9558  },
  { name: 'Tirunelveli',        region: 'Tamil Nadu',     lat: 8.7139,   lon: 77.7567  },
  { name: 'Tirupati',           region: 'Andhra Pradesh', lat: 13.6288,  lon: 79.4192  },
  { name: 'Vijayawada',         region: 'Andhra Pradesh', lat: 16.5062,  lon: 80.6480  },
  { name: 'Visakhapatnam',      region: 'Andhra Pradesh', lat: 17.6868,  lon: 83.2185  },
  { name: 'Hyderabad',          region: 'Telangana',      lat: 17.3850,  lon: 78.4867  },
  { name: 'Warangal',           region: 'Telangana',      lat: 17.9784,  lon: 79.5941  },
  { name: 'Bengaluru',          region: 'Karnataka',      lat: 12.9716,  lon: 77.5946  },
  { name: 'Mysuru',             region: 'Karnataka',      lat: 12.2958,  lon: 76.6394  },
  { name: 'Udupi',              region: 'Karnataka',      lat: 13.3409,  lon: 74.7421  },
  { name: 'Mangaluru',          region: 'Karnataka',      lat: 12.9141,  lon: 74.8560  },
  { name: 'Dharwad',            region: 'Karnataka',      lat: 15.4589,  lon: 75.0078  },
  { name: 'Thiruvananthapuram', region: 'Kerala',         lat: 8.5241,   lon: 76.9366  },
  { name: 'Kochi',              region: 'Kerala',         lat: 9.9312,   lon: 76.2673  },
  { name: 'Kozhikode',          region: 'Kerala',         lat: 11.2588,  lon: 75.7804  },
  { name: 'Thrissur',           region: 'Kerala',         lat: 10.5276,  lon: 76.2144  },
  { name: 'Guruvayur',          region: 'Kerala',         lat: 10.5938,  lon: 76.0417  },
  { name: 'Singapore',          region: 'Singapore',      lat: 1.3521,   lon: 103.8198 },
  { name: 'Kuala Lumpur',       region: 'Malaysia',       lat: 3.1390,   lon: 101.6869 },
  { name: 'New York',           region: 'USA',            lat: 40.7128,  lon: -74.0060 },
  { name: 'London',             region: 'UK',             lat: 51.5074,  lon: -0.1278  },
  { name: 'Sydney',             region: 'Australia',      lat: -33.8688, lon: 151.2093 },
];

export const RSS_SOURCES = [
  { name: 'Hinduism Today',        url: 'https://www.hinduismtoday.com/feed/',                   tag: 'Featured'  },
  { name: 'Indica Today',          url: 'https://www.indica.today/feed/',                        tag: 'Indic'     },
  { name: 'Speaking Tree',         url: 'https://www.speakingtree.in/rss',                       tag: 'Spiritual' },
  { name: 'TemplePurohit',         url: 'https://www.templepurohit.com/feed/',                   tag: 'Temples'   },
  { name: 'Sadhguru Wisdom',       url: 'https://isha.sadhguru.org/in/en/wisdom/rss.xml',        tag: 'Spiritual' },
  { name: 'Ramakrishna Math',      url: 'https://belurmath.org/feed/',                           tag: 'Mutt'      },
  { name: 'Sringeri Mutt',         url: 'https://www.sringeri.net/feed/',                        tag: 'Mutt'      },
  { name: 'Aanmeegam',             url: 'https://aanmeegam.in/feed/',                            tag: 'Tamil'     },
  { name: 'Tamil and Vedas',       url: 'https://tamilandvedas.com/feed/',                       tag: 'Tamil'     },
  { name: 'Tamil Brahmins Forum',  url: 'https://www.tamilbrahmins.com/forums/-/index.rss',      tag: 'Community' },
  { name: 'Mathrubhumi Astrology', url: 'https://english.mathrubhumi.com/rss/astrology.xml',     tag: 'Jyotish'  },
];

export const TITHI_NAMES = {
  ta: ['பிரதமை','துதியை','திருதியை','சதுர்த்தி','பஞ்சமி','சஷ்டி','சப்தமி','அஷ்டமி','நவமி','தசமி','ஏகாதசி','துவாதசி','திரயோதசி','சதுர்தசி','பௌர்ணமி','பிரதமை','துதியை','திருதியை','சதுர்த்தி','பஞ்சமி','சஷ்டி','சப்தமி','அஷ்டமி','நவமி','தசமி','ஏகாதசி','துவாதசி','திரயோதசி','சதுர்தசி','அமாவாசை'],
  te: ['పాడ్యమి','విదియ','తదియ','చవితి','పంచమి','షష్ఠి','సప్తమి','అష్టమి','నవమి','దశమి','ఏకాదశి','ద్వాదశి','త్రయోదశి','చతుర్దశి','పౌర్ణమి','పాడ్యమి','విదియ','తదియ','చవితి','పంచమి','షష్ఠి','సప్తమి','అష్టమి','నవమి','దశమి','ఏకాదశి','ద్వాదశి','త్రయోదశి','చతుర్దశి','అమావాస్య'],
  kn: ['ಪಾಡ್ಯಮಿ','ಬಿದಿಗೆ','ತದಿಗೆ','ಚವಿತಿ','ಪಂಚಮಿ','ಷಷ್ಠಿ','ಸಪ್ತಮಿ','ಅಷ್ಟಮಿ','ನವಮಿ','ದಶಮಿ','ಏಕಾದಶಿ','ದ್ವಾದಶಿ','ತ್ರಯೋದಶಿ','ಚತುರ್ದಶಿ','ಹುಣ್ಣಿಮೆ','ಪಾಡ್ಯಮಿ','ಬಿದಿಗೆ','ತದಿಗೆ','ಚವಿತಿ','ಪಂಚಮಿ','ಷಷ್ಠಿ','ಸಪ್ತಮಿ','ಅಷ್ಟಮಿ','ನವಮಿ','ದಶಮಿ','ಏಕಾದಶಿ','ದ್ವಾದಶಿ','ತ್ರಯೋದಶಿ','ಚತುರ್ದಶಿ','ಅಮಾವಾಸ್ಯೆ'],
  ml: ['പ്രതിപദം','ദ്വിതീയ','തൃതീയ','ചതുർത്ഥി','പഞ്ചമി','ഷഷ്ഠി','സപ്തമി','അഷ്ടമി','നവമി','ദശമി','ഏകാദശി','ദ്വാദശി','ത്രയോദശി','ചതുർദശി','പൗർണമി','പ്രതിപദം','ദ്വിതീയ','തൃതീയ','ചതുർത്ഥി','പഞ്ചമി','ഷഷ്ഠി','സപ്തമി','അഷ്ടമി','നവമി','ദശമി','ഏകാദശി','ദ്വാദശി','ത്രയോദശി','ചതുർദശി','അമാവാസ്യ'],
  en: ['Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashti','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Pournami','Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashti','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Amavasya'],
};

export const NAKSHATRA = {
  ta: ['அஸ்வினி','பரணி','கார்த்திகை','ரோகிணி','மிருகசிரிஷம்','திருவாதிரை','புனர்பூசம்','பூசம்','ஆயில்யம்','மகம்','பூரம்','உத்திரம்','ஹஸ்தம்','சித்திரை','சுவாதி','விசாகம்','அனுஷம்','கேட்டை','மூலம்','பூராடம்','உத்திராடம்','திருவோணம்','அவிட்டம்','சதயம்','பூரட்டாதி','உத்திரட்டாதி','ரேவதி'],
  te: ['అశ్వని','భరణి','కృత్తిక','రోహిణి','మృగశిర','ఆర్ద్ర','పునర్వసు','పుష్యమి','ఆశ్లేష','మఖ','పుబ్బ','ఉత్తర','హస్త','చిత్త','స్వాతి','విశాఖ','అనూరాధ','జ్యేష్ఠ','మూల','పూర్వాషాఢ','ఉత్తరాషాఢ','శ్రవణ','ధనిష్ఠ','శతభిష','పూర్వాభాద్ర','ఉత్తరాభాద్ర','రేవతి'],
  kn: ['ಅಶ್ವಿನಿ','ಭರಣಿ','ಕೃತ್ತಿಕೆ','ರೋಹಿಣಿ','ಮೃಗಶಿರ','ಆರ್ದ್ರ','ಪುನರ್ವಸು','ಪುಷ್ಯ','ಆಶ್ಲೇಷ','ಮಘ','ಪೂರ್ವ','ಉತ್ತರ','ಹಸ್ತ','ಚಿತ್ತ','ಸ್ವಾತಿ','ವಿಶಾಖ','ಅನುರಾಧ','ಜ್ಯೇಷ್ಠ','ಮೂಲ','ಪೂರ್ವಾಷಾಢ','ಉತ್ತರಾಷಾಢ','ಶ್ರವಣ','ಧನಿಷ್ಠ','ಶತಭಿಷ','ಪೂರ್ವಭಾದ್ರ','ಉತ್ತರಭಾದ್ರ','ರೇವತಿ'],
  ml: ['അശ്വതി','ഭരണി','കാർത്തിക','രോഹിണി','മകയിരം','തിരുവാതിര','പുണർതം','പൂയം','ആയില്യം','മകം','പൂരം','ഉത്രം','അത്തം','ചിത്ര','ചോതി','വിശാഖം','അനിഴം','തൃക്കേട്ട','മൂലം','പൂരാടം','ഉത്രാടം','തിരുവോണം','അവിട്ടം','ചതയം','പൂരുരുട്ടാതി','ഉത്രട്ടാതി','രേവതി'],
  en: ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Moola','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'],
};

export const RASI = {
  ta: ['மேஷம்','ரிஷபம்','மிதுனம்','கர்கடகம்','சிம்மம்','கன்னி','துலாம்','விருச்சிகம்','தனுசு','மகரம்','கும்பம்','மீனம்'],
  te: ['మేష','వృషభ','మిధున','కర్కాటక','సింహ','కన్య','తుల','వృశ్చిక','ధను','మకర','కుంభ','మీన'],
  kn: ['ಮೇಷ','ವೃಷಭ','ಮಿಥುನ','ಕರ್ಕಾಟಕ','ಸಿಂಹ','ಕನ್ಯ','ತುಲ','ವೃಶ್ಚಿಕ','ಧನು','ಮಕರ','ಕುಂಭ','ಮೀನ'],
  ml: ['മേടം','ഇടവം','മിഥുനം','കർക്കിടകം','ചിങ്ങം','കന്നി','തുലാം','വൃശ്ചികം','ധനു','മകരം','കുംഭം','മീനം'],
  en: ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'],
};

export const TAMIL_MONTHS = ['Chittirai','Vaikasi','Aani','Aadi','Aavani','Purattasi','Aippasi','Karthigai','Margazhi','Thai','Maasi','Panguni'];

export const I18N = {
  ta: {
    appTitle:'தக்ஷிண பஞ்சாங்கம்', calc:'கணக்கிடு', date:'தேதி', city:'நகரம்', lat:'அகலாங்கம் (Lat)', lon:'நெட்டாங்கம் (Lon)',
    useLoc:'என் இருப்பிடம்', calculate:'கணக்கு', reminders:'நினைவூட்டு இயக்கு', results:'இன்றைய பலன்கள்', news:'பக்தி செய்திகள்',
    footer:'ஆஃப்லைன் PWA • client-side மட்டும்', monthTitle:'மாத பஞ்சாங்கம்',
    rahu:'ராகு காலம்', yama:'யமகண்டம்', abhijit:'அபிஜித் முஹூர்த்தம்', shashti:'சஷ்டி நிலை', amrita:'அமிர்த காலம்', brahma:'பிரஹ்ம முகூர்த்தம்',
    tivaraatri:'திவராத்திரி', ausp:'மங்கள நாள்', shashtiMsg:'சஷ்டி விரதம் ({paksha}) — காலை பூஜை மறக்காதீங்க!', noShashti:'இன்று சஷ்டி இல்லை',
    mondayTuesday:'ஆம்', no:'இல்லை', goodNak:'மங்கல நட்சத்திரம்!', notMarked:'சாதாரண நாள்', rssLoad:'புதுப்பி',
    shuklaPaksha:'சுக்ல பக்ஷம்', krishnaPaksha:'கிருஷ்ண பக்ஷம்',
    remSet:'ராகு காலம் தொடங்க 30 நிமிடங்களுக்கு முன் நினைவூட்டு அமைக்கப்பட்டது', remNow:'ராகு காலம் தொடங்க போகுது—பூஜை தள்ளி வைக்கலாம்',
    weekdays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], festival:'விழா',
    shashtiFestival:'சஷ்டி விரதம்', somaPradosh:'சோம பிரதோஷம்', searchPlaceholder:'கட்டுரை தேடல்',
  },
  te: {
    appTitle:'దక్షిణ పంచాంగం', calc:'లెక్కించు', date:'తేది', city:'నగరం', lat:'అక్షాంశం (Lat)', lon:'రేఖాంశం (Lon)',
    useLoc:'నా స్థానం', calculate:'లెక్కించు', reminders:'రిమైండర్ ప్రారంభించు', results:'నేటి పంచాంగం', news:'భక్తి వార్తలు',
    footer:'Offline PWA • క్లయింట్ సైడ్ మాత్రమే', monthTitle:'నెల పంచాంగం',
    rahu:'రాహు కాలం', yama:'యమగండం', abhijit:'అభిజిత్ ముహూర్తం', shashti:'షష్ఠి', amrita:'అమృత కాలం', brahma:'బ్రహ్మ ముహూర్తం',
    tivaraatri:'శివరాత్రి', ausp:'శుభ దినం', shashtiMsg:'షష్ఠి వ్రతం ({paksha}) — ఉదయం పూజ మర్చిపోకండి!', noShashti:'నేడు షష్ఠి లేదు',
    mondayTuesday:'అవును', no:'కాదు', goodNak:'మంగళ నక్షత్రం!', notMarked:'సాధారణ రోజు', rssLoad:'రిఫ్రెష్',
    shuklaPaksha:'శుక్ల పక్షం', krishnaPaksha:'కృష్ణ పక్షం',
    remSet:'రాహు కాలానికి 30 నిమిషాల ముందు రిమైండర్ సెట్ చేయబడింది', remNow:'రాహు కాలం మొదలవుతోంది—పూజ వాయిదా వేయండి',
    weekdays:['ఆది','సోమ','మంగళ','బుధ','గురు','శుక్ర','శని'], festival:'పండుగ',
    shashtiFestival:'షష్ఠి వ్రతం', somaPradosh:'సోమ ప్రదోష్', searchPlaceholder:'వ్యాసం వెతకండి',
  },
  kn: {
    appTitle:'ದಕ್ಷಿಣ ಪಂಚಾಂಗ', calc:'ಲೆಕ್ಕಿಸು', date:'ದಿನಾಂಕ', city:'ನಗರ', lat:'ಅಕ್ಷಾಂಶ (Lat)', lon:'ರೇಖಾಂಶ (Lon)',
    useLoc:'ನನ್ನ ಸ್ಥಳ', calculate:'ಲೆಕ್ಕಿಸು', reminders:'ರಿಮೈಂಡರ್ ಪ್ರಾರಂಭಿಸು', results:'ಇಂದಿನ ಪಂಚಾಂಗ', news:'ಭಕ್ತಿ ಸುದ್ದಿ',
    footer:'Offline PWA • ಕ್ಲೈಂಟ್ ಸೈಡ್ ಮಾತ್ರ', monthTitle:'ಮಾಸಿಕ ಪಂಚಾಂಗ',
    rahu:'ರಾಹು ಕಾಲ', yama:'ಯಮಗಂಡ', abhijit:'ಅಭಿಜಿತ್ ಮುಹೂರ್ತ', shashti:'ಷಷ್ಠಿ', amrita:'ಅಮೃತ ಕಾಲ', brahma:'ಬ್ರಹ್ಮ ಮುಹೂರ್ತ',
    tivaraatri:'ಶಿವರಾತ್ರಿ', ausp:'ಶುಭ ದಿನ', shashtiMsg:'ಷಷ್ಠಿ ವ್ರತ ({paksha}) — ಬೆಳಿಗ್ಗೆ ಪೂಜೆ ಮರೆಯಬೇಡಿ!', noShashti:'ಇಂದು ಷಷ್ಠಿ ಇಲ್ಲ',
    mondayTuesday:'ಹೌದು', no:'ಇಲ್ಲ', goodNak:'ಮಂಗಳ ನಕ್ಷತ್ರ!', notMarked:'ಸಾಮಾನ್ಯ ದಿನ', rssLoad:'ರಿಫ್ರೆಶ್',
    shuklaPaksha:'ಶುಕ್ಲ ಪಕ್ಷ', krishnaPaksha:'ಕೃಷ್ಣ ಪಕ್ಷ',
    remSet:'ರಾಹು ಕಾಲಕ್ಕೆ 30 ನಿಮಿಷ ಮೊದಲು ರಿಮೈಂಡರ್ ಹೊಂದಿಸಲಾಗಿದೆ', remNow:'ರಾಹು ಕಾಲ ಪ್ರಾರಂಭವಾಗಲಿದೆ—ಪೂಜೆ ಮುಂದೂಡಿ',
    weekdays:['ಭಾನು','ಸೋಮ','ಮಂಗಳ','ಬುಧ','ಗುರು','ಶುಕ್ರ','ಶನಿ'], festival:'ಹಬ್ಬ',
    shashtiFestival:'ಷಷ್ಠಿ ವ್ರತ', somaPradosh:'ಸೋಮ ಪ್ರದೋಷ', searchPlaceholder:'ಲೇಖನ ಹುಡುಕಿ',
  },
  ml: {
    appTitle:'ദക്ഷിണ പഞ്ചാംഗം', calc:'കണക്കാക്കുക', date:'തീയതി', city:'നഗരം', lat:'അക്ഷാംശം (Lat)', lon:'രേഖാംശം (Lon)',
    useLoc:'എൻ്റെ സ്ഥാനം', calculate:'കണക്കാക്കുക', reminders:'റിമൈൻഡർ പ്രവർത്തനക്ഷമമാക്കുക', results:'ഇന്നത്തെ പഞ്ചാംഗം', news:'ഭക്തി വാർത്തകൾ',
    footer:'Offline PWA • ക്ലൈൻ്റ് സൈഡ് മാത്രം', monthTitle:'മാസ പഞ്ചാംഗം',
    rahu:'രാഹു കാലം', yama:'യമഗണ്ഡം', abhijit:'അഭിജിത് മുഹൂർത്തം', shashti:'ഷഷ്ഠി', amrita:'അമൃത കാലം', brahma:'ബ്രഹ്മ മുഹൂർത്തം',
    tivaraatri:'ശിവരാത്രി', ausp:'ശുഭ ദിനം', shashtiMsg:'ഷഷ്ഠി വ്രതം ({paksha}) — രാവിലെ പൂജ മറക്കരുത്!', noShashti:'ഇന്ന് ഷഷ്ഠി ഇല്ല',
    mondayTuesday:'അതെ', no:'ഇല്ല', goodNak:'മംഗള നക്ഷത്രം!', notMarked:'സാധാരണ ദിവസം', rssLoad:'റിഫ്രഷ്',
    shuklaPaksha:'ശുക്ല പക്ഷം', krishnaPaksha:'കൃഷ്ണ പക്ഷം',
    remSet:'രാഹു കാലത്തിന് 30 മിനിറ്റ് മുമ്പ് റിമൈൻഡർ സജ്ജമാക്കി', remNow:'രാഹു കാലം തുടങ്ങാൻ പോകുന്നു—പൂജ മാറ്റിവക്കൂ',
    weekdays:['ഞായർ','തിങ്കൾ','ചൊവ്വ','ബുധൻ','വ്യാഴം','വെള്ളി','ശനി'], festival:'ഉത്സവം',
    shashtiFestival:'ഷഷ്ഠി വ്രതം', somaPradosh:'സോമ പ്രദോഷം', searchPlaceholder:'ലേഖനം തിരയുക',
  },
  en: {
    appTitle:'Dakshin Panchangam', calc:'Calculate', date:'Date', city:'City', lat:'Latitude (Lat)', lon:'Longitude (Lon)',
    useLoc:'Use My Location', calculate:'Calculate', reminders:'Enable Reminder', results:"Today's Panchangam", news:'Bhakti News',
    footer:'Offline-ready PWA • Client-side only', monthTitle:'Monthly Panchangam',
    rahu:'Rahu Kalam', yama:'Yamagandam', abhijit:'Abhijit Muhurta', shashti:'Shashti', amrita:'Amrita Kalam', brahma:'Brahma Muhurta',
    tivaraatri:'Shivaratri', ausp:'Auspicious Day', shashtiMsg:'Shashti fasting ({paksha}) — Morning puja reminder!', noShashti:'No Shashti today',
    mondayTuesday:'Yes', no:'No', goodNak:'Mangala nakshatra!', notMarked:'Regular day', rssLoad:'Refresh',
    shuklaPaksha:'Shukla Paksha', krishnaPaksha:'Krishna Paksha',
    remSet:'Reminder set for 30 mins before Rahu Kalam', remNow:'Rahu Kalam starts soon—consider postponing puja',
    weekdays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], festival:'Festival',
    shashtiFestival:'Shashti Vratam', somaPradosh:'Soma Pradosh', searchPlaceholder:'Search articles',
  },
};

const LOCALE_MAP = { ta:'ta-IN', te:'te-IN', kn:'kn-IN', ml:'ml-IN', en:'en-IN' };

// ---------------------------------------------------------------------------
// State — persisted to localStorage
// ---------------------------------------------------------------------------

function loadState() {
  const cityIdx = parseInt(localStorage.getItem('panchangam:city') || '0', 10);
  const lang    = localStorage.getItem('panchangam:lang') || 'ta';
  return {
    city: CITY_PRESETS[cityIdx] || CITY_PRESETS[0],
    cityIdx: isNaN(cityIdx) ? 0 : cityIdx,
    lang: I18N[lang] ? lang : 'ta',
  };
}

const _state = loadState();
export let currentCity = _state.city;
export let currentCityIdx = _state.cityIdx;
export let currentLang = _state.lang;

export function setCity(idx) {
  currentCityIdx = idx;
  currentCity = CITY_PRESETS[idx] || CITY_PRESETS[0];
  localStorage.setItem('panchangam:city', String(idx));
}

export function setLang(lang) {
  currentLang = I18N[lang] ? lang : 'ta';
  localStorage.setItem('panchangam:lang', currentLang);
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

export const t = (key) => (I18N[currentLang] || I18N.en)[key] || key;
export const fmtTime = (d) => d.toLocaleTimeString(LOCALE_MAP[currentLang] || 'en-IN', { hour:'2-digit', minute:'2-digit' });
export const toLocalDateStr = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const addMinutes = (date, mins) => new Date(date.getTime() + mins * 60000);

export const getRahuKalam   = (sr) => ({ start: addMinutes(sr,  90), end: addMinutes(sr, 180) });
export const getYamagandam  = (sr) => ({ start: addMinutes(sr, 450), end: addMinutes(sr, 540) });
export const getAbhijit     = (sr) => ({ start: addMinutes(sr, 504), end: addMinutes(sr, 552) });
export const getAmrita      = (sr) => ({ start: addMinutes(sr, 240), end: addMinutes(sr, 288) });
export const getBrahma      = (sr) => ({ start: addMinutes(sr, -96), end: addMinutes(sr, -48) });

export const tithiName    = (n, lang) => (TITHI_NAMES[lang]  || TITHI_NAMES.en)[n - 1]  || '';
export const nakshatraName= (n, lang) => (NAKSHATRA[lang]    || NAKSHATRA.en)[n - 1]     || '';
export const rasiName     = (n, lang) => (RASI[lang]         || RASI.en)[n]              || '';
export const paksha       = (tithi)   => tithi <= 15 ? 'Shukla' : 'Krishna';
export const pakshaNative = (tithi, lang) => tithi <= 15 ? t('shuklaPaksha') : t('krishnaPaksha');

/** Tamil solar month name from the sun's rasi (0–11). */
export function tamilMonthLabel(tamilDay, moonRasi) {
  // tamilDay is the day within the Tamil solar month (1–30)
  // sunRasi can be approximated from moonRasi as a rough proxy, or we use fixed month names
  // The 12 Tamil months map to sun transiting each rasi:
  const months = ['Chittirai','Vaikasi','Aani','Aadi','Aavani','Purattasi','Aippasi','Karthigai','Margazhi','Thai','Maasi','Panguni'];
  // We use the API tamilDay (day within solar month) + rough month from date
  return `${tamilDay}`;
}

/** Full label like "Panguni 22" using sunRasi from API. */
export function solarDayLabel(date, tamilDay, sunRasi) {
  // sunRasi: 0=Aries(Chittirai)…11=Pisces(Panguni)
  const months = ['Chittirai','Vaikasi','Aani','Aadi','Aavani','Purattasi','Aippasi','Karthigai','Margazhi','Thai','Maasi','Panguni'];
  if (sunRasi !== undefined && sunRasi !== null) {
    return `${months[sunRasi]} ${tamilDay}`;
  }
  // Fallback: approximate from Gregorian date + 14-day offset for solar month transition
  const d = new Date(date);
  const dayOfMonth = d.getDate();
  // Tamil solar month starts ~14th of each Gregorian month
  // April 1–13 = Panguni, April 14+ = Chittirai
  let mIdx = ((d.getMonth() - 3 + 12) % 12);
  if (dayOfMonth < 14) mIdx = ((mIdx - 1 + 12) % 12);
  return `${months[mIdx]} ${tamilDay}`;
}

export function getShashti(tithi, lang) {
  const l = lang || currentLang;
  if (tithi === 6 || tithi === 21) {
    const p = tithi <= 15 ? (I18N[l]||I18N.en).shuklaPaksha : (I18N[l]||I18N.en).krishnaPaksha;
    return (I18N[l]||I18N.en).shashtiMsg.replace('{paksha}', p);
  }
  return (I18N[l]||I18N.en).noShashti;
}

export function getFestivalTags(date, tithi, lang) {
  const l = lang || currentLang;
  const i = I18N[l] || I18N.en;
  const tags = [];
  if ([6, 21].includes(tithi)) tags.push(i.shashtiFestival);
  if (tithi === 15) tags.push((TITHI_NAMES[l] || TITHI_NAMES.en)[14]);
  if (tithi === 30) tags.push((TITHI_NAMES[l] || TITHI_NAMES.en)[29]);
  if (date.getDay() === 1 && [13, 28].includes(tithi)) tags.push(i.somaPradosh);
  return tags;
}

// Moon-phase SVG emoji based on tithi
export function moonPhaseEmoji(tithi) {
  if (tithi === 15) return '🌕';
  if (tithi === 30) return '🌑';
  if (tithi <= 7)   return '🌒';
  if (tithi <= 14)  return '🌔';
  if (tithi <= 22)  return '🌖';
  return '🌘';
}

// ---------------------------------------------------------------------------
// API cache + fetch helpers
// ---------------------------------------------------------------------------

const apiCache = {};

export async function fetchDayData(dateStr, lat, lon) {
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

export async function fetchMonthData(year, month, lat, lon) {
  const first = new Date(year, month, 1);
  const gridStart = new Date(first);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const last = new Date(year, month + 1, 0);
  const gridEnd = new Date(last);
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));

  const startStr = toLocalDateStr(gridStart);
  const endStr   = toLocalDateStr(gridEnd);
  const cacheKey = `month:${startStr}:${endStr}:${lat}:${lon}`;
  if (apiCache[cacheKey]) return apiCache[cacheKey];

  try {
    const res = await fetch(`/api/panchangam?date=${encodeURIComponent(startStr)}&endDate=${encodeURIComponent(endStr)}&lat=${lat}&lon=${lon}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const map = {};
        data.forEach(d => { map[d.date] = d; apiCache[`${d.date}:${lat}:${lon}`] = d; });
        apiCache[cacheKey] = map;
        return map;
      }
    }
  } catch (_) {}
  return null;
}

// ---------------------------------------------------------------------------
// RSS helpers
// ---------------------------------------------------------------------------

function extractImageFromItem(item, description) {
  const media = item.querySelector('media\\:content, content');
  if (media?.getAttribute('url')) return media.getAttribute('url');
  const enc = item.querySelector('enclosure');
  if (enc?.getAttribute('url')) return enc.getAttribute('url');
  const match = description.match(/<img[^>]+src=["']([^"']+)/i);
  return match ? match[1] : '';
}

function parseRSSItems(xmlDoc, sourceMeta) {
  if (!xmlDoc) return [];
  return Array.from(xmlDoc.querySelectorAll('item')).slice(0, 12).map(item => {
    const title = item.querySelector('title')?.textContent?.trim() || 'Untitled';
    const link  = item.querySelector('link')?.textContent?.trim()  || '#';
    const desc  = item.querySelector('description')?.textContent   || '';
    const clean = desc.replace(/<[^>]+>/g, '').trim();
    const pub   = item.querySelector('pubDate')?.textContent       || '';
    return {
      title, link,
      summary: clean.slice(0, 160),
      pubMs: pub ? new Date(pub).getTime() : 0,
      dateText: pub ? new Date(pub).toLocaleDateString('en-IN', { month:'long', day:'numeric', year:'numeric' }) : '',
      image: extractImageFromItem(item, desc),
      tag: sourceMeta.tag,
      source: sourceMeta.name,
    };
  });
}

export async function fetchFeed(source) {
  const parse = txt => parseRSSItems(new DOMParser().parseFromString(txt, 'application/xml'), source);
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

export async function loadAllFeeds() {
  const results = await Promise.all(RSS_SOURCES.map(fetchFeed));
  return results.flat().sort((a, b) => b.pubMs - a.pubMs);
}

// ---------------------------------------------------------------------------
// Navigation wiring
// ---------------------------------------------------------------------------

const NAV_ROUTES = {
  today: '/', calendar: '/calendar/', festivals: '/festivals/',
  temples: '/temples/', news: '/news/', settings: '/settings/', chat: '/chat/',
};

export function wireNav(activeKey) {
  document.querySelectorAll('[data-nav]').forEach(el => {
    const key = el.getAttribute('data-nav');
    if (NAV_ROUTES[key]) el.href = NAV_ROUTES[key];
    if (key === activeKey) {
      el.classList.add('!text-purple-900', '!font-bold', '!bg-purple-50');
    }
  });
}
