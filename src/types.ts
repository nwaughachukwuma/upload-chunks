export interface UploadOptions {
  /** upload url to the storage service */
  url: string;
  appendToFormData?: Record<string, any>;
  /** headers to be sent with the request */
  headers?: Record<string, any>;
}
