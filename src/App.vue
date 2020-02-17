<template>
    <div id="app">
        <img alt="Logotype" class="askom-logo" src="http://xn--80aughn.xn--p1ai/local/templates/askom/images/logo.png">

        <table-component></table-component>
    </div>
</template>

<script>
    import TableComponent from './components/Table'

    export default {
        name: 'App',
        components: {
            TableComponent
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .askom-logo {
        position: relative;

        object-fit: contain;
        object-position: center center;

        background: #d32f2f;
        border-radius: 6px;
        border-bottom: 0;
        padding: 0.25em 0.2em 0.25em 0.2em;

        width: 250px;
        max-width: 100%;
    }
</style>
