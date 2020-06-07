import User from '../models/user';

const USERS = [
    new User (
        'u1',
        'Isabella',
        '#f5428d',
        []
    ),
    new User (
        'u2',
        'William',
        '#f54242',
        []
    ),
    new User (
        'u3',
        'Alma',
        '#f5a442',
        []
    ),
    new User (
        'u4',
        'Sebastian',
        '#f5d142',
        ['u1', 'u2', 'u3', 'u5', 'u6', 'u8', 'u9', 'u10']
    ),
    new User (
        'u5',
        'Freja',
        '#41d95d',
        []
    ),
    new User (
        'u6',
        'Alfred',
        '#368dff',
        []
    ),
    new User (
        'u7',
        'Agnes',
        '#ffc7ff',
        []
    ),
    new User (
        'u8',
        'Noah',
        '#47fced',
        []
    ),
    new User (
        'u9',
        'Anna',
        '#9234eb',
        []
    ),
    new User (
        'u10',
        'Malthe',
        '#b9ffb0',
        []
    ),
    new User (
        'u11',
        'Peter',
        '#99cc00',
        []
    ),
    new User (
        'u12',
        'Inge',
        '#ff6666',
        []
    ),
    new User (
        'u13',
        'Sten',
        '#33cccc',
        []
    ),
    new User (
        'u14',
        'Mathias',
        '#ffcc99',
        []
    ),
    new User (
        'u15',
        'Christina',
        '#66ff33',
        []
    )
];

export default USERS;
