<template>
    <div class="pb-5">
        <Panel title="Adicionar curso">
            <FormCourse></FormCourse>
        </Panel>
        <Panel :title="`Cursos - ${getCourses.length}`" class="mt-5">
            <DataTable name="courses" :items="getCourses" :fields="coursesFields"></DataTable>
        </Panel>
    </div>
</template>

<script>
import Panel from "@/components/Panel.vue"
import FormCourse from "@/components/FormCourse.vue"
import DataTable from "@/components/DataTable.vue"
import { mapGetters } from 'vuex'

export default {
    components: {
        Panel,
        FormCourse,
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
                },
                {
					key: "actions",
					label: ""
				}
			]
        }
    },
    computed: {
        ...mapGetters(["getCourses"])
    }
}
</script>
