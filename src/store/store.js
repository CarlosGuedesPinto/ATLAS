import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const axiosConfig = {
  baseURL: "https://atlas-server-gustavovasconcelos.c9users.io",
}

const HTTP = axios.create(axiosConfig)

Vue.use(Vuex)
const moment = require("moment")
require("moment/locale/pt")

Vue.use(require("vue-moment"), {
    moment
})

function initialState() {
    return {
        users: [],
        courses: [],
        tags: [],
        events: [],
        medals: []
    }
}

export default new Vuex.Store({
    state: {
        users: [],
        loggedUserId: -1,
        courses: [],
        tags: [],
        events: [],
        medals: [],
        apiUrl: "https://atlas-server-gustavovasconcelos.c9users.io"
    },
    getters: {
        getApiUrl: state => {
            return state.apiUrl
        },
        getUserById: state => id => {
            /*
            const user = state.users.find(user => user._id === id)
            if(!user) {
                try {
                    const response = await HTTP.get(`/users/${id}`)
                    if(response.status === 200) {
                        this.users.push(response.data)
                    }
                } catch(err) {
                    return null
                }
            }
            console.log(user)
            */
            return state.users.find(user => user._id === id)
        },
        getUserByUsername: state => username => {
            return state.users.find(user => user.username.toLowerCase() === username.toLowerCase())
        },
        getUserByEmail: state => email => {
            return state.users.find(user => user.email.toLowerCase() === email.toLowerCase())
        },
        getLoggedUserId: state => state.loggedUserId,
        getLastUserId: state => {
            let lastId = 0
            if (state.users.length) {
                state.users.forEach(user => {
                    if (user._id >= lastId) {
                        lastId = user._id
                    }
                })
            }
            return lastId
        },
        getUsers: state => {
            return state.users
        },
        getUserEnrollmentsByUserId: state => userId => {
            let events = state.events.filter(event =>
                event.enrollments.some(enrollment => enrollment.userId === userId)
            )
            events.sort(sortByDateStartDecrescent)
            return events
        },
        getCourses: state => {
            return state.courses
        },
        getLastCourseId: state => {
            let lastId = 0
            if (state.courses.length) {
                state.courses.forEach(course => {
                    if (course._id >= lastId) {
                        lastId = course._id
                    }
                })
            }
            return lastId
        },
        getCourseById: state => id => {
            return state.courses.find(course => course._id === id)
        },
        getCourseByName: state => name => {
            return state.courses.find(course => course.name.toLowerCase() === name.toLowerCase())
        },
        getCourseByAbbreviation: state => abbreviation => {
            return state.courses.find(course => course.abbreviation.toLowerCase() === abbreviation.toLowerCase())
        },
        getTags: state => {
            return state.tags
        },
        getLastTagId: state => {
            let lastId = 0
            if (state.tags.length) {
                state.tags.forEach(tag => {
                    if (tag._id >= lastId) {
                        lastId = tag._id
                    }
                })
            }
            return lastId
        },
        getTagById: state => id => {
            return state.tags.find(tag => tag._id === id)
        },
        getTagByName: state => name => {
            return state.tags.find(tag => tag.name.toLowerCase() === name.toLowerCase())
        },
        getTagNameById: state => id => {
            return state.tags.find(tag => tag._id === id).name
        },
        getEvents: state => {
            return state.events
        },
        getEventsByAuthorId: state => authorId => {
            let events = []
            state.events.forEach(event => {
                if (event.authorId === authorId) events.push(event)
            })

            if (events.length) {
                events.sort(sortByDateStartCrescent)
            }

            return events
        },
        getLastEventId: state => {
            let lastId = 0
            if (state.events.length) {
                state.events.forEach(event => {
                    if (event._id >= lastId) {
                        lastId = event._id
                    }
                })
            }
            return lastId
        },
        getEventShortDescription: state => eventId => {
            let description = state.events.find(event => event._id === eventId).description
            return description.length <= 100 ? description : description.substr(0, description.indexOf(" ", 250)) + "..."
        },
        getEndedEvents: state => {
            let events = state.events.filter(event => moment().diff(event.dateEnd, "days") > 0)
            events.sort(sortByDateStartDecrescent)
            return events
        },
        getNextEvents: state => {
            let events = state.events.filter(event => moment().diff(event.dateEnd, "days") <= 0)
            events.sort(sortByDateStartCrescent)
            return events
        },
        getTodayEvents: state => {
            let events = state.events.filter(event => moment(moment().format("YYYY-MM-DD")).isBetween(event.dateStart, event.dateEnd, null, '[]'))
            events.sort(sortByDateStartCrescent)
            return events
        },
        getEventById: state => id => {
            return state.events.find(event => event._id === id)
        },
        getEventsByIdsTagsIdsCourses: state => (idsTags, idsCourses) => {
            return state.events.filter(event => {
                let result = true
                result = (event.tags.some(eventTag => idsTags.some(tag => tag === eventTag)) || event.coursesIds.some(eventCourse => idsCourses.some(course => course === eventCourse))) && result
                return result
            })
        },
        getNextEventsByIdsTagsIdsCourses: state => (idsTags, idsCourses) => {
            let events = state.events.filter(event => {
                let result = true
                result = (event.tags.some(eventTag => idsTags.some(tag => tag === eventTag)) || event.coursesIds.some(eventCourse => idsCourses.some(course => course === eventCourse))) && result
                return result
            }).filter(event => moment(event.dateEnd).isAfter(moment()))

            events.sort(sortByDateStartCrescent)
            return events
        },
        getTopUsersEnrolledEvents: state => {
            let users = []

            state.users.forEach(user => {
                state.events.forEach(event => {
                    if (event.enrollments.length) {
                        event.enrollments.forEach(enrollment => {
                            if (user._id === enrollment.userId) {
                                if (!users.some(user => user._id === enrollment.userId)) {
                                    users.push({
                                        id: user._id,
                                        amount: 1
                                    })
                                } else {
                                    users.find(user => user._id === enrollment.userId).amount++
                                }
                            }
                        })
                    }
                })
            })

            users.sort((a, b) => {
                if (a.amount > b.amount) {
                    return -1
                } else if (a.amount < b.amount) {
                    return 1
                }
                return 0
            })

            return users
        },
        getEventsByTopEnrollments: state => {
            let events = state.events.filter(event => event.enrollments.length)

            events.sort((a, b) => {
                if (a.enrollments.length > b.enrollments.length) {
                    return -1
                } else if (a.enrollments.length < b.enrollments.length) {
                    return 1
                }
                return 0
            })

            return events
        },
        getEventClassrooms: state => {
            let classrooms = []
            state.events.forEach(event => {
                if (classrooms.indexOf(event.classroom) === -1) classrooms.push(event.classroom)
            })
            return classrooms
        },
        getEventDiscussionByEventIdDiscussionId: state => (eventId, discussionId) => {
            return state.events.find(event => event._id === eventId).discussions.find(discussion => discussion._id === discussionId)
        },
        getLastDiscussionIdByEventId: state => eventId => {
            let lastId = 0
            let eventIndex = state.events.findIndex(event => event._id === eventId)
            if (state.events[eventIndex].discussions.length) {
                state.events[eventIndex].discussions.forEach(discussion => {
                    if (discussion._id >= lastId) {
                        lastId = discussion._id
                    }
                })
            }
            return lastId
        },
        getLastAnswerIdByEventIdDiscussionId: state => (eventId, discussionId) => {
            let lastId = 0
            if (state.events.length) {
                state.events.forEach(event => {
                    if (event._id === eventId && event.discussions.length) {
                        event.discussions.forEach(discussion => {
                            if (discussion._id === discussionId) {
                                if (discussion.answers) {
                                    discussion.answers.forEach(answer => {
                                        if (answer._id >= lastId) {
                                            lastId = answer._id
                                        }
                                    })
                                }
                            }
                        })
                    }

                })
            }
            return lastId
        },
        getNotificationsByUserId: state => userId => {
            return state.users.find(user => user._id === userId).notifications
        },
        getEventInfoById: state => eventId => {
            return state.events.find(event => event._id === eventId)
        },
        getMedals: state => {
            return state.medals
        },
        getMedalInfoById: state => medalId => {
            return state.medals.find(medal => medal._id === medalId)
        },
        /* Alternativa ao getUserInfo
        getMedalsByUserId: state => userId => {
            return state.users.find(user => user._id === userId).leveling.medals
        }*/
    },
    mutations: {
        RESET_STATE(state) {
            const initial = initialState()
            Object.keys(initial).forEach(key => {
                state[key] = initial[key] 
            })
        },
        LOAD_USERS(state, users) {
            state.users = users
        },
        ADD_USER(state, payload) {
            state.users.push(payload)
        },
        USER_LOGGED_IN(state, payload) {
            state.loggedUserId = payload
        },
        USER_LOGGED_OUT(state) {
            state.loggedUserId = -1
        },
        SIGNED_UP(state, payload) {
            state.users.push(payload)
        },
        CREATED_ACCOUNT(state, payload) {
            state.users.push(payload)
        },
        EDIT_USER_BY_ID(state, payload) {
            state.users.forEach(user => {
                if (user._id === payload._id) {
                    user.name = payload.name
                    user.profileId = payload.profileId
                    user.username = payload.username
                    user.password = payload.password
                    user.email = payload.email
                    user.name = payload.name
                    user.picture = payload.picture
                }
            })
        },
        EDIT_USER_INTERESTS_BY_ID(state, payload) {
            state.users.forEach(user => {
                if (user._id === payload._id) {
                    user.interests = payload.interests
                }
            })
        },
        REMOVE_USER_BY_ID(state, payload) {
            let index = state.users.findIndex(user => user._id === payload)
            state.users.splice(index, 1)
        },
        SET_COURSES(state, payload) {
            state.courses = payload
        },
        ADD_COURSE(state, payload) {
            state.courses.push(payload)
        },
        EDIT_COURSE(state, payload) {
            state.courses.forEach(course => {
                if (course._id === payload._id) {
                    course.name = payload.name
                    course.abbreviation = payload.abbreviation
                }
            })
        },
        REMOVE_COURSE_BY_ID(state, payload) {
            state.courses.forEach((course, index) => {
                if (course._id === payload) state.courses.splice(index, 1)
            })
        },
        LOAD_TAGS(state, tags) {
            tags.forEach(tag => state.tags.push(tag))
        },
        ADD_TAG(state, payload) {
            state.tags.push(payload)
        },
        EDIT_TAG(state, payload) {
            state.tags.forEach(tag => {
                if (tag._id === payload._id) tag.name = payload.name
            })
        },
        REMOVE_TAG_BY_ID(state, payload) {
            state.tags.forEach((tag, index) => {
                if (tag._id === payload) state.tags.splice(index, 1)
            })
        },
        SET_EVENTS(state, payload) {
            state.events = payload
        },
        ADD_EVENT(state, payload) {
            state.events.push(payload)
        },
        ADD_EVENTS(state, events) {
            events.forEach(event => state.events.push(event))
        },
        EDIT_EVENT_BY_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload._id) {
                    event.name = payload.event.name
                    event.category = payload.event.category
                    event.tags = payload.event.tags
                    event.description = payload.event.description
                    event.classroom = payload.event.classroom
                    event.coursesIds = payload.event.coursesIds
                    event.hourStart = payload.event.hourStart
                    event.hourEnd = payload.event.hourEnd
                    event.dateStart = payload.event.dateStart
                    event.durationDays = payload.event.durationDays
                    event.dateEnd = payload.event.dateEnd
                    event.paymentPrice = payload.event.paymentPrice
                    event.picture = payload.event.picture
                }
            })
        },
        ADD_EVENT_ENROLLMENT_BY_EVENT_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload.eventId) {
                    event.enrollments.push(payload.enrollment)
                }
            })
        },
        REMOVE_EVENT_ENROLLMENT_BY_EVENT_ID_USER_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload.eventId) {
                    event.enrollments.forEach((enrollment, index) => {
                        if (enrollment.userId === payload.userId) {
                            event.enrollments.splice(index, 1)
                        }
                    })
                }
            })
        },
        UPVOTE_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion._id === payload.discussionId) {
                            discussion.upvotes++
                            discussion.usersVoted.push(state.loggedUserId)
                        }
                    })
                }
            })
        },
        DOWNVOTE_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion._id === payload.discussionId) {
                            discussion.downvotes++
                            discussion.usersVoted.push(state.loggedUserId)
                        }
                    })
                }
            })
        },
        CREATE_EVENT_DISCUSSION(state, payload) {
            let index = state.events.findIndex(event => event._id === payload.eventId)
            state.events[index].discussions.push(payload.discussion)
        },
        EDIT_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion._id === payload.discussionId) {
                            discussion.title = payload.discussion.title
                            discussion.category = payload.discussion.category
                            discussion.content = payload.discussion.content
                        }
                    })
                }
            })
        },
        REMOVE_EVENT_BY_ID(state, payload) {
            let index = state.events.findIndex(event => event._id === payload)
            state.events.splice(index, 1)
        },
        REMOVE_EVENTS_BY_AUTHOR_ID(state, payload) {
            state.events = state.events.filter(event => event.authorId !== payload)
        },
        REMOVE_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload.eventId) {
                    event.discussions.forEach((discussion, index) => {
                        if (discussion._id === payload.discussionId) {
                            event.discussions.splice(index, 1)
                        }
                    })
                }
            })
        },
        ADD_DISCUSSION_ANSWER_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion._id === payload.discussionId) {
                            discussion.answers.push(payload.answer)
                        }
                    })
                }
            })
        },
        REMOVE_EVENT_DISCUSSION_ANSWER_BY_EVENT_ID_DISCUSSION_ID_ANSWER_ID(state, payload) {
            state.events.forEach(event => {
                if (event._id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion._id === payload.discussionId) {
                            discussion.answers.forEach((answer, index) => {
                                if (answer._id === payload.answerId) {
                                    discussion.answers.splice(index, 1)
                                }
                            })
                        }
                    })
                }
            })
        },
        INSERT_NEW_NOTIFICATIONS(state, payload) {

            let tags = payload.tags
            let eventId = payload.eventId
            let authorId = payload.authorId
            let courses = payload.courses
            let moment = payload.moment

            let event = payload.event

            console.log("Received Event: " + eventId)

            let newNotifications = []
            //Composed by userId(that receives the notification) and the event

            //Tags
            state.users.forEach(user => {
                user.interests.tags.forEach(tag => {
                    tags.forEach(eventTag => {
                        //Found matching tag
                        if (eventTag === tag) {
                            if (newNotifications.length != 0) {

                                let found = false
                                newNotifications.forEach(newNot => {
                                    //Searches if the event is already found in the newNotifications
                                    if ((newNot.userId === user._id && newNot.eventId === eventId)) {
                                        found = true
                                    }
                                })
                                if (found === false) {
                                    newNotifications.push({
                                        userId: user._id,
                                        eventId,
                                        moment,
                                    })
                                }
                            }
                            else {
                                newNotifications.push({
                                    userId: user._id,
                                    eventId: eventId,
                                    moment: moment
                                })
                            }

                        }
                    })
                });
                user.interests.courses.forEach(course => {
                    courses.forEach(eventCourse => {
                        //Found matching tag
                        if (eventCourse === course) {
                            if (newNotifications.length != 0) {
                                let found = false
                                newNotifications.forEach(newNot => {
                                    //Searches if the event is already found in the newNotifications
                                    if ((newNot.userId === user._id && newNot.eventId === eventId)) {
                                        found = true
                                    }
                                })

                                if (found === false) {
                                    newNotifications.push({
                                        userId: user._id,
                                        eventId: eventId,
                                        moment: moment
                                    })
                                }

                            }
                            else {
                                newNotifications.push({
                                    userId: user._id,
                                    eventId: eventId,
                                    moment: moment
                                })
                            }

                        }
                    })
                });
                user.interests.proponents.forEach(prop => {
                    authorId.forEach(eventAuthorId => {
                        //Found matching tag
                        if (eventAuthorId === prop) {
                            if (newNotifications.length != 0) {
                                //verify if found existing event
                                let found = false

                                newNotifications.forEach(newNot => {
                                    //Searches if the event is already found in the newNotifications
                                    if ((newNot.userId === user._id && newNot.eventId === eventId)) {
                                        found = true
                                    }
                                })

                                if (found === false) {
                                    newNotifications.push({
                                        userId: user._id,
                                        eventId: eventId,
                                        moment: moment
                                    })
                                }
                            }
                            else {
                                newNotifications.push({
                                    userId: user._id,
                                    eventId: eventId,
                                    moment: moment
                                })
                            }

                        }
                    })
                });
            });

            //Insert all the newNotifications in their respective user
            state.users.forEach(user => {
                newNotifications.forEach(newNot => {
                    if (newNot.userId === user._id) {

                        let matchingUser = {
                            tags: [],
                            courses: [],
                            prop: []
                        }

                        let eventTags = event.tags
                        let eventCourses = event.coursesIds
                        let eventAuthor = event.authorId

                        eventTags.forEach(tag => {
                            user.interests.tags.forEach(userTag => {
                                if (userTag === tag) {
                                    matchingUser.tags.push(tag)
                                }
                            })
                        })

                        eventCourses.forEach(course => {
                            user.interests.courses.forEach(userCourse => {
                                if (course === userCourse) {
                                    matchingUser.courses.push(course)
                                }
                            })
                        })

                        user.interests.proponents.forEach(prop => {
                            if (prop === eventAuthor) {
                                matchingUser.prop.push(eventAuthor)
                            }
                        })

                        user.notifications.push({
                            id: user.notifications.length,
                            eventId: newNot.eventId,
                            moment: newNot.moment,
                            matching: { tags: matchingUser.tags, proponent: matchingUser.prop, courses: matchingUser.courses }
                        })
                    }
                })
            });

        },
        INSERT_NEW_MEDAL_USER(state, payload) {

            state.users.forEach(user => {
                if (user._id === payload.userId) {
                    user.leveling.medals.push(payload.medalId)
                }
            })

        },
        SET_MEDALS(state, payload) {
            state.medals = payload
        },
        ASSIGN_MEDALS(state, payload) {
            console.log("medal")
            state.users.forEach(user => {
                if (user._id === payload.userId) {
                    state.medals.forEach(medal => {
                        if (payload.type === "EVENT" && medal.constrains.type === 'EVENT') {

                            let userEventsLen = user.history.events.length
                            //console.log((userEventsLen + 1) + " = " + medal.constrains.constrain)
                            if (userEventsLen + 1 === medal.constrains.constrain) {
                                user.medals.push(medal._id)
                            }

                        }
                    })
                }
            })

        },
        HISTORY_UPDATE(state, payload) {

            if (payload.type === "ADD") {
                state.users.forEach(user => {
                    if (user._id === payload.userId) {
                        user.history.events.push(payload.eventId)
                    }
                })
            }
            if (payload.type === "REMOVE") {
                state.users.forEach(user => {
                    if (user._id === payload.userId) {
                        user.history.events.forEach((event, index) => {
                            if (event === payload.eventId) {
                                user.history.events.splice(index, 1)
                            }
                        })
                    }
                })
            }

        }
    },
    actions: {
        async loadUsers(context) {
            const response = await HTTP.get("/users")
            context.commit("LOAD_USERS", response.data)
        },
        userLoggedIn(context, payload) {
            context.commit("USER_LOGGED_IN", payload)
        },
        userLoggedOut(context, payload) {
            context.commit("USER_LOGGED_OUT", payload)
        },
        async signUp(context, payload) {
            await HTTP.post("/auth/sign-up", {
                profileId: payload.profileId,
                username: payload.username,
                password: payload.password,
                email: payload.email,
                firstName: payload.name,
                lastName: "Teste",
                picture: "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif",
                gender: payload.gender
            })

            context.commit("SIGNED_UP", payload)
        },
        createAccount(context, payload) {
            context.commit("CREATED_ACCOUNT", payload)
        },
        editUserById(context, payload) {
            context.commit("EDIT_USER_BY_ID", payload)
        },
        editUserInterestsById(context, payload) {
            context.commit("EDIT_USER_INTERESTS_BY_ID", payload)
        },
        removeUserById(context, payload) {
            context.commit("REMOVE_USER_BY_ID", payload)
        },
        async setCourses(context) {
            const response = await HTTP.get("/courses")
            context.commit("SET_COURSES", response.data)
        },
        addCourse(context, payload) {
            context.commit("ADD_COURSE", payload)
        },
        editCourse(context, payload) {
            context.commit("EDIT_COURSE", payload)
        },
        removeCourseById(context, payload) {
            context.commit("REMOVE_COURSE_BY_ID", payload)
        },
        async loadTags(context) {
            const response = await HTTP.get("/tags")
            context.commit("LOAD_TAGS", response.data)
        },
        addTag(context, payload) {
            context.commit("ADD_TAG", payload)
        },
        editTag(context, payload) {
            context.commit("EDIT_TAG", payload)
        },
        removeTagById(context, payload) {
            context.commit("REMOVE_TAG_BY_ID", payload)
        },
        async setEvents(context) {
            const response = await HTTP.get("/events")
            context.commit("SET_EVENTS", response.data)
        },
        addEvent(context, payload) {
            context.commit("ADD_EVENT", payload)
        },
        editEventById(context, payload) {
            context.commit("EDIT_EVENT_BY_ID", payload)
        },
        removeEventById(context, payload) {
            context.commit("REMOVE_EVENT_BY_ID", payload)
        },
        removeEventsByAuthorId(context, payload) {
            context.commit("REMOVE_EVENTS_BY_AUTHOR_ID", payload)
        },
        addEventEnrollmentByEventId(context, payload) {
            context.commit("ADD_EVENT_ENROLLMENT_BY_EVENT_ID", payload)
        },
        removeEventEnrollmentByEventIdUserId(context, payload) {
            context.commit("REMOVE_EVENT_ENROLLMENT_BY_EVENT_ID_USER_ID", payload)
        },
        upvoteEventDiscussionByEventIdDiscussionId(context, payload) {
            context.commit("UPVOTE_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID", payload)
        },
        downvoteEventDiscussionByEventIdDiscussionId(context, payload) {
            context.commit("DOWNVOTE_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID", payload)
        },
        createEventDiscussion(context, payload) {
            context.commit("CREATE_EVENT_DISCUSSION", payload)
        },
        editEventDiscussionByEventIdDiscussionId(context, payload) {
            context.commit("EDIT_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID", payload)
        },
        removeDiscussionByEventIdDiscussionId(context, payload) {
            context.commit("REMOVE_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID", payload)
        },
        addDiscussionAnswerByEventIdDiscussionId(context, payload) {
            context.commit("ADD_DISCUSSION_ANSWER_BY_EVENT_ID_DISCUSSION_ID", payload)
        },
        removeEventDiscussionAnswerByEventIdDiscussionIdAnswerId(context, payload) {
            context.commit("REMOVE_EVENT_DISCUSSION_ANSWER_BY_EVENT_ID_DISCUSSION_ID_ANSWER_ID", payload)
        },
        insertNewNotifications(context, payload) {
            context.commit("INSERT_NEW_NOTIFICATIONS", payload)
        },
        insertNewMedalUser(context, payload) {
            context.commit("INSERT_NEW_MEDAL_USER", payload)
        },
        historyUpdate(context, payload) {
            context.commit("HISTORY_UPDATE", payload)
        },
        setMedals(context, payload) {
            context.commit("SET_MEDALS", payload)
        },
        assignMedals(context, payload) {
            context.commit('ASSIGN_MEDALS', payload)
        }
    }
})

function sortByDateStartCrescent(a, b) {
    if (moment(a.dateStart).isAfter(b.dateStart)) {
        return 1
    } else if (moment(a.dateStart).isBefore(b.dateStart)) {
        return -1
    }
    return 0
}

function sortByDateStartDecrescent(a, b) {
    if (moment(a.dateStart).isAfter(b.dateStart)) {
        return -1
    } else if (moment(a.dateStart).isBefore(b.dateStart)) {
        return 1
    }
    return 0
}