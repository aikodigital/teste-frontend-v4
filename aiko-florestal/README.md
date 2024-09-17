## DOCUMENTAÇÃO AIKO-FLORESTAL

-  Por favor, leia esta documentação para um melhor entendimento do que foi feito.

-  O sistema é feito em `React` com `Typescript` usando `Tailwind CSS` para a estilização, usei a biblioteca `leaflet` para o mapa e `lucide-react`para os ícones.

-  Apesar de ser um teste pequeno e objetivo, eu decidi estruturar o sistema de forma que seja escalável e independente, assim, se um dia novas features ou novos serviços forem implementados, tudo já estaria criado e apenas seria preciso acomodar a nova atualização na organização do sistema atual.

-  O projeto conta com regras de ESLint e alguns testes unitários usando `Jest` que julguei necessários.

## ESLint

-  Foi implementado um conjunto de regras de ESLint para garantir a qualidade e consistência do código, como, por exemplo, organização das importações, variáveis sem uso, entre outras regras.

## Resolvi fazer uma pequena arquitetura baseada em `microsserviços` com a seguinte organização:

-  **/assets**: Adicionada para armazenar arquivos estáticos, como imagens e fontes.
-  **/components**: Componentes sem vínculos que podem ser reaproveitados por qualquer parte do sistema.
-  **/config**: Destinado à organização das rotas e dos providers.
-  **/context**: Contextos usados pelo sistema como um todo.
-  **/data**: Dados disponibilizados para a realização do teste.
-  **/hooks**: Hooks usados no sistema.
-  **/modules**: Aqui ficam os microsserviços da aplicação, no caso só temos o de equipments com seus próprios componentes somente relacionados a ele, suas próprias rotas e suas subpaginas, porém podemos implementar mais coisas se necessário, por exemplo, se este teste requisitasse consumo de API poderíamos criar uma pasta `integrations` onde todas as chamadas relacionadas somente ao microsserviço de equipments estariam.
-  **/pages**: Onde cada microsserviço é renderizado.
-  **/utils**: Funções úteis usadas pelo sistema todo.
