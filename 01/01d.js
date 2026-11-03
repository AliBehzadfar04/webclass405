let func    = process.argv[2]
let number1 = Number(process.argv[3])
let number2 = Number(process.argv[4])

function sum(number1, number2) {
    return number1 + number2
}

function minus(number1, number2) {
    return number1 - number2
}

switch (func) 
{
    case 'sum':
        console.log('Sum Is : ', sum(number1, number2))
        break
    case 'minus':
        console.log('minus : ', minus(number1, number2))
        break
    default:
        console.log('incorrect operation')
}