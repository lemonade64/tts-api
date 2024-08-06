import { NextResponse } from "next/server";
import text2wav from "text2wav";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SAMPLE_RATE = 12000;
const CHANNELS = 1;
const BYTES_PER_SAMPLE = 4;
const WAV_HEADER_SIZE = 44;

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

function uint8ArrayToWavBuffer(uint8Array) {
  const header = createWavHeader(uint8Array.length);
  return Buffer.concat([header, Buffer.from(uint8Array)]);
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

    const response = {};

    return NextResponse.json({ response: response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
