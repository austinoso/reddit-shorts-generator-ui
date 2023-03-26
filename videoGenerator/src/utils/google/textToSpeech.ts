import textToSpeach from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import { getAudioDurationInSeconds } from "get-audio-duration";

export async function textToSpeech(text: string, savePath: string) {
  const client = new textToSpeach.TextToSpeechClient();

  const [response] = await client.synthesizeSpeech({
    input: { text: text },
    voice: { languageCode: "en-US", name: "en-US-Neural2-J" },
    audioConfig: { audioEncoding: "LINEAR16", speakingRate: 1.41, pitch: 0 },
  });

  const writeFile = util.promisify(fs.writeFile);
  await writeFile(savePath, response.audioContent, "binary");
  console.log(`Audio content written to file: ${savePath}`);

  const duration = await getAudioDurationInSeconds(savePath);
  return { savePath, duration };
}
