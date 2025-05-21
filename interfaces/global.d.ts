declare global {
  type IoniconsName =
    | "grid"
    | "bookmark"
    | "bookmark-outline"
    | "person"
    | "person-outline";

  type ActiveTab = "posts" | "saved" | "tagged";
  type ActiveMessageTab = "messages" | "requests" | "blocked";
}

export type ActiveTab = "posts" | "saved" | "tagged";

declare namespace NodeJS {
  export interface ProcessEnv {
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  }
}
