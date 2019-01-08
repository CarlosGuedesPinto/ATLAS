<template>
    <div class="pb-5">
		<Panel title="Criar evento">
			<FormCreateEvent></FormCreateEvent>
		</Panel>
	</div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormCreateEvent from "@/components/FormCreateEvent.vue"

export default {
    components: {
        Panel,
        FormCreateEvent
    }
}
</script>
