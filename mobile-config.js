// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'pt.utl.ist.neeti.breakingdev',
  name: 'BreakingDev',
  description: 'BreakingDev official app',
  author: 'NEETI-IST',
  email: 'geral@neeti.tecnico.ulisboa.pt',
  website: 'http://neeti.ist.utl.pt'
});

// Set up resources such as icons and launch screens.
App.icons({
  
  'android_mdpi': 'public/favicons/android-chrome-48x48.png',
  'android_hdpi': 'public/favicons/android-chrome-72x72.png',
  'android_xhdpi': 'public/favicons/android-chrome-96x96.png',
  'android_xxhdpi': 'public/favicons/android-chrome-144x144.png',
  'android_xxxhdpi': 'public/favicons/android-chrome-192x192.png',
  
  // More screen sizes and platforms...
});
App.launchScreens({
  'android_mdpi_landscape': 'public/favicons/AndroidSplashHorizontal.png',
  'android_mdpi_portrait': 'public/favicons/AndroidSplashVertical.png',
  'android_hdpi_landscape': 'public/favicons/AndroidSplashHorizontal.png',
  'android_hdpi_portrait': 'public/favicons/AndroidSplashVertical.png',
  'android_xhdpi_landscape': 'public/favicons/AndroidSplashHorizontal.png',
  'android_xhdpi_portrait': 'public/favicons/AndroidSplashVertical.png',
  'android_xxhdpi_landscape': 'public/favicons/AndroidSplashHorizontal.png',
  'android_xxhdpi_portrait': 'public/favicons/AndroidSplashVertical.png',
  'android_xxxhdpi_landscape': 'public/favicons/AndroidSplashHorizontal.png',
  'android_xxxhdpi_portrait': 'public/favicons/AndroidSplashVertical.png',
  // More screen sizes and platforms...
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
