import { NextResponse } from "next/server";
import text2wav from "text2wav";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SAMPLE_RATE = 12000;
const CHANNELS = 1;
const BYTES_PER_SAMPLE = 4;
const WAV_HEADER_SIZE = 44;

/**
 * Creates a WAV header buffer
 * @param {number} dataLength - Length of the audio data
 * @returns {Buffer} WAV header buffer
 */
function createWavHeader(dataLength) {
  const buffer = Buffer.alloc(WAV_HEADER_SIZE);
  const fileSize = dataLength + WAV_HEADER_SIZE - 8;

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(fileSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * CHANNELS * BYTES_PER_SAMPLE, 28);
  buffer.writeUInt16LE(CHANNELS * BYTES_PER_SAMPLE, 32);
  buffer.writeUInt16LE(32, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataLength, 40);

  return buffer;
}

/**
 * Converts Uint8Array to WAV buffer
 * @param {Uint8Array} uint8Array - Audio data as Uint8Array
 * @returns {Buffer} WAV buffer
 */
function uint8ArrayToWavBuffer(uint8Array) {
  const header = createWavHeader(uint8Array.length);
  return Buffer.concat([header, Buffer.from(uint8Array)]);
}

/**
 * Converts WAV buffer to base64 string
 * @param {Buffer} wavBuffer - WAV buffer
 * @returns {string} base64 encoded WAV data
 */
function wavBufferToBase64(wavBuffer) {
  return `data:audio/wav;base64,${wavBuffer.toString("base64")}`;
}

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "POST ONLY" }, { status: 405 });
  }

  try {
    const { text } = await req.json();

    const options = {
      punct: true,
    };

    const uint8Array = await text2wav(text, options);
    const wavBuffer = uint8ArrayToWavBuffer(uint8Array);
    const base64Wav = wavBufferToBase64(wavBuffer);

    return NextResponse.json({ response: base64Wav });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
