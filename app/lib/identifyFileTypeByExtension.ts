export const identifyFileTypeByExtension = (fileName: string) => {
    // 拡張子を小文字に変換して抽出
    const extension = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();
  
    // 画像ファイルの拡張子
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    // 動画ファイルの拡張子
    const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv'];
    // 音楽ファイルの拡張子
    const musicExtensions = ['mp3', 'wav', 'aac', 'flac', 'ogg'];
  
    if (imageExtensions.includes(extension)) {
      return 'image';
    } else if (videoExtensions.includes(extension)) {
      return 'video';
    } else if (musicExtensions.includes(extension)) {
      return 'music';
    } else {
      return null;
    }
  }
  