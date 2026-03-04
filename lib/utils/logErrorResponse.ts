// lib/utils/logErrorResponse.ts

import { AxiosError } from 'axios';

export function logErrorResponse(
  error: AxiosError,
  context: string
) {
  console.error(context);

  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
}