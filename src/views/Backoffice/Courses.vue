<template>
    <div class="pb-5">
        <Panel title="Adicionar curso">
            <FormCreateCourse></FormCreateCourse>
        </Panel>
        <Panel title="Lista de cursos" class="mt-5">
            <DataTable name="courses" :items="getCourses" :fields="coursesFields"></DataTable>
        </Panel>
    </div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormCreateCourse from "@/components/FormCreateCourse.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from 'vuex'

export default {
    components: {
        Panel,
        FormCreateCourse,
        DataTable
    },
    data() {
        return {
            coursesFields: [
				{
					key: "id",
					label: "ID",
					sortable: true,
					sortDirection: "desc"
				},
				{
					key: "name",
					label: "Nome",
					sortable: true,
				},
				{
					key: "abbreviation",
					label: "Abreviação",
					sortable: true,
				}
			]
        }
    },
    computed: {
        ...mapGetters(["getCourses"])
    }
}
</script>
