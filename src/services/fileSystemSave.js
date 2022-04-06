import * as FileSystem from "expo-file-system";

// const base64Example = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqdasdsadasdasdasddas222222/2222222YGBgmhivGQYGBgYGBgYGBgYGBgdUTVAAAAABJRU5ErkJggg==`;
// const base64Code = base64Example.split("data:image/png;base64,")[1];

const imagePath = FileSystem.documentDirectory + "MoviesKeeper-v2/";
const imageToSave = (base64) => imagePath + `${base64}-movies-keeper-64`;

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imagePath);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(imagePath, { intermediates: true });
  }
}

export const handleSaveBase64 = async (imgKey, base64Code) => {
  // console.log(imagePath)
  try {
    await ensureDirExists();
    await FileSystem.writeAsStringAsync(imageToSave(imgKey), base64Code);
  } catch (e) {
    console.log(`Ups! Error: ${e}`);
  }
};

export const handleGetBase64 = async (imgKey) => {
  // let data = await FileSystem.readDirectoryAsync(imagePath)
  // console.log(`El valor de IMGKEY: ${imgKey}`)
  if((typeof imgKey) === 'undefined') return
  try {
    let imgUrisera = await FileSystem.readAsStringAsync(imageToSave(imgKey));
    let convertBase64 = `data:image/jpeg;base64,${imgUrisera}`;
    return convertBase64;
  } catch (err) {
    console.log(err);
  }
};

export const handleReadDirectory = async (imgKey) => {
  let data = await FileSystem.readDirectoryAsync(imagePath);
  console.log(data);
  // let imgUrisera  = await FileSystem.readAsStringAsync(imageToSave(imgKey))
  // let convertBase64 = `data:image/jpeg;base64,${imgUrisera}`
  // console.log(imgUrisera)

  return data;
};
