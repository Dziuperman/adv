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
                        <v-data-table
                        :items="item.events"
                        :headers="eventHeaders"
                        item-key="id"
                        hide-default-footer
                        >
                        </v-data-table>
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
                        value: 'name',
                    },
                    {text: 'id объявления', value: 'id'},
                    {text: 'Адрес', value: 'address.street'},
                ],
                eventHeaders: [
                    {
                        text: 'Дата', value: 'data'
                    },
                    {
                        text: 'Событие', value: 'event'
                    },
                    {
                        text: 'Сумма', value: 'amount'
                    },
                ],
                adverts: [
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.1',
                        event: 'P',
                        amount: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.2',
                        event: 'PO',
                        amount: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.3',
                        event: 'P',
                        amount: '2 000'
                    },
                    {
                        id: 2,
                        name: 'name-2',
                        data: '1.4',
                        event: 'V',
                        amount: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.5',
                        event: 'P',
                        amount: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.6',
                        event: 'PO',
                        amount: '2 000'
                    },
                    {
                        id: 2,
                        name: 'name-2',
                        data: '1.7',
                        event: 'PO',
                        amount: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.8',
                        event: 'V',
                        amount: '2 000'
                    },
                    {
                        id: 1,
                        name: 'name-1',
                        data: '1.9',
                        event: 'P',
                        amount: '2 000'
                    },

                ],
                groups: [],
                foodType: null,
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
        },
    }

</script>