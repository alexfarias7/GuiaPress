
function confirmarDelecao(event, form){
    event.preventDefault()
    const decision = confirm("Você quer deletar esta categoria?")
    if(decision)     form.submit()
}
function confirmarDelecaoArtigo(event, form){
    event.preventDefault()
    const decision = confirm("Você quer deletar este artigo?")
    if(decision)     form.submit()
}
