declare module 'leancloud-storage/dist/av' {
  interface FileOptions {
    keepFileName?: boolean;
    onprogress?: (progress: { percent: number }) => void;
  }

  interface FileAttributes {
    url: string;
  }

  class File {
    constructor(name: string, data: File | Blob);
    save(options?: FileOptions): Promise<File>;
    attributes: FileAttributes;
  }

  interface InitOptions {
    appId: string;
    appKey: string;
    serverURLs: string | undefined;
  }

  const AV: {
    init(options: InitOptions): void;
    File: typeof File;
  };

  export default AV;
}
