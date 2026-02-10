export {};

declare global {
  interface Window {
    //This defines the function signature for the library
    particlesJS: ( tagId: string, params: object ) => void;
  }
}