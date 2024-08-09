# Overview

Amplify is an API for converting text to speech (TTS) using a speech synthesiser.

- [**text2wav**](https://www.npmjs.com/package/text2wav): utilises its speech synthesiser to convert text into audio files in the form of Uint8Array objects.

# Getting Started with Amplify

Amplify operates by receiving a POST request with text data, which is processed to generate a WAV file encoded in base64. This file is then returned to the user as a JSON object in the response body.

## Authentication

Currently, Amplify does not require authentication. However, please ensure that your application securely handles the API responses.

## Sending a POST Request

To convert text to speech, send a POST request to the Amplify endpoint with the text you want to convert. Here’s an example using `axios` in Node.js:

```javascript
const axios = require("axios");

async function convertTextToSpeech(textData) {
  try {
    const response = await axios.post("", {
      text: textData,
    });
    console.info("Wav base64:", response.data.response);
  } catch (e) {
    console.error("Error Converting Text to Speech:", e.message);
  }
}

const text = "...";
convertTextToSpeech(text);
```

Replace `text` with the text you want to convert to speech.

## Processing the Request

When the POST request is received, Amplify processes the text and generates a WAV file containing the spoken audio using `text2wav`. This file is then encoded in base64 and returned in the response body as a JSON object.

## Handling the Response

The JSON response will include the base64 wav data. Here’s an example response:

```json
{
  "response": "base64 Wav File."
}
```

## Error Handling

In case of errors, such as invalid image data or processing issues, Amplify API will return an appropriate HTTP status code along with an error message in the response body.
