declare global {
  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
  }
}

export { };
