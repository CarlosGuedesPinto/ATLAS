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
        { id: 1, authorId: 1, name: "Primeiro evento", category: "Evento", tags: [1, 2], description: "Vai ser muito bom!", classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "" }, paid: false, paymentPrice: 0 },
        { id: 2, authorId: 2, name: "Segundo evento", category: "Evento", tags: [3, 4], description: "Vai ser muito bom!", classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "" }, paid: false, paymentPrice: 0 },
        { id: 3, authorId: 2, name: "Terceiro evento", category: "Evento", tags: [3, 4], description: "Vai ser muito bom!", classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "" }, paid: false, paymentPrice: 0 },
        { id: 4, authorId: 2, name: "Quarto evento", category: "Evento", tags: [3, 4], description: "Vai ser muito bom!", classroom: "B203", dateStart: "2018-01-10", durationDays: 1, dateEnd: "2018-01-10", picture: { thumbnail: "https://i.imgur.com/9kTBtgg.jpg", poster: "" }, paid: false, paymentPrice: 0 }
    ]
}