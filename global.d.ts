declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

// added this so that import.meta.env won't error and say: "Property 'env' does not exist on type 'ImportMeta'""
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
