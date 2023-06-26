import { initializeApp } from "firebase/app";

const databaseConfig = initializeApp({
    apiKey: "AIzaSyBwfBKrG10EZLFsIGImMzYBMhOc45ccIFo",
    authDomain: "casamento-luan-laressa.firebaseapp.com",
    databaseURL: "https://casamento-luan-laressa-default-rtdb.firebaseio.com",
    projectId: "casamento-luan-laressa"
});

export { databaseConfig };