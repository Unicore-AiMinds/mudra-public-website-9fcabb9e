/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAND_MODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
