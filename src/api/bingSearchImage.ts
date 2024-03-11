// import ky from 'ky'
// import * as cheerio from 'cheerio';

// export async function fetchImageUrls(searchQuery: string): Promise<string[]> {
//   const searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(searchQuery)}`;
//
//   try {
//     const response = await ky.get(searchUrl);
//     const $ = cheerio.load(await response.text());
//     const imageUrls: string[] = [];
//
//     $('img').each((index, element) => {
//       const imageUrl = $(element).attr('src');
//       if (imageUrl && imageUrl.startsWith('http')) {
//         imageUrls.push(imageUrl);
//       }
//     });
//
//     return imageUrls;
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     return [];
//   }
// }
