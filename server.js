const express=require('express')
const app=express()
const port=process.env.PORT || 8080



function bancoDeDados() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json")
            })
                
        }, 1500);
    })
}
  
  
app.get('/menu',(req,res)=>{
    res.status(200).json({
        mensage:'Bem vindo ao Canal de séries e filmes'})
})

app.get('/filmes', async(req,res)=>{
    let bancoFilmes=await bancoDeDados()
    res.status(200).send(bancoFilmes.filmes)
  
})
app.get('/series', async(req,res)=>{
    let bancoCategorias=await bancoDeDados()
    res.status(200).send(bancoCategorias.series)
})

app.post('/filmes',(req,res)=>{
    let bancoFilmes=await bancoDeDados()
    bancoFilmes.filmes.push(req.body)
    res.status(200).send('Filme foi cadastrado com sucesso')
})

app.listen(port,()=>{
    console.log('servidor esta rodando')

    
})