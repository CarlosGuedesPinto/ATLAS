let moment = require("moment")

export default {
    users: [
        {
            id: 1,
            profileId: 3,
            name: "ESMAD",
            username: "ESMAD",
            password: "12345",
            email: "esmad@atlas.pt",
            picture: "https://pbs.twimg.com/profile_images/792011747397865473/2r6wseRk_400x400.jpg",
            gender: 1,
            accountCreation: {
                date: "2018-01-01",
                hour: "00:00"
            },
            interests: {
                tags: [],
                courses: []
            }
        },
        {
            id: 3,
            profileId: 1,
            name: "Atlas",
            username: "atlas",
            password: "12345",
            email: "atlas@atlas.pt",
            picture: "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif",
            gender: 1,
            accountCreation: {
                date: "2019-01-01", hour: "00:00"
            },
            interests: {
                tags: [],
                courses: []
            }
        },
        {
            id: 4,
            profileId: 2,
            name: "Ricardo Queirós",
            username: "rqueiros",
            password: "12345",
            email: "rqueiros@atlas.pt",
            picture: "https://avatars0.githubusercontent.com/u/741554?s=460&v=4",
            gender: 1,
            accountCreation: {
                date: "2018-01-01",
                hour: "00:00"
            },
            interests: {
                tags: [1, 2, 9, 10],
                courses: [6, 7]
            }
        },
        {
            id: 5,
            profileId: 1,
            name: "Gustavo Vasconcelos",
            username: "gustavo",
            password: "12345",
            email: "gustavo@atlas.pt",
            picture: "https://i.imgur.com/w0JQ22i.jpg",
            gender: 1,
            accountCreation: {
                date: "2019-01-01",
                hour: "00:00"
            },
            interests: {
                tags: [1, 2, 9, 10],
                courses: [6]
            }
        },
        {
            id: 6,
            profileId: 2,
            name: "Núcleo de Estudantes TSIW",
            username: "netsiw",
            password: "12345",
            email: "netsiw@atlas.pt",
            picture: "https://scontent.fopo2-1.fna.fbcdn.net/v/t1.0-9/43489563_897257380469704_4495612654647246848_n.jpg?_nc_cat=102&_nc_ht=scontent.fopo2-1.fna&oh=de0005289379a99386176e501f8d084d&oe=5CC0ECA1",
            gender: 1,
            accountCreation: {
                date: "2018-07-01",
                hour: "00:00"
            },
            interests: {
                tags: [1, 2, 9, 10],
                courses: [6]
            }
        }
    ],
    courses: [
        { id: 1, name: "Design - Ramo Design Gráfico e Publicidade", abbreviation: "DGRAF" },
        { id: 2, name: "Design - Ramo Design Industrial", abbreviation: "DIND" },
        { id: 3, name: "Fotografia", abbreviation: "FOTO" },
        { id: 4, name: "Multimédia", abbreviation: "MULTI" },
        { id: 5, name: "Tecnologia da Comunicação Audiovisual", abbreviation: "TCA" },
        { id: 6, name: "Tecnologias e Sistemas de Informação para a Web", abbreviation: "TSIW" },
        { id: 7, name: "Design de Jogos e Animação Digital", abbreviation: "DJAD" },
    ],
    tags: [
        { id: 1, name: "web" },
        { id: 2, name: "programação" },
        { id: 3, name: "fotografia" },
        { id: 4, name: "design" },
        { id: 5, name: "multimédia" },
        { id: 6, name: "vídeo" },
        { id: 7, name: "filme" },
        { id: 8, name: "tipografia" },
        { id: 9, name: "javascript" },
        { id: 10, name: "jogos" },
        { id: 11, name: "animação" },
        { id: 12, name: "empresas" },
        { id: 13, name: "emprego" },
        { id: 14, name: "segurança" },
        { id: 15, name: "criptografia" },
        { id: 16, name: "marketing" },
        { id: 17, name: "administração" },
        { id: 18, name: "esmad" },
    ],
    events: [
        {
            id: 1,
            authorId: 4,
            name: "Vue CLI 3",
            category: "Seminário",
            tags: [1, 2, 9],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B203",
            coursesIds: [6],
            hourStart: "09:30",
            hourEnd: "11:00",
            dateStart: "2018-11-20",
            durationDays: 1,
            dateEnd: "2018-11-20",
            picture: {
                thumbnail: "https://i.imgur.com/9kTBtgg.jpg",
                poster: {
                    url: "https://i.imgur.com/MXuI7WL.jpg",
                    orientation: "Vertical"
                },
                gallery: [
                    "http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_10.jpg",
                    "http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_07.jpg",
                    "http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_08.jpg"
                ]
            },
            paid: false,
            paymentPrice: 0,
            discussions: [
                {
                    id: 1,
                    authorId: 3,
                    category: "Dúvida",
                    title: "Poderemos levar os nossos computadores para o evento?",
                    content: "Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom.",
                    upvotes: 0,
                    downvotes: 0,
                    usersVoted: [],
                    answers: [],
                    moment: moment("2018-11-18 11:33")
                }
            ],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2018-11-19 10:10") },
                { userId: 4, paid: false, moment: moment("2018-11-19 11:10") },
                { userId: 5, paid: false, moment: moment("2018-11-19 12:10") },
                { userId: 6, paid: false, moment: moment("2018-11-19 13:10") }
            ]
        },
        {
            id: 2,
            authorId: 6,
            name: "Upfront",
            category: "Seminário",
            tags: [1, 2, 9],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B201",
            coursesIds: [6],
            hourStart: "11:00",
            hourEnd: "13:00",
            dateStart: "2018-12-14",
            durationDays: 1,
            dateEnd: "2018-12-14",
            picture: {
                thumbnail: "https://i.imgur.com/kVBPTEF.jpg",
                poster: {
                    url: "https://i.imgur.com/tQFosRc.jpg",
                    orientation: "Vertical"
                },
                gallery: [
                    "http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_10.jpg",
                    "http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_07.jpg",
                    "http://eventos.esmad.ipp.pt/plug-in/img/galeria/gal_08.jpg"
                ]
            },
            paid: false,
            paymentPrice: 0,
            discussions: [
                {
                    id: 1,
                    authorId: 3,
                    category: "Dúvida",
                    title: "Poderemos levar os nossos computadores para o evento?",
                    content: "Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom.",
                    upvotes: 0,
                    downvotes: 0,
                    usersVoted: [],
                    answers: [],
                    moment: moment("2018-11-13 12:00")
                }
            ],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2018-12-10 13:10") },
                { userId: 4, paid: false, moment: moment("2018-12-10 14:10") },
                { userId: 5, paid: false, moment: moment("2018-12-10 15:10") },
                { userId: 6, paid: false, moment: moment("2018-12-10 16:10") }
            ]
        },
        {
            id: 3,
            authorId: 1,
            name: "MAD Summer School",
            category: "Workshop",
            tags: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "Auditório",
            coursesIds: [1, 3, 4, 5, 6],
            hourStart: "09:00",
            hourEnd: "17:00",
            dateStart: "2019-07-10",
            durationDays: 11,
            dateEnd: "2019-07-20",
            picture: {
                thumbnail: "https://i.imgur.com/fHhVNur.jpg",
                poster: {
                    url: "https://scontent.fopo2-1.fna.fbcdn.net/v/t1.0-9/48398312_2304510196435709_1863053592055775232_n.jpg?_nc_cat=109&_nc_ht=scontent.fopo2-1.fna&oh=d13d4ceb5caec2630c170de374eda8b9&oe=5CCC112F",
                    orientation: "Vertical"
                },
                gallery: [
                    "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/37594179_2196851980534865_3558010101245673472_o.jpg?_nc_cat=107&_nc_ht=scontent.fopo2-2.fna&oh=e675cb2dda524d26fc234d6183718d13&oe=5CC7FFCB",
                    "https://scontent.fopo2-1.fna.fbcdn.net/v/t1.0-9/37554849_2196855640534499_5477707933909254144_o.jpg?_nc_cat=101&_nc_ht=scontent.fopo2-1.fna&oh=235f21f6af4bdcfa07e52394f7052c60&oe=5CC467D8",
                    "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/37564177_2196855770534486_2583708074501996544_o.jpg?_nc_cat=110&_nc_ht=scontent.fopo2-2.fna&oh=c2d37b1b8d4848fa227116aa548fe332&oe=5CC43FD1",
                    "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/37551993_2196856000534463_3614932629964455936_o.jpg?_nc_cat=104&_nc_ht=scontent.fopo2-2.fna&oh=0ddc7e9f243886d7306215f7dbf2aa18&oe=5CC70BFA",
                    "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/37585456_2196857223867674_1095579245914095616_o.jpg?_nc_cat=107&_nc_ht=scontent.fopo2-2.fna&oh=babf4c844db0d48c74744094e81923c2&oe=5CF709EE",
                    "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/37672631_2196855810534482_3355089522328076288_o.jpg?_nc_cat=107&_nc_ht=scontent.fopo2-2.fna&oh=eebd3bed962bfb8c48985cf713386f4c&oe=5CBB1A7E"
                ]
            },
            paid: true,
            paymentPrice: 150,
            discussions: [
                {
                    id: 1,
                    authorId: 3,
                    category: "Dúvida",
                    title: "Poderemos levar os nossos computadores para o evento?",
                    content: "Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom.",
                    upvotes: 0,
                    downvotes: 0,
                    usersVoted: [],
                    answers: [],
                    moment: moment("2018-11-13 12:00")
                }
            ],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2019-01-10 13:20") },
                { userId: 4, paid: false, moment: moment("2019-01-11 22:10") }
            ]
        },
        {
            id: 4,
            authorId: 1,
            name: "Plug-in 2ª edição",
            category: "Evento",
            tags: [1, 2, 5, 6, 9, 10, 12, 13],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B201",
            coursesIds: [4, 6, 7],
            hourStart: "15:00",
            hourEnd: "17:30",
            dateStart: "2019-01-16",
            durationDays: 1,
            dateEnd: "2019-01-16",
            picture: {
                thumbnail: "https://i.imgur.com/QrOapdW.jpg",
                poster: {
                    url: "https://i.imgur.com/BHNjDpS.png",
                    orientation: "Vertical"
                },
                gallery: [
                    "https://scontent.fopo2-1.fna.fbcdn.net/v/t1.0-9/50244730_2220767381529220_3203617720994103296_o.jpg?_nc_cat=109&_nc_ht=scontent.fopo2-1.fna&oh=5a80a02bc63c8a64fcb4f5118071acf8&oe=5CB9C682",
                    "https://scontent.fopo2-1.fna.fbcdn.net/v/t1.0-9/50049692_2220767251529233_9118216488531001344_o.jpg?_nc_cat=105&_nc_ht=scontent.fopo2-1.fna&oh=001c6e224284cfc5d2843d459b5966e0&oe=5CCD979B",
                    "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/49947180_2220767121529246_6480262088022294528_o.jpg?_nc_cat=110&_nc_ht=scontent.fopo2-2.fna&oh=ed8c441996dde5d105f4f686402b84b8&oe=5CBC5045",
                    "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/50095590_2220766448195980_5291964234878418944_o.jpg?_nc_cat=106&_nc_ht=scontent.fopo2-2.fna&oh=f088495e047a74cb1ec16049366a04e5&oe=5CB4EF66",
                    "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/50059431_2220766241529334_3964258473520136192_o.jpg?_nc_cat=106&_nc_ht=scontent.fopo2-2.fna&oh=11442ee38fa122f1988e67ce462efc9b&oe=5CB2CC6C"
                ]
            },
            paid: false,
            paymentPrice: 0,
            discussions: [
                {
                    id: 1,
                    authorId: 3,
                    category: "Dúvida",
                    title: "Poderemos levar os nossos computadores para o evento?",
                    content: "Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom. Seria bom.",
                    upvotes: 0,
                    downvotes: 0,
                    usersVoted: [],
                    answers: [],
                    moment: moment("2018-11-13 12:00")
                }
            ],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2019-01-15 13:10") },
                { userId: 5, paid: false, moment: moment("2019-01-15 14:10") }
            ]
        },
        {
            id: 5,
            authorId: 1,
            name: "Segurança em Ambientes Web",
            category: "Seminário",
            tags: [1, 2, 14, 15],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B201",
            coursesIds: [6],
            hourStart: "09:30",
            hourEnd: "11:00",
            dateStart: "2018-11-30",
            durationDays: 1,
            dateEnd: "2018-11-30",
            picture: {
                thumbnail: "https://i.imgur.com/9JhwodB.jpg",
                poster: {
                    url: "https://www.esmad.ipp.pt/noticias/seminario-seguranca-em-ambientes-web-1/image_preview",
                    orientation: "Horizontal"
                },
                gallery: []
            },
            paid: false,
            paymentPrice: 0,
            discussions: [],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2018-11-29 13:10") },
                { userId: 4, paid: false, moment: moment("2018-11-29 14:10") },
                { userId: 5, paid: false, moment: moment("2018-11-29 15:10") }
            ]
        },
        {
            id: 6,
            authorId: 1,
            name: "Desenvolvimento Seguro de Aplicações",
            category: "Seminário",
            tags: [1, 2, 14, 15],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B201",
            coursesIds: [6],
            hourStart: "09:30",
            hourEnd: "11:30",
            dateStart: "2018-11-16",
            durationDays: 1,
            dateEnd: "2018-11-16",
            picture: {
                thumbnail: "https://i.imgur.com/U3WyMVC.jpg",
                poster: {
                    url: "https://i.imgur.com/U3WyMVC.jpg",
                    orientation: "Horizontal"
                },
                gallery: []
            },
            paid: false,
            paymentPrice: 0,
            discussions: [],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2018-11-15 15:10") },
                { userId: 4, paid: false, moment: moment("2018-11-15 16:10") }
            ]
        },
        {
            id: 7,
            authorId: 1,
            name: "Criação de um Plano de Marketing Digital",
            category: "Seminário",
            tags: [16, 17],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "B201",
            coursesIds: [6],
            hourStart: "11:00",
            hourEnd: "13:00",
            dateStart: "2018-10-30",
            durationDays: 1,
            dateEnd: "2018-10-30",
            picture: {
                thumbnail: "https://i.imgur.com/Amc1z6X.jpg",
                poster: {
                    url: "https://i.imgur.com/Amc1z6X.jpg",
                    orientation: "Horizontal"
                },
                gallery: []
            },
            paid: false,
            paymentPrice: 0,
            discussions: [],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2018-10-29 13:10") },
                { userId: 4, paid: false, moment: moment("2018-10-29 14:10") },
                { userId: 5, paid: false, moment: moment("2018-10-29 15:10") },
                { userId: 6, paid: false, moment: moment("2018-10-29 16:10") }
            ]
        },
        {
            id: 8,
            authorId: 1,
            name: "Sessão de Abertura 2017/2018",
            category: "Meeting",
            tags: [18],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "Auditório",
            coursesIds: [1, 2, 3, 4, 5, 6, 7],
            hourStart: "10:00",
            hourEnd: "17:30",
            dateStart: "2018-09-23",
            durationDays: 2,
            dateEnd: "2018-09-24",
            picture: {
                thumbnail: "https://i.imgur.com/CouF1Kf.jpg",
                poster: {
                    url: "https://i.imgur.com/peCcoab.jpg",
                    orientation: "Vertical"
                },
                gallery: ["https://i.imgur.com/O7a483t.png"]
            },
            paid: false,
            paymentPrice: 0,
            discussions: [],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2018-09-20 13:10") },
                { userId: 4, paid: false, moment: moment("2018-09-20 14:10") },
                { userId: 5, paid: false, moment: moment("2018-09-20 15:10") },
                { userId: 6, paid: false, moment: moment("2018-09-20 16:10") }
            ]
        },
        {
            id: 9,
            authorId: 1,
            name: "Game Over Video Game Mapping",
            category: "Exposição",
            tags: [5, 6, 10, 11],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            classroom: "Associação de Estudantes",
            coursesIds: [4],
            hourStart: "10:00",
            hourEnd: "17:30",
            dateStart: "2018-01-24",
            durationDays: 1,
            dateEnd: "2018-01-24",
            picture: {
                thumbnail: "https://i.imgur.com/tS4md97.jpg",
                poster: {
                    url: "https://i.imgur.com/3b8a031.jpg",
                    orientation: "Vertical"
                },
                gallery: []
            },
            paid: false,
            paymentPrice: 0,
            discussions: [],
            enrollments: [
                { userId: 3, paid: false, moment: moment("2018-09-20 13:10") },
                { userId: 4, paid: false, moment: moment("2018-09-20 14:10") },
                { userId: 5, paid: false, moment: moment("2018-09-20 15:10") },
                { userId: 6, paid: false, moment: moment("2018-09-20 16:10") }
            ]
        }
    ]
}