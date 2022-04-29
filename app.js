if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('OKAY, SW registered.', reg))
        .catch((err) => console.log('OOPPSS, SW not registered.', err))
}