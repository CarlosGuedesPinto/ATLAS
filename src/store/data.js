export default {
    users: [
        { id: 1, profileId: 3, name: "Administrador", username: "admin", password: "12345", email: "admin@atlas.pt", picture: "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif", gender: 1, idInstitution: 1 },
        { id: 2, profileId: 2, name: "Proponente de evento", username: "proponente", password: "12345", email: "proponente@atlas.pt", picture: "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif", gender: 1, idInstitution: 1 },
        { id: 3, profileId: 1, name: "Atlas", username: "atlas", password: "12345", email: "atlas@atlas.pt", picture: "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif", gender: 1, idInstitution: 1 }
    ],
    courses: [
        { id: 1, name: "Tecnologias e Sistemas de Informação para a Web", abbreviation: "TSIW" }
    ],
    tags: [
        { id: 1, name: "web" },
        { id: 2, name: "programação" },
        { id: 3, name: "fotografia" },
        { id: 4, name: "design" }
    ],
    events: [
        {
            id: 1, authorId: 1, name: "Primeiro evento", category: "Evento", tags: [1, 2],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2019-01-15", durationDays: 1, dateEnd: "2019-01-15", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 2, authorId: 2, name: "Segundo evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2019-01-12", durationDays: 1, dateEnd: "2019-01-13", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg", gallery: ["http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_10.jpg", "http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_07.jpg", "http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_08.jpg"] }, paid: false, paymentPrice: 0
        },
        {
            id: 3, authorId: 2, name: "Terceiro evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 4, authorId: 2, name: "Quarto evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 5, authorId: 2, name: "Quinto evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 6, authorId: 2, name: "Sexto evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 7, authorId: 2, name: "Sétimo evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 8, authorId: 2, name: "Oitavo evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 9, authorId: 2, name: "Nono evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 10, authorId: 2, name: "Décimo evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 11, authorId: 2, name: "Décimo primeiro evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 12, authorId: 2, name: "Décimo segundo evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 13, authorId: 2, name: "Décimo terceiro evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        },
        {
            id: 14, authorId: 2, name: "Décimo quarto evento", category: "Evento", tags: [3, 4],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "https://i.imgur.com/MXuI7WL.jpg" }, paid: false, paymentPrice: 0
        }
    ],
    enrollments: [
        { id: 1, eventId: 2, userId: 3, paidEvent: false, date: "2019-01-11", hour: "12:28" }
    ]
}