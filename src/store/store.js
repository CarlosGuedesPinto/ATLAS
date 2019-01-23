import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const moment = require("moment")
require("moment/locale/pt")

Vue.use(require("vue-moment"), {
    moment
})
export default new Vuex.Store({
    state: {
        users: [],
        loggedUserId: -1,
        courses: [],
        tags: [],
        events: [],
        enrollments: []
    },
    getters: {
        getUserById: state => id => {
            return state.users.find(user => user.id === id)
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
                    if (user.id >= lastId) {
                        lastId = user.id
                    }
                })
            }
            return lastId
        },
        getUsers: state => {
            return state.users
        },
        getCourses: state => {
            return state.courses
        },
        getLastCourseId: state => {
            let lastId = 0
            if (state.courses.length) {
                state.courses.forEach(course => {
                    if (course.id >= lastId) {
                        lastId = course.id
                    }
                })
            }
            return lastId
        },
        getCourseById: state => id => {
            return state.courses.find(course => course.id === id)
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
                    if (tag.id >= lastId) {
                        lastId = tag.id
                    }
                })
            }
            return lastId
        },
        getTagById: state => id => {
            return state.tags.find(tag => tag.id === id)
        },
        getTagByName: state => name => {
            return state.tags.find(tag => tag.name.toLowerCase() === name.toLowerCase())
        },
        getTagNameById: state => id => {
            return state.tags.find(tag => tag.id === id).name
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
                    if (event.id >= lastId) {
                        lastId = event.id
                    }
                })
            }
            return lastId
        },
        getEventShortDescription: state => eventId => {
            let description = state.events.find(event => event.id === eventId).description
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
        getEventById: state => id => {
            return state.events.find(event => event.id === id)
        },
        getEventsByIdsTagsIdsCourses: state => (idsTags, idsCourses) => {
            return state.events.filter(event => {
                let result = true
                result = (event.tags.some(eventTag => idsTags.some(tag => tag === eventTag)) || event.coursesIds.some(eventCourse => idsCourses.some(course => course === eventCourse))) && result
                return result
            })
        },
        getEventClassrooms: state => {
            let classrooms = []
            state.events.forEach(event => {
                if (classrooms.indexOf(event.classroom) === -1) classrooms.push(event.classroom)
            })
            return classrooms
        },
        getEventDiscussionByEventIdDiscussionId: state => (eventId, discussionId) => {
            return state.events.find(event => event.id === eventId).discussions.find(discussion => discussion.id === discussionId)
        },
        getLastDiscussionIdByEventId: state => eventId => {
            let lastId = 0
            let eventIndex = state.events.findIndex(event => event.id === eventId)
            if (state.events[eventIndex].discussions.length) {
                state.events[eventIndex].discussions.forEach(discussion => {
                    if (discussion.id >= lastId) {
                        lastId = discussion.id
                    }
                })
            }
            return lastId
        },
        getEnrollmentsByEventId: state => eventId => {
            return state.enrollments.filter(enrollment => enrollment.eventId === eventId)
        },
        getLastAnswerIdByEventIdDiscussionId: state => (eventId, discussionId) => {
            let lastId = 0
            if (state.events.length) {
                state.events.forEach(event => {
                    if (event.id === eventId && event.discussions.length) {
                        event.discussions.forEach(discussion => {
                            if (discussion.id === discussionId) {
                                if (discussion.answers) {
                                    discussion.answers.forEach(answer => {
                                        if (answer.id >= lastId) {
                                            lastId = answer.id
                                        }
                                    })
                                }
                            }
                        })
                    }

                })
            }
            return lastId
        }
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload
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
                if (user.id === payload.id) {
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
                if (user.id === payload.id) {
                    user.interests = payload.interests
                }
            })
        },
        REMOVE_USER_BY_ID(state, payload) {
            let index = state.users.findIndex(user => user.id === payload)
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
                if (course.id === payload.id) {
                    course.name = payload.name
                    course.abbreviation = payload.abbreviation
                }
            })
        },
        REMOVE_COURSE_BY_ID(state, payload) {
            state.courses.forEach((course, index) => {
                if (course.id === payload) state.courses.splice(index, 1)
            })
        },
        SET_TAGS(state, payload) {
            state.tags = payload
        },
        ADD_TAG(state, payload) {
            state.tags.push(payload)
        },
        EDIT_TAG(state, payload) {
            state.tags.forEach(tag => {
                if (tag.id === payload.id) tag.name = payload.name
            })
        },
        REMOVE_TAG_BY_ID(state, payload) {
            state.tags.forEach((tag, index) => {
                if (tag.id === payload) state.tags.splice(index, 1)
            })
        },
        SET_EVENTS(state, payload) {
            state.events = payload
        },
        ADD_EVENT(state, payload) {
            state.events.push(payload)
        },
        EDIT_EVENT_BY_ID(state, payload) {
            state.events.forEach(event => {
                if (event.id === payload.id) {
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
        SET_ENROLLMENTS(state, payload) {
            state.enrollments = payload
        },
        UPVOTE_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event.id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion.id === payload.discussionId) {
                            discussion.upvotes++
                            discussion.usersVoted.push(state.loggedUserId)
                        }
                    })
                }
            })
        },
        DOWNVOTE_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event.id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion.id === payload.discussionId) {
                            discussion.downvotes++
                            discussion.usersVoted.push(state.loggedUserId)
                        }
                    })
                }
            })
        },
        CREATE_EVENT_DISCUSSION(state, payload) {
            let index = state.events.findIndex(event => event.id === payload.eventId)
            state.events[index].discussions.push(payload.discussion)
        },
        EDIT_EVENT_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event.id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion.id === payload.discussionId) {
                            discussion.title = payload.discussion.title
                            discussion.category = payload.discussion.category
                            discussion.content = payload.discussion.content
                        }
                    })
                }
            })
        },
        REMOVE_EVENT_BY_ID(state, payload) {
            let index = state.events.findIndex(event => event.id === payload)
            state.events.splice(index, 1)
        },
        REMOVE_DISCUSSION_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event.id === payload.eventId) {
                    event.discussions.forEach((discussion, index) => {
                        if (discussion.id === payload.discussionId) {
                            event.discussions.splice(index, 1)
                        }
                    })
                }
            })
        },
        ADD_DISCUSSION_ANSWER_BY_EVENT_ID_DISCUSSION_ID(state, payload) {
            state.events.forEach(event => {
                if (event.id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion.id === payload.discussionId) {
                            discussion.answers.push(payload.answer)
                        }
                    })
                }
            })
        },
        REMOVE_EVENT_DISCUSSION_ANSWER_BY_EVENT_ID_DISCUSSION_ID_ANSWER_ID(state, payload) {
            state.events.forEach(event => {
                if (event.id === payload.eventId) {
                    event.discussions.forEach(discussion => {
                        if (discussion.id === payload.discussionId) {
                            discussion.answers.forEach((answer, index) => {
                                if (answer.id === payload.answerId) {
                                    discussion.answers.splice(index, 1)
                                }
                            })
                        }
                    })
                }
            })
        }
    },
    actions: {
        setUsers(context, payload) {
            context.commit("SET_USERS", payload)
        },
        userLoggedIn(context, payload) {
            context.commit("USER_LOGGED_IN", payload)
        },
        userLoggedOut(context, payload) {
            context.commit("USER_LOGGED_OUT", payload)
        },
        signUp(context, payload) {
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
        setCourses(context, payload) {
            context.commit("SET_COURSES", payload)
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
        setTags(context, payload) {
            context.commit("SET_TAGS", payload)
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
        setEvents(context, payload) {
            context.commit("SET_EVENTS", payload)
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
        setEnrollments(context, payload) {
            context.commit("SET_ENROLLMENTS", payload)
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