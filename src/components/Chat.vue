<template>
	<div>
		<beautiful-chat
			:participants="participants"
			:titleImageUrl="titleImageUrl"
			:onMessageWasSent="onMessageWasSent"
			:messageList="messageList"
			:newMessagesCount="newMessagesCount"
			:isOpen="isChatOpen"
			:close="closeChat"
			:open="openChat"
			:showEmoji="true"
			:showFile="false"
			:showTypingIndicator="showTypingIndicator"
			:colors="colors"
			:alwaysScrollToBottom="alwaysScrollToBottom"
			:messageStyling="messageStyling"
		/>
	</div>
</template>

<script>
import io from "socket.io-client"
import axios from "axios"
import { mapGetters } from "vuex"

export default {
	name: "app",
	data() {
		return {
			socket: io("https://atlas-server-gustavovasconcelos.c9users.io"),
			participants: [], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
			titleImageUrl: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
			messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
			newMessagesCount: 0,
			isChatOpen: false, // to determine whether the chat window should be open or closed
			showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
			colors: {
				header: {
					bg: "#00225B",
					text: "#ffffff"
				},
				launcher: {
					bg: "#00225B"
				},
				messageList: {
					bg: "#ffffff"
				},
				sentMessage: {
					bg: "#00225B",
					text: "#ffffff"
				},
				receivedMessage: {
					bg: "#eaeaea",
					text: "#222222"
				},
				userInput: {
					bg: "#f4f7f9",
					text: "#565867"
				}
			}, // specifies the color scheme for the component
			alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
			messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
		}
	},
	created() {
		/*
		window.addEventListener("beforeunload", () => {
			this.$destroy()
		})*/
		
		/*
        {
            id: "user1",
            name: "Matteo",
            imageUrl:
                "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4"
        }*/

        (async () => {
			try {
				const response = await this.$http.get("/chat")

				response.data.forEach(message => {
					let { author, type, data } = message
					if(author === this.getUserById(this.getLoggedUserId).username) {
						author = "me"
					}
					this.messageList.push({
						author,
						type,
						data
					})
				})
			} catch(err) {
				console.log(err)
			}
		})()

		this.getUsers.forEach(user => {
			this.participants.push({
				id: user.username,
				name: user.name,
				imageUrl: user.picture
			})
		})
		
		this.socket.on("CHAT_MESSAGE", data => {
			if (!this.isChatOpen) {
				this.newMessagesCount++
			}
			if (data.author === this.getUserById(this.getLoggedUserId).username) {
				data.author = "me"
			}
			this.messageList = [...this.messageList, data]
		})
	},
	computed: {
		...mapGetters(["getApiUrl", "getLoggedUserId", "getUserById", "getUsers"])
	},
	methods: {
		onMessageWasSent(data) {
			// called when the user sends a message
			if (data.type === "text") {
				this.socket.emit("CHAT_MESSAGE", {
					author: this.getUserById(this.getLoggedUserId).username,
					type: "text",
					data: {
						text: data.data.text
					}
				})
			} else {
				this.socket.emit("CHAT_MESSAGE", {
					author: this.getUserById(this.getLoggedUserId).username,
					type: "emoji",
					data: {
						emoji: data.data.emoji
					}
				})
			}
			
			(async () => {
				data.author = this.getUserById(this.getLoggedUserId).username
				try {
					await this.$http.post("/chat", data)
				} catch(err) {
					console.log(err)
				}
			})()

			//this.messageList = [...this.messageList, message]
		},
		openChat() {
			// called when the user clicks on the fab button to open the chat
			this.isChatOpen = true
			this.newMessagesCount = 0
		},
		closeChat() {
			// called when the user clicks on the botton to close the chat
			this.isChatOpen = false
		}
	},
	destroyed() {
		this.socket.emit("DISCONNECTION", this.socket.id)
	}
}
</script>
