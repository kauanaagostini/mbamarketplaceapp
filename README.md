## Marketplace Mobile
Aplicação mobile de um aplicativo de vendas de produto.


Acesse o [**link**](https://www.figma.com/design/lUSyuuLhmm2RwKVBPbQhA3/App-de-Marketplace-(Community)?node-id=1085-814&t=eKbJVvSmxFnvOLkd-0) do Figma aqui.

Esse é o último projeto do trio que compõe a aplicação Marketplace.

- Dashboard de gestão para o produtor (Web), desafio da disciplina Frontend, acesse o [***repositório***](https://github.com/kauanaagostini/mba-marketplace).
- API do Marketplace para ser consumida tanto pelo dashboard quanto pelo app mobile, desafio da disciplina Backend, acesse o [***repositório***](https://github.com/kauanaagostini/mba-api-marketplace).
- Aplicação mobile voltada para o cliente, que é esse desafio da disciplina Mobile.



### Funcionalidades das aplicação

#### Funcionalidades abertas a todos os usuários:
- [x] Deve ser possível cadastrar um usuário.
- [x] Deve ser possível se autenticar na aplicação.
- [ ] Deve ser possível realizar upload de imagem.

#### Funcionalidades acessadas a usuário logados na aplicação
- [x] Deve ser exibida uma página de Listagem de produtos, mostrando as seguintes informações de cada um deles: imagem, título e preço.
- [x] Deve ser possível listar os dados do usuário.
- [x] Deve ser possível listar os dados de um produto específico: imagem, título, preço, descrição, categoria.
- [x] Deve ser possível se deslogar da aplicação.
- [ ] Deve ser possível filtrar a lista de produtos pelo campo de texto `Pesquisa`
- [ ] Deve ser possível filtrar a lista de produtos pelo modal passando um valor inicial e/ou um valor máximo
- [ ] Deve ser possível filtrar a lista de produtos pelo modal passando a categoria.
- [ ] Os filtros aplicados na pesquisa ou no modal serão aplicados no estado que armazena a lista de produtos.
- [ ] Deve ser possível atualizar os dados do usuário.
- [ ] A atualização de senha deve passar, assim como no cadastro, por uma confirmação ao atualizar.
- [ ] Deve ser possível listar os dados de um produto específico: métrica de visualização nos últimos 7 dias.
- [ ] Deve ser possível entrar em contato com o vendedor via Whatsapp.

#### Requisitos não funcionais
- [ ] Gerenciador de Token (refresh_token)
- [ ] Testes Automatizados.



### Conceitos praticados no projeto:
- React
- Biblioteca de componentes
- Integração com API Node
- Autenticação
- Formulários
- Upload de arquivos

### Tecnologias utilizadas no projeto:
- Expo
- GluestackUI
- React Hook Form
- Expo Router
- Axios
- yup