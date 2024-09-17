import React from "react";
import '../styles/about.scss'

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header--item">
                    <h1>Sobre o Projeto Gestor de tráfego</h1>
                    <p>
                        O projeto <strong>Gestor de Tráfego</strong> é uma aplicação web desenvolvida para visualizar e gerenciar dados de equipamentos em uma operação florestal. A ferramenta oferece a exibição de posições e estados dos equipamentos em um mapa interativo, visualização do histórico de estados e fornece insights detalhados sobre a produtividade e o ganho dos equipamentos.
                    </p>
                    <p>
                        Nesta página, você encontrará informações detalhadas sobre a construção do projeto, incluindo as tecnologias utilizadas, a arquitetura da aplicação e os principais recursos e funcionalidades implementados.
                    </p>
                    <p>
                        A aplicação permite aos usuários:
                    </p>
                    <ul>
                        <li>Visualizar as posições dos equipamentos em um mapa interativo.</li>
                        <li>Acompanhar o estado atual e o histórico de estados dos equipamentos.</li>
                        <li>Filtrar e pesquisar equipamentos com base em diferentes critérios.</li>
                        <li>Calcular a produtividade e o ganho dos equipamentos com base em seus estados e modelos.</li>
                    </ul>
                    <p>
                        As seguintes tecnologias foram utilizadas:
                    </p>
                    <ul>
                        <li>React</li>
                        <li>Leaflet</li>
                        <li>SASS</li>
                        <li>Vite</li>
                        <li>Jest</li>
                    </ul>
                    <p>
                        Abaixo, serão listados os principais componentes e suas funcionalidades, com exemplos dos pontos mais relevantes da aplicação.
                    </p>

                </div>

                <div className="about-header--item">
                    <h2>Componente EquipmentDetails</h2>
                    <p>
                        O componente <strong>EquipmentDetails</strong> é responsável por exibir as informações detalhadas de um 
                        equipamento selecionado no mapa. Quando o usuário clica em um equipamento no mapa, este componente
                        abre uma barra lateral com detalhes como o nome do modelo do equipamento, o status atual e o 
                        histórico de estados.
                    </p>
                    <p>
                        Ele recebe três props principais:
                    </p>
                    <ul>
                        <li><strong>selectedEquipment</strong>: Contém os dados do equipamento selecionado, como nome, modelo e estado.</li>
                        <li><strong>generateHistoryContent</strong>: Função que gera o conteúdo de histórico de estados do equipamento.</li>
                        <li><strong>onClose</strong>: Função para fechar a barra lateral de detalhes.</li>
                    </ul>
                </div>

                <div className="about-header--item">
                    <p>
                        Aqui está um exemplo de uso do <strong>EquipmentDetails</strong>:
                    </p>
                    <pre>
{`
<EquipmentDetails 
    selectedEquipment={selectedEquipment}
    generateHistoryContent={generateHistoryContent}
    onClose={handleCloseDetails}
/>
`}
                    </pre>
                </div>
                
                <div className="about-header--item">
                <h2>Componente EquipmentMap</h2>
                    <p>
                        O componente <strong>EquipmentMap</strong> é responsável por exibir um mapa interativo com os equipamentos e suas posições. Ele utiliza a biblioteca Leaflet para renderizar o mapa e os marcadores.
                    </p>
                    <p>
                        Principais props:
                    </p>
                    <ul>
                        <li><strong>filteredData</strong>: Dados dos equipamentos filtrados a serem exibidos no mapa.</li>
                        <li><strong>getIcon</strong>: Função para obter o ícone do marcador com base no modelo e status do equipamento.</li>
                        <li><strong>calculateProductivity</strong>: Função para calcular a produtividade do equipamento com base em seu histórico de estados.</li>
                        <li><strong>calculateGain</strong>: Função para calcular o ganho estimado do equipamento.</li>
                        <li><strong>setSelectedEquipment</strong>: Função para definir o equipamento selecionado e abrir a barra lateral de detalhes.</li>
                        <li><strong>selectedEquipmentPositions</strong>: Lista de posições do equipamento selecionado, usada para desenhar uma linha no mapa.</li>
                    </ul>
                    <p>
                        Exemplo de uso do <strong>EquipmentMap</strong>:
                    </p>
                    <pre>
{`
<EquipmentMap 
    filteredData={filteredData}
    getIcon={getIcon}
    calculateProductivity={calculateProductivity}
    calculateGain={calculateGain}
    setSelectedEquipment={setSelectedEquipment}
    selectedEquipmentPositions={selectedEquipmentPositions}
/>
`}
                    </pre>
                </div>
                
                <div className="about-header--item">
                    <h2>Componente FilterComponent</h2>
                        <p>
                            O componente <strong>FilterComponent</strong> fornece filtros e uma caixa de pesquisa para refinar a exibição dos equipamentos no mapa. Ele permite aos usuários filtrar equipamentos por estado, modelo e pesquisar pelo nome do modelo.
                        </p>
                        <p>
                            Principais props:
                        </p>
                        <ul>
                            <li><strong>equipmentStateFilter</strong>: Valor do filtro de estado dos equipamentos.</li>
                            <li><strong>equipmentModelFilter</strong>: Valor do filtro de modelo dos equipamentos.</li>
                            <li><strong>searchTerm</strong>: Termo de pesquisa para filtrar equipamentos pelo nome do modelo.</li>
                            <li><strong>stateData</strong>: Dados dos estados disponíveis para o filtro.</li>
                            <li><strong>modelData</strong>: Dados dos modelos disponíveis para o filtro.</li>
                            <li><strong>handleStateFilterChange</strong>: Função chamada quando o filtro de estado é alterado.</li>
                            <li><strong>handleModelFilterChange</strong>: Função chamada quando o filtro de modelo é alterado.</li>
                            <li><strong>handleSearchTermChange</strong>: Função chamada quando o termo de pesquisa é alterado.</li>
                        </ul>
                        <p>
                            Exemplo de uso do <strong>FilterComponent</strong>:
                        </p>
                        <pre>
                        {`
<FilterComponent 
    equipmentStateFilter={equipmentStateFilter}
    equipmentModelFilter={equipmentModelFilter}
    searchTerm={searchTerm}
    stateData={stateData}
    modelData={modelData}
    handleStateFilterChange={handleStateFilterChange}
    handleModelFilterChange={handleModelFilterChange}
    handleSearchTermChange={handleSearchTermChange}
/>
                        `}
                        </pre>
                </div>

                <div className="about-header--item">
                    <h2>Componente MapComponent</h2>
                        <p>
                            O componente <strong>MapComponent</strong> é o coração da aplicação, gerenciando a lógica de exibição dos equipamentos no mapa. Ele coordena os dados, aplica filtros e pesquisa, e exibe o mapa com os equipamentos filtrados e seus detalhes.
                        </p>
                        <p>
                            Principais funcionalidades:
                        </p>
                        <ul>
                            <li><strong>useEffect</strong>: Carrega dados dos equipamentos e outros dados necessários quando o componente é montado e atualiza o estado.</li>
                            <li><strong>openDetails</strong>: Abre a barra lateral de detalhes para um equipamento selecionado e define suas posições.</li>
                            <li><strong>closeDetails</strong>: Fecha a barra lateral de detalhes e limpa as posições do equipamento selecionado.</li>
                            <li><strong>filterByState</strong>, <strong>filterByModel</strong>, <strong>filterBySearchTerm</strong>: Funções para aplicar filtros e pesquisa nos dados dos equipamentos.</li>
                        </ul>
                        <p>
                            Exemplo de uso do <strong>MapComponent</strong>:
                        </p>
                        <pre>
                        {`
<FilterComponent
    equipmentStateFilter={equipmentStateFilter}
    equipmentModelFilter={equipmentModelFilter}
    searchTerm={searchTerm}
    stateData={stateData}
    modelData={modelData}
    handleStateFilterChange={handleStateFilterChange}
    handleModelFilterChange={handleModelFilterChange}
    handleSearchTermChange={handleSearchTermChange}
/>

<EquipmentMap
    filteredData={filteredData}
    getIcon={getIcon}
    calculateProductivity={(stateHistory) => calculateProductivity(stateHistory, stateData)}
    calculateGain={calculateGain}
    setSelectedEquipment={openDetails}
    selectedEquipmentPositions={selectedEquipmentPositions}
/>

{detailsOpen && selectedEquipment && (
    <EquipmentDetails
        selectedEquipment={selectedEquipment}
        generateHistoryContent={(history) => generateHistoryContent(history, stateData)}
        onClose={closeDetails}
    />
)}
                        `}
                        </pre>
                </div>
                
                <div className="about-header--item">
                    <h2>Arquivo dataUtils.js</h2>
                    <p>
                        O arquivo <strong>dataUtils.js</strong> contém funções utilitárias para carregar dados de diferentes fontes JSON. A função <strong>fetchData</strong> é responsável por buscar todos os dados necessários para o funcionamento da aplicação.
                    </p>
                    <p>
                        A função <strong>fetchData</strong> faz o seguinte:
                    </p>
                    <ul>
                        <li>Busca os dados de equipamentos.</li>
                        <li>Busca os dados dos estados dos equipamentos.</li>
                        <li>Busca o histórico de estados dos equipamentos.</li>
                        <li>Busca o histórico de posições dos equipamentos.</li>
                        <li>Busca os dados dos modelos de equipamentos.</li>
                    </ul>
                    <p>
                        Exemplo de uso da <strong>fetchData</strong>:
                    </p>
                    <pre>
                    {`
import { fetchData } from './dataUtils';

    const loadData = async () => {
    try {
        const data = await fetchData();

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
};
                    `}
                    </pre>
                </div>

                <div className="about-header--item">
                <h2>Arquivo mapUtils.js</h2>
                    <p>
                        O arquivo <strong>mapUtils.js</strong> contém várias funções utilitárias relacionadas ao mapa e aos dados dos equipamentos. Essas funções são usadas para gerar ícones personalizados para o mapa, calcular produtividade e ganhos dos equipamentos, formatar valores monetários e gerar conteúdo para o histórico de estados dos equipamentos.
                    </p>

                    <h3>Funções principais:</h3>

                    <ul>
                        <li><strong>getIcon(model, state)</strong>: 
                            <p>Retorna um ícone personalizado para os marcadores do mapa, com base no modelo e estado do equipamento. A cor do ícone representa o estado do equipamento (Operando, Manutenção, Parado) e o conteúdo do ícone é a primeira letra do nome do modelo do equipamento.</p>
                        </li>
                        <li><strong>formatCurrencyBRL(amount)</strong>: 
                            <p>Converte um valor numérico para o formato de moeda brasileiro (BRL). Utiliza a API Intl.NumberFormat para garantir a formatação correta.</p>
                        </li>
                        <li><strong>calculateProductivity(stateHistory, stateData)</strong>: 
                            <p>Calcula a produtividade do equipamento com base no histórico de estados e nos dados de estado disponíveis. A produtividade é calculada como a proporção do tempo em que o equipamento esteve no estado 'Operando' em relação ao tempo total.</p>
                        </li>
                        <li><strong>calculateGain(equipment, hoursWorked)</strong>: 
                            <p>Calcula o ganho estimado do equipamento com base no número de horas trabalhadas e na taxa de ganhos por hora associada ao estado do equipamento. Retorna 'N/A' se as informações necessárias não estiverem disponíveis.</p>
                        </li>
                        <li><strong>getStateColor(stateName)</strong>: 
                            <p>Retorna a cor associada a um nome de estado específico (Operando, Manutenção, Parado). A cor é usada para destacar o estado do equipamento no mapa e no histórico.</p>
                        </li>
                        <li><strong>generateHistoryContent(history, stateData)</strong>: 
                            <p>Gera o conteúdo HTML para exibir o histórico de estados do equipamento. Utiliza as funções <strong>getStateName</strong> e <strong>getStateColor</strong> para formatar e estilizar cada entrada do histórico.</p>
                        </li>
                        <li><strong>getStateName(id, stateData)</strong>: 
                            <p>Obtém o nome do estado com base no seu ID, utilizando os dados de estado fornecidos. Retorna 'Desconhecido' se o ID não for encontrado.</p>
                        </li>
                    </ul>

                    <p>
                        <strong>Exemplo de uso das funções:</strong>
                    </p>

                    <pre>
                    {`

const icon = getIcon(equipment.model, equipment.state);

const formattedEarnings = formatCurrencyBRL(equipment.earnings);

const productivity = calculateProductivity(stateHistory, stateData);

const gain = calculateGain(equipment, hoursWorked);

const historyContent = generateHistoryContent(stateHistory, stateData);
                    `}
                    </pre>
                </div>

                <div className="about-header--item">
                    <h2>Arquivo FilterComponent.test.jsx</h2>
                        <p>
                            O arquivo <strong>FilterComponent.test.jsx</strong> contém testes para o componente <strong>FilterComponent</strong>. Esses testes são realizados usando a biblioteca <code>@testing-library/react</code> e o framework <code>Jest</code>. O objetivo dos testes é garantir que o componente se comporte conforme esperado nas seguintes situações:
                        </p>
                        <ul>
                            <li><strong>Renderização:</strong> Verifica se o componente é renderizado corretamente com as props fornecidas e se os elementos esperados estão presentes na tela.</li>
                            <li><strong>Alteração do Filtro de Estado:</strong> Verifica se a função <code>handleStateFilterChange</code> é chamada corretamente quando o filtro de estado é alterado.</li>
                            <li><strong>Alteração do Filtro de Modelo:</strong> Verifica se a função <code>handleModelFilterChange</code> é chamada corretamente quando o filtro de modelo é alterado.</li>
                            <li><strong>Alteração do Termo de Pesquisa:</strong> Verifica se a função <code>handleSearchTermChange</code> é chamada corretamente quando o termo de pesquisa é alterado.</li>
                        </ul>
                        <p>
                            Exemplo de um teste:
                        </p>
                        <pre>
                        {`

describe('FilterComponent', () => {
const mockHandleStateFilterChange = jest.fn();
const mockHandleModelFilterChange = jest.fn();
const mockHandleSearchTermChange = jest.fn();

const stateData = [
    { id: 1, name: 'Operando' },
    { id: 2, name: 'Parado' },
];
const modelData = [
    { id: 1, name: 'Modelo A' },
    { id: 2, name: 'Modelo B' },
];

it('should render correctly with given props', () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
    <FilterComponent
        equipmentStateFilter=""
        equipmentModelFilter=""
        searchTerm=""
        stateData={stateData}
        modelData={modelData}
        handleStateFilterChange={mockHandleStateFilterChange}
        handleModelFilterChange={mockHandleModelFilterChange}
        handleSearchTermChange={mockHandleSearchTermChange}
    />
    );

    expect(getByLabelText(/Estado/)).toBeInTheDocument();
    expect(getByLabelText(/Modelo:/)).toBeInTheDocument();
    expect(getByLabelText(/Pesquise pelo nome do modelo:/)).toBeInTheDocument();
    expect(getByPlaceholderText(/Digite o nome do modelo/)).toBeInTheDocument();
    expect(getByText('Operando')).toBeInTheDocument();
    expect(getByText('Modelo A')).toBeInTheDocument();
});

it('should call handleStateFilterChange on state select change', () => {
    const { getByLabelText } = render(
    <FilterComponent
        equipmentStateFilter=""
        equipmentModelFilter=""
        searchTerm=""
        stateData={stateData}
        modelData={modelData}
        handleStateFilterChange={mockHandleStateFilterChange}
        handleModelFilterChange={mockHandleModelFilterChange}
        handleSearchTermChange={mockHandleSearchTermChange}
    />
    );

    fireEvent.change(getByLabelText(/Estado/), { target: { value: '1' } });
    expect(mockHandleStateFilterChange).toHaveBeenCalled();
});

it('should call handleModelFilterChange on model select change', () => {
    const { getByLabelText } = render(
    <FilterComponent
        equipmentStateFilter=""
        equipmentModelFilter=""
        searchTerm=""
        stateData={stateData}
        modelData={modelData}
        handleStateFilterChange={mockHandleStateFilterChange}
        handleModelFilterChange={mockHandleModelFilterChange}
        handleSearchTermChange={mockHandleSearchTermChange}
    />
    );

    fireEvent.change(getByLabelText(/Modelo:/), { target: { value: '1' } });
    expect(mockHandleModelFilterChange).toHaveBeenCalled();
});

it('should call handleSearchTermChange on input change', () => {
    const { getByPlaceholderText } = render(
        <FilterComponent
            equipmentStateFilter=""
            equipmentModelFilter=""
            searchTerm=""
            stateData={stateData}
            modelData={modelData}
            handleStateFilterChange={mockHandleStateFilterChange}
            handleModelFilterChange={mockHandleModelFilterChange}
            handleSearchTermChange={mockHandleSearchTermChange}
        />
        );

        fireEvent.change(getByPlaceholderText(/Digite o nome do modelo/), 
        { target: { value: 'Modelo A' } });
        expect(mockHandleSearchTermChange).toHaveBeenCalled();
    });
});
                        `}
                        </pre>
                </div>

                <div className="about-header--item">
                    <h2>Arquivo mapUtils.test.jsx</h2>
                        <p>
                            O arquivo <strong>mapUtils.test.jsx</strong> contém testes para funções utilitárias relacionadas ao mapa e à produtividade dos equipamentos. Os testes são realizados usando o framework <code>Jest</code>. Aqui estão os detalhes dos testes incluídos:
                        </p>
                        <ul>
                            <li>
                                <strong>Função getIcon:</strong> Verifica se a função <code>getIcon</code> retorna o ícone correto para um estado específico. No teste, a função é chamada com um modelo de equipamento e o estado 'Operando'. O teste checa se o ícone retornado possui a cor de fundo esperada e o texto correto.
                            </li>
                            <li>
                                <strong>Função calculateProductivity:</strong> Testa a função <code>calculateProductivity</code> para garantir que ela calcule a produtividade corretamente. A função é testada com um histórico de estados e dados de estado, e o resultado esperado é '100.00'.
                            </li>
                            <li>
                                <strong>Função calculateGain:</strong> Avalia a função <code>calculateGain</code> para garantir que o ganho seja calculado corretamente com base no equipamento e nas horas trabalhadas. O teste verifica se o ganho calculado corresponde ao valor esperado de '500.00'.
                            </li>
                            <li>
                                <strong>Função getStateName:</strong> Verifica se a função <code>getStateName</code> retorna o nome correto do estado com base no ID do estado e nos dados de estado fornecidos.
                            </li>
                        </ul>
                        <p>
                            Exemplos de código dos testes:
                        </p>
                    <pre>
                    {`

    test('getIcon should return correct icon for operating state', () => {
    const model = { name: 'Excavator' };
    const state = 'Operando';
    const icon = getIcon(model, state);
    expect(icon.options.html).toContain('background-color:#00FF00');
    expect(icon.options.html).toContain('E'); 
    });

    test('calculateProductivity should calculate productivity correctly', () => {
    const stateHistory = [
        { date: '2023-09-01T00:00:00Z', equipmentStateId: 1 },
        { date: '2023-09-02T00:00:00Z', equipmentStateId: 2 },
    ];
    const stateData = [
        { id: 1, name: 'Operando' },
        { id: 2, name: 'Parado' },
    ];
    const result = calculateProductivity(stateHistory, stateData);
    expect(result).toBe('100.00');
    });

    test('calculateGain should calculate gain correctly', () => {
    const equipment = {
        model: {
        hourlyEarnings: [
            { equipmentStateId: 1, value: 50 }
        ]
        },
        state: { id: 1 }
    };
    const hoursWorked = 10;
    const result = calculateGain(equipment, hoursWorked);
    expect(result).toBe('500.00');
    });

    test('getStateName should return correct state name', () => {
    const stateData = [
        { id: 1, name: 'Operando' },
        { id: 2, name: 'Parado' },
    ];
    const name = getStateName(1, stateData);
    expect(name).toBe('Operando');
    });
                    `}
                    </pre>
                    <p>
                        Em resumo, o <strong>Gestor de Tráfego</strong> é uma solução robusta para a gestão de dados de equipamentos em operações florestais, projetada para oferecer uma visão clara e detalhada das operações em campo. Através de uma interface intuitiva e funcionalidades avançadas, a aplicação auxilia na tomada de decisões e no monitoramento da produtividade e eficiência dos equipamentos.
                    </p>

                </div>

            </div>
        </div>
    );
};

export default About;
