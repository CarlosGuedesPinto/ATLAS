<template>
	<div>
        <TitleAtlas>{{  }}</TitleAtlas>
    </div>
</template>

<script>
import TitleAtlas from "@/components/TitleAtlas.vue"
import { mapGetters } from "vuex"

export default {
	name: "EventInfoView",
    components: { TitleAtlas },
    created() {
        this.event = this.getEventById(this.$route)
    },
    data() {
        return {
            event: {}
        }
    },
    computed: {
        ...mapGetters(["getEventById"])
    }
}
</script>
