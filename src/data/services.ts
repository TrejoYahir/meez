export default [
    {
        name: 'Transporte',
        id: 1,
        icon: 'car',
        default: true,
        phrases: [
            {
                id: 1,
                default: true,
                name: 'Preguntar costo',
                content: '¿Cuánto cuesta el viaje?'
            },
            {
                id: 2,
                default: true,
                name: 'Preguntar dirección',
                content: '¿Hasta dónde llega?'
            }
        ]    
    },
    {
        name: 'Banco',
        id: 2,
        icon: 'card',
        default: true,
        phrases: [
            {
                id: 1,
                default: true,
                name: '¿Como abrir una cuenta?',
                content: 'Me gustaría saber como abrir una cuenta'
            },
            {
                id: 2,
                default: true,
                name: 'Realizar deposito',
                content: 'Me gustaría realizar un depósito a la cuenta 12341234'
            },
            {
                id: 3,
                default: true,
                name: 'Realizar retiro',
                content: 'Me gustaría retirar de la cuenta 12341234'
            }
        ]    
    }
]