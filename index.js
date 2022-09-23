// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')


//modulos internos
const fs = require('fs')

//incando a função para que ela seja executada com o sistema
operation()

function operation() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: "O que você deseja fazer?",
            choices: ['Criar conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair'],
        },
    ])
    .then((answer) => {

        const action = answer['action']

        if(action == 'Criar conta'){
            createAccount()
        }
    })
    .catch((err) => console.log(err))
}

// create account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso bano!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    
}
