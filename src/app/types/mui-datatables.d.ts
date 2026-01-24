/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A biblioteca `mui-datatables` não fornece definições de tipos oficiais em TypeScript.
 *
 * Para permitir o uso da tabela no projeto sem quebrar a checagem de tipos,
 * este arquivo declara manualmente o módulo como `any`.
 *
 * Essa abordagem é comum quando:
 * - a biblioteca é escrita em JavaScript
 * - não existe pacote `@types` oficial ou mantido
 * - o projeto utiliza TypeScript em modo strict
 *
 * Caso a biblioteca passe a fornecer typings no futuro,
 * esta declaração pode ser removida.
 */

declare module 'mui-datatables' {
    const MUIDataTable: any
    export default MUIDataTable
}


