<script>
    import { onMount } from "svelte"

    onMount(async () => {
        // const ws = new WebSocket("wss://api.ghostprinter.test/experiment/ws")
        const ws = new WebSocket("ws://localhost:7100/experiment/ws")
        ws.onopen = (event) => {
            console.log(event)
        }
        ws.onmessage = (event) => {
            console.log(event)
        }
        ws.onerror = (event) => {
            console.log(event)
        }
    })
</script>