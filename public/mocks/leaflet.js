module.exports = {
    map: () => ({
        setView: jest.fn(),
        remove: jest.fn(),
    }),
    tileLayer: () => ({
        addTo: jest.fn(),
    }),
    marker: () => ({
        addTo: jest.fn(),
        bindPopup: jest.fn(),
    }),
    Icon: {
        Default: jest.fn(),
    },
    DomEvent: {
        disableClickPropagation: jest.fn(),
    },
};  