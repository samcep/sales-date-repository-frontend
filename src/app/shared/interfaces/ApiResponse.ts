export interface ApiResponse<TData> {
  isSuccess: boolean;
  message: string | null;
  data: TData;
  errors: string[];
}
