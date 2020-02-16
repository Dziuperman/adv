<template>
    <v-container>
        <v-app id="inspire">
            <v-card-title>
                Nutrition
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="groups"
                :search="search"
                :expanded.sync="expanded"
                hide-default-footer
                item-key="id"
                show-expand
                class="elevation-1"
            >
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Событие</th>
                                    <th>Сумма</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="event in item.events" :key="event.id">
                                    <td class="text-start">{{ event.data }}</td>
                                    <td class="text-start">{{ event.event }}</td>
                                    <td class="text-start">{{ event.price }}</td>
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
                search: '',
                errors: [],
                expanded: [],
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
                adverts: [
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.1',
                        event: 'P',
                        price: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.2',
                        event: 'PO',
                        price: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.3',
                        event: 'P',
                        price: '2 000'
                    },
                    {
                        id: 2,
                        name: 'name-2',
                        data: '1.4',
                        event: 'V',
                        price: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.5',
                        event: 'P',
                        price: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.6',
                        event: 'PO',
                        price: '2 000'
                    },
                    {
                        id: 2,
                        name: 'name-2',
                        data: '1.7',
                        event: 'PO',
                        price: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.8',
                        event: 'V',
                        price: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.9',
                        event: 'P',
                        price: '2 000'
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