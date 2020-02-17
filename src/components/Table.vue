<template>
    <v-container>
        <v-app id="inspire">
            <div>
                <v-select
                        v-model="selectedAccount"
                        :items="accounts"
                        label="Выберите аккаунт"
                />
            </div>

            <v-card-title>
                Список транзакций
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
                    :items="adverts"
                    :search="search"
                    :expanded.sync="expanded"
                    hide-default-footer
                    item-key="id"
                    show-expand
                    class="elevation-1"
                    :loading="busy"
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
                    {text: 'id объявления', value: 'id'}
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
                adverts: [],
                busy: true,
            }
        },
        beforeMount() {
            this.fetchAccounts()
            // this.fetchAdvertisements()
        },
        mounted() {

        },
        methods: {
            fetchAccounts() {
                this.busy = true

                axios.get(this.apiDomain + '/api.php?method=getAccounts')
                    .then(resposne => {
                        this.accounts = resposne.data
                        this.busy = false
                    }).catch(e => {
                    console.log('Error while fetching accounts', e)
                })
            },
            fetchAdvertisements() {
                if (!this.selectedAccount) return false

                this.busy = true
                axios.get(this.apiDomain + '/api.php?method=list&account=' + this.selectedAccount)
                    .then(response => {
                        this.adverts = []
                        this.groupTransactions(response.data, () => {
                            this.busy = false
                        })
                    })
                    .catch(e => {
                        console.error(e)
                    })
            },
            async groupTransactions(transactions, callback) {
                await transactions.map((transaction) => {
                    const existGroup = this.adverts.findIndex(advertGroup => advertGroup.id === transaction.advertisement_id)

                    if (existGroup !== -1) {
                        this.adverts[existGroup].events.push(transaction)
                    } else {
                        this.adverts.push({
                            id: transaction.advertisement_id,
                            title: transaction.advertisement_title,
                            events: [transaction]
                        })
                    }
                })

                if (typeof callback === "function") callback()
            }
        },
        watch: {
            selectedAccount() {
                return this.fetchAdvertisements()
            }
        }
    }

</script>
