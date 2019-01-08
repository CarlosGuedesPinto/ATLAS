<template>
    <div class="pb-5">
        <Panel title="Adicionar curso">
            <FormCreateCourse></FormCreateCourse>
        </Panel>
    </div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormCreateCourse from "@/components/FormCreateCourse.vue"

export default {
    components: {
        Panel,
        FormCreateCourse
    }    
}
</script>
