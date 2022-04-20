import * as FileSystem from "expo-file-system";

const imagePath = FileSystem.documentDirectory + "MoviesKeeper-v2/";
const imageToSave = (imgKey) => imagePath + `${imgKey}-movies-keeper-64`;

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imagePath);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(imagePath, { intermediates: true });
  }
}

export const handleSaveBase64 = async (imgKey, base64Code) => {
  try {
    await ensureDirExists();
    await FileSystem.writeAsStringAsync(imageToSave(imgKey), base64Code);
  } catch (e) {
    console.log(`Ups! Error: ${e}`);
  }
};

export const handleGetBase64 = async (imgKey) => {
  if((typeof imgKey) === 'undefined' || !imgKey) return
  try {
    let imgUrisera = await FileSystem.readAsStringAsync(imageToSave(imgKey));
    let convertBase64 = `data:image/jpeg;base64,${imgUrisera}`;
    return convertBase64;
  } catch (err) {
    console.log('some error by getting base 64');
  }
};

export const handleReadDirectory = async() => {
  try {
    await ensureDirExists();

    let data = await FileSystem.readDirectoryAsync(imagePath);
    return data;
  }catch(err) {
    console.log('some error by reading directory')
  }
};

export const handleDeleteOneFile = (imgKey) => {
  if((typeof imgKey) === 'undefined') return
  FileSystem.deleteAsync(imageToSave(imgKey), {idempotent: true})
}
export const handleDeleteAllFiles = () => {
  FileSystem.deleteAsync(imagePath, {idempotent: true})
}