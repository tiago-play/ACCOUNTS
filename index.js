// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')


//modulos internos
const fs = require('fs')
const { Console } = require('console')

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
        } else if(action === 'Depositar') {
            deposit()
        } else if(action === 'Consultar Saldo') {

        } else if(action === 'Sacar') {

        } else if(action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
            process.exit()
        }

    })
    .catch((err) => console.log(err))
}

// create account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso bano!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        console.info(accountName)

        //Vamos fazer tudo sincrono para respeitar a ordem do programa

        //Criação do diretorio de contas
        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(
                chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),
            )
            buildAccount()
            return //encerra as ações depois de chamr o builAccount - evita pular para parabens
            //sempre que tiver um tratamento de erro deve dar um return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            '{"balance": 0}', 
            function (err) {
                console.log(err)
            },
        )

        console.log(chalk.green('Parabéns, a sua conta foi criada!'))
        operation()
    })
    .catch(err => console.log(err))
}

// add an amount to user account
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        //verify if account eists
        if(!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quando você deseja depositar',
            }
        ])
        .then((answer) => {

            const amount = answer['amount']

            // add an amount
            addAmount(accountName, amount)
            operation()

        })
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
}

function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta nao existe, escolha outro nome!'))
        return false
    }

    return true
}

function addAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
}

function getAccount(accountName) {
    // here the file is like a text
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    //now we turn it in JSON again
    return JSON.parse(accountJSON)
}