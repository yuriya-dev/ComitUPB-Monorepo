import { RegisterInput, ContactInput, ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function registerMember(data: RegisterInput): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "Gagal terhubung ke server. Silakan coba lagi.",
      error: error.message,
    };
  }
}

export async function sendContactMessage(data: ContactInput): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "Gagal mengirim pesan. Silakan coba lagi.",
      error: error.message,
    };
  }
}
