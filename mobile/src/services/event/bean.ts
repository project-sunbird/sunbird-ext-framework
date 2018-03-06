export interface ImportContentProgress {
  currentCount: number;
  totalCount: number;
}


export interface DownloadProgress {
  downloadId: number;
  identifier: string;
  downloadProgress: number;
  status: number;
}

