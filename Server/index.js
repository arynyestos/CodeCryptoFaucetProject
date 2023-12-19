const ex = require("express")
const Web3 = require("web3")
require("dotenv").config() //Toma el fichero .env y crea variables accesibles por process.env.nombre_var
const cors = require("cors")

const app = ex()
app.use(cors())
const web3 = new Web3("http://localhost:8545")

app.get("/ping", (req, res) => {
    res.send({ fecha: new Date().toISOString() })
})

app.get("/saldo/:cuenta", async (req, res) => {
    try {
        const saldo = await web3.eth.getBalance(req.params.cuenta)
        // res.send({ saldo })
        res.send(saldo)
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Transaction failed' })
    }
})

app.get("/enviar/:cuenta", async (req, res) => {
    try {
        const tx = await web3.eth.accounts.signTransaction({
            to: req.params.cuenta,
            from: process.env.ADDRESS,
            value: ethers.parseUnits("10", 18),
            gas: 2000000 //en GWEI
        }, '0x' + process.env.PRIVATE_KEY)

        const txSended = await web3.eth.sendSignedTransaction(tx.rawTransaction)
        const saldo = await web3.eth.getBalance(req.params.cuenta)
        res.send({ saldoActualizado: saldo })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Transaction failed' })
    }
})

app.listen(3000, () => {
    console.log("listen")
})