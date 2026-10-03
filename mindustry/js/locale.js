var locale={
    lang:Core.bundle.getLocale().toString()||"en_US", //if english, returns "en_US".
    data:{
        en_US:{superSpeed:"Super Speed",enabled:"[green]Enabled",disabled:"[red]Disabled",speed:"[cyan]Speed:", speedDown:"Decrease Speed", speedUp:"Increase Speed"},
        pt_BR:{superSpeed:"Super Velocidade",enabled:"[green]Ativado",disabled:"[red]Desativado",speed:"[cyan]Velocidade:", speedDown:"Diminuir Velocidade", speedUp:"Aumentar Velocidade"}
    },
    get:function(key){
        var lang=this.data[this.lang]||this.data.en_US;
        return lang[key]||this.data.en_US[key]||key;
    }
};
