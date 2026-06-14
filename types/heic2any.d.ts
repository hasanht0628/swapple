declare module 'heic2any' {
  interface ConvertOptions {
    blob: Blob;
    toType: 'image/jpeg' | 'image/png';
    quality?: number;
  }

  function heic2any(options: ConvertOptions): Promise<Blob | Blob[]>;
  export default heic2any;
}