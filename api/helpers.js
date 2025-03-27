import sharp from 'sharp';
import axios from 'axios';

export const getDataFromBlobs = async(blobCollection) => {
  const dataPromises = blobCollection.map(async(blob) => {
    const response = await axios.get(blob.url, { responseType: 'arraybuffer' });

    const buffer = Buffer.from(response.data, 'binary');
    const convertedBuffer = await sharp(buffer).png().toBuffer();

    return { url: `data:image/png;base64,${convertedBuffer.toString('base64')}` };
  });

  return Promise.all(dataPromises);
};

export const formatDateNow = () => {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(Date.now() - timezoneOffset)).toISOString().slice(0,-1);
  return localISOTime;
};

export const removeSystemMessage = (messages) => {
  return messages.filter((message) => message.role !== 'system');
};

// Helper function to convert CSV buffer to text
export async function convertCsvBufferToText(buffer) {
  return new Promise((resolve, reject) => {
    const results = [];
    const readableStream = Readable.from(buffer.toString());
    
    readableStream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        let text = '';
        results.forEach(row => {
          const entries = Object.entries(row);
          const rowText = entries
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
          text += rowText + '\n\n';
        });
        resolve(text);
      })
      .on('error', reject);
  });
}