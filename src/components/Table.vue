<template>
    <v-container>
        <v-app id="inspire">
            <v-data-table
                :headers="headers"
                :items="users"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="id"
                show-expand
                class="elevation-1"
            >
                <template v-slot:expanded-item="{ headers }">
                    <td :colspan="headers.length">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>Dessert (400g serving)</th>
                                    <th>Calories</th>
                                    <th>Fat</th>
                                    <th>Carbs</th>
                                    <th>Protein</th>
                                    <th>Iron</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="post in todos" :key="post.id">
                                    <td class="text-start">{{ post.title }}</td>
                                    <td class="text-start">{{ post.id * 4 }}</td>
                                    <td class="text-start">{{ post.completed }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </td>
                </template>
            </v-data-table>
        </v-app>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                todos: [],
                errors: [],
                users: [],
                expanded: [],
                singleExpand: false,
                headers: [
                    {
                        text: 'Название',
                        align: 'left',
                        sortable: true,
                        value: 'name',
                    },
                    {text: 'id объявления', value: 'id'},
                    {text: 'Адрес', value: 'address.street'},
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                    },
                ],
                adverts: [
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.1',
                        event: 'P',
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.2',
                        event: 'PO',
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.3',
                        event: 'P',
                    },
                    {
                        id: 2,
                        name: 'name-2',
                        data: '1.4',
                        event: 'V',
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.5',
                        event: 'P',
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.6',
                        event: 'PO',
                    },
                    {
                        id: 2,
                        name: 'name-2',
                        data: '1.7',
                        event: 'PO',
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.8',
                        event: 'V',
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.9',
                        event: 'P',
                    },

                ],
                groups: [],
            }
        },
        mounted() {
            axios.get(`http://jsonplaceholder.typicode.com/todos`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.todos = response.data;
                    console.log(this.todos);
                })
                .catch(e => {
                    this.errors.push(e)
                });
            axios.get(`https://jsonplaceholder.typicode.com/users`)
                .then(response => {
                    this.users = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                });

            for (let element of this.adverts) {
                let existingGroups = this.groups.filter(group => group.id == element.id);
                if (existingGroups.length > 0) {
                    existingGroups[0].events.push(element);
                }
                else {
                    let newGroup = {
                        id: element.id,
                        name: element.name,
                        events: [element],

                    };
                    this.groups.push(newGroup);
                }
            }
            console.log(this.groups);
        }
    }

</script>