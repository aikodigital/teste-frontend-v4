// global.d.ts

// Exemplo de interface com propriedades
interface MyGlobalInterface {
  property1: string;
  property2: number;
}

// Definições globais
interface Window {
  myCustomGlobalVar: string;
}

// Extensão de módulos existentes (se necessário)
declare module "some-library" {
  export function myNewFunction(): void;
}

// Tipos de variáveis de ambiente (se necessário)
declare const process: {
  env: {
    REACT_APP_API_URL: string;
  };
};
