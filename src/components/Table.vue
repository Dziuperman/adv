<template>
    <v-container>
        <v-app id="inspire">
            <div>
                <v-select
                        :disabled="!loaded"
                        :loading="!loaded"
                        v-model="selectedAccount"
                        :items="accounts"
                        label="Выберите аккаунт"
                />

                <v-layout row wrap>
                    <v-flex xs12 sm6 md4>
                        <v-menu
                                :disabled="!loaded"
                                v-model="menu1"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        :disabled="!loaded"
                                        v-model="dateFrom"
                                        label="Picker without buttons"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateFrom" @input="menu1 = false"></v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm6 md4>
                        <v-menu
                                v-model="menu2"
                                :disabled="!loaded"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"

                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        :disabled="!loaded"
                                        v-model="dateTo"
                                        label="Picker without buttons"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateTo" @input="menu2 = false"></v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
            </div>


            <v-card-title>
                Список транзакций
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Поиск"
                        single-line
                        :hide-details="true"
                        :disabled="!loaded"
                ></v-text-field>
            </v-card-title>

            <v-data-table
                    :disable-filtering="!loaded"
                    :disable-sort="!loaded"
                    :no-data-text="noDataText"
                    :headers="headers"
                    :items="grouppedTransacion"
                    :search="search"
                    :expanded.sync="expanded"
                    hide-default-footer
                    item-key="id"
                    show-expand
                    class="elevation-1"
                    :loading="busy && loaded"
            >

                <template v-slot:item.id="{ item }">
                    <a :href="'https://farpost.ru/' + item.id" noreferrer target="_blank" v-if="item.id">
                        №
                        <span style="user-select: all">{{item.id}}</span>
                    </a>
                </template>

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
                menu1: false,
                menu2: false,
                dateFrom: new Date().toISOString().substr(0, 10),
                dateTo: new Date().toISOString().substr(0, 10),
                filters: {
                    search: '',
                    added_by: '',
                },
                search: '',
                expanded: [],
                headers: [
                    {
                        text: 'Название',
                        align: 'left',
                        value: 'title',
                    },
                    {text: 'Номер объявления', value: 'id'}
                ],
                eventHeaders: [
                    {
                        text: 'Дата', value: 'date'
                    },
                    {
                        text: 'Событие', value: 'message'
                    },
                    {
                        text: 'Сумма', value: 'amount'
                    },
                ],
                accounts: [],
                selectedAccount: null,
                apiDomain: 'http://192.168.1.36:8000/io.askom.farpost_statistics',
                advertisements: [],
                loaded: false,
                busy: true,
            }
        },
        beforeMount() {
            this.fetchAccounts()
        },
        methods: {
            fetchAccounts() {
                this.busy = true

                axios.get(this.apiDomain + '/api.php?method=getAccounts')
                    .then(resposne => {
                        this.accounts = resposne.data
                        this.busy = false
                        this.loaded = true
                    }).catch(e => {
                    console.log('Error while fetching accounts', e)
                })
            },
            fetchAdvertisements() {
                if (!this.selectedAccount) return false

                this.busy = true
                axios.get(this.apiDomain + '/api.php?method=list&account=' +
                    this.selectedAccount + '&from=' + this.formattedDateFrom + '&to=' + this.formattedDateTo
                ).then(response => {
                    this.advertisements = response.data.transactions

                    this.busy = false
                }).catch(e => {
                    console.error(e)
                })
            },
            parseDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${day}.${month}.${year}`
            },
        },
        watch: {
            selectedAccount() {
                this.fetchAdvertisements()
            },
            dateFrom() {
                this.fetchAdvertisements()
            },
            dateTo() {
                this.fetchAdvertisements()
            }
        },
        computed: {
            grouppedTransacion() {
                const grouppedTransacion = []

                this.advertisements.map((transaction) => {
                    const existGroup = grouppedTransacion.findIndex(advertGroup => advertGroup.id === transaction.advertisement_id)

                    if (existGroup !== -1) {
                        grouppedTransacion[existGroup].events.push(transaction)
                    } else {
                        if (!transaction.advertisement_title) {
                            transaction.advertisement_title = '[Пополнения баланса]'
                        }

                        grouppedTransacion.push({
                            id: transaction.advertisement_id,
                            title: transaction.advertisement_title,
                            events: [transaction]
                        })
                    }
                })

                return grouppedTransacion
            },
            formattedDateFrom() {
                return this.parseDate(this.dateFrom)
            },
            formattedDateTo() {
                return this.parseDate(this.dateTo)
            },
            noDataText() {
                if (!this.loaded) {
                    return 'Соединение с сервером...'
                } else if (!this.selectedAccount) {
                    return 'Выберите аккаунт'
                } else {
                    return 'Транзакции не найдены!'
                }
            }

        }
    }
</script>
